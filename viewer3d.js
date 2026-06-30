/* ==========================================
   THREE.JS 3D MODEL VIEWER - AISOLUCE PORTFOLIO
   ========================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

class ModelViewer {
    constructor() {
        this.container = document.getElementById('viewer3dCanvas');
        this.placeholder = document.getElementById('viewer3dPlaceholder');
        this.loadingEl = document.getElementById('viewer3dLoading');
        this.titleEl = document.querySelector('.viewer3d-title');
        this.thumbnails = document.querySelectorAll('.thumb3d-card');
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.animationId = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        // Bind thumbnail clicks
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const modelPath = thumb.dataset.model;
                const modelName = thumb.dataset.name;
                
                // Update active states
                this.thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Load model
                this.loadModel(modelPath, modelName);
            });
        });
    }

    initThree() {
        if (this.isInitialized) return;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0b0d);

        // Camera
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.rotateSpeed = 0.8;
        this.controls.zoomSpeed = 1.2;
        this.controls.minDistance = 0.5;
        this.controls.maxDistance = 30;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.5;

        // Lighting setup: studio lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Key light
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
        keyLight.position.set(5, 8, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene.add(keyLight);

        // Fill light (green tint to match brand)
        const fillLight = new THREE.DirectionalLight(0xc5ff68, 0.3);
        fillLight.position.set(-5, 3, -5);
        this.scene.add(fillLight);

        // Rim light (purple tint)
        const rimLight = new THREE.DirectionalLight(0x9333ea, 0.4);
        rimLight.position.set(0, 5, -8);
        this.scene.add(rimLight);

        // Bottom light for soft fill
        const bottomLight = new THREE.HemisphereLight(0x0a0b0d, 0x1a1c2e, 0.4);
        this.scene.add(bottomLight);

        // Ground plane (subtle grid)
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x0d0f14, 
            roughness: 0.9, 
            metalness: 0 
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid helper
        const gridHelper = new THREE.GridHelper(20, 40, 0x1a1c2e, 0x0f1118);
        this.scene.add(gridHelper);

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start render loop
        this.animate();
        this.isInitialized = true;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        if (this.controls) this.controls.update();
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (!this.camera || !this.renderer) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    loadModel(path, name) {
        // Initialize Three.js on first load
        this.initThree();

        // Show loading state
        this.placeholder.style.display = 'none';
        this.loadingEl.style.display = 'flex';

        // Update title
        this.titleEl.innerHTML = `<span class="text-lime">▶</span> ${name.toLowerCase().replace(/ /g, '_')}.glb`;

        // Remove current model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.currentModel.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (child.material.isMaterial) {
                        this.disposeMaterial(child.material);
                    } else if (Array.isArray(child.material)) {
                        child.material.forEach(m => this.disposeMaterial(m));
                    }
                }
            });
            this.currentModel = null;
        }

        // Load GLB (meshopt decoder enables the compressed EXT_meshopt_compression GLBs)
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.load(
            path,
            (gltf) => {
                this.loadingEl.style.display = 'none';
                const model = gltf.scene;

                // Calculate bounding box for proper centering
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // Center the model
                model.position.sub(center);
                
                // Scale to fit viewport
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                model.scale.setScalar(scale);

                // Recalculate position after scaling
                const scaledBox = new THREE.Box3().setFromObject(model);
                const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
                model.position.y -= scaledBox.min.y; // Sit on ground

                // Enable shadows
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                this.scene.add(model);
                this.currentModel = model;

                // Reset camera position
                const scaledSize = scaledBox.getSize(new THREE.Vector3());
                const maxScaledDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
                const cameraDistance = maxScaledDim * 2;
                
                this.camera.position.set(
                    cameraDistance * 0.8, 
                    cameraDistance * 0.5, 
                    cameraDistance * 0.8
                );
                this.controls.target.set(0, scaledSize.y / 2, 0);
                this.controls.update();
            },
            (progress) => {
                // Progress callback (optional: update loading bar)
                if (progress.total > 0) {
                    const pct = Math.round((progress.loaded / progress.total) * 100);
                    const loadingText = this.loadingEl.querySelector('p');
                    if (loadingText) {
                        const base = (window.i18n ? window.i18n.t('gallery3d.loading') : 'Chargement du modèle 3D...').replace(/\.{3}$/, '');
                        loadingText.textContent = `${base} ${pct}%`;
                    }
                }
            },
            (error) => {
                console.error('Error loading model:', error);
                this.loadingEl.style.display = 'none';
                this.placeholder.style.display = 'flex';
                this.placeholder.querySelector('p').textContent =
                    (window.i18n ? window.i18n.t('gallery3d.load_error') : 'Erreur de chargement. Vérifiez que le fichier GLB est accessible.');
            }
        );
    }

    disposeMaterial(material) {
        if (material.map) material.map.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
        if (material.metalnessMap) material.metalnessMap.dispose();
        if (material.emissiveMap) material.emissiveMap.dispose();
        if (material.aoMap) material.aoMap.dispose();
        material.dispose();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModelViewer();
});
