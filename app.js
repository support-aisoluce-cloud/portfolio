/* ==========================================
   INTERACTIVE LOGIC - AISOLUCE PORTFOLIO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 2. Terminal Simulator Setup
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');
    
    // Command History
    const commandResponses = {
        help: `Commandes disponibles :
  • <span class="cmd-highlight">stats</span>       - État global des bots actifs sur VPS
  • <span class="cmd-highlight">saas</span>        - Fiche technique de aisoluce.cc (Stripe + Nano Banana)
  • <span class="cmd-highlight">automation</span>  - Pipeline leadgen, cold-emailing et auto-publish
  • <span class="cmd-highlight">flashloan</span>   - Détails techniques du Solana Flash Loan Arbitrage Bot (Anchor/Rust)
  • <span class="cmd-highlight">shadowaudit</span> - Audit de smart contracts sémantique Solidity (Go)
  • <span class="cmd-highlight">vapi</span>        - Assistants d'appels téléphoniques IA temps-réel (Python)
  • <span class="cmd-highlight">polymarket</span>  - Bot d'arbitrage de portefeuilles de prédictions (Web3 API)
  • <span class="cmd-highlight">mcp</span>         - Configuration des MCPs financiers
  • <span class="cmd-highlight">redteam</span>     - Agent prompt injection (7 niveaux Gandalf)
  • <span class="cmd-highlight">whoami</span>      - Qui est Kylian (profil &amp; stack)
  • <span class="cmd-highlight">contact</span>     - Me joindre (email &amp; liens)
  • <span class="cmd-highlight">clear</span>       - Effacer la console`,
        
        stats: `<span class="cmd-highlight">Rapport d'ingénierie VPS - Bots R&amp;D &amp; Arbitrage (bac à sable)</span>
------------------------------------------------------------
<span class="text-lime">Solana Flash Loan Bot (Anchor-Rust Contract)</span>
  - Contrat : verified &amp; deployed (mainnet/devnet)
  - Latence de scan moyenne : ~120ms (mesurée)
  - Statut : Online (scanning blocks)

<span class="text-lime">Moteur de stratégies (MT5 · backtests)</span>
  - Stratégies backtestées : 12 | Fiabilité d'exécution : 99.8%
  - Daily Trades : 4 (EURUSD) | Attente de signaux EMA

<span class="text-lime">Infrastructure &amp; observabilité</span>
  - Uptime 30j : 99.9% | Processus supervisés via pm2
  - Pipeline de logs : structuré, rotation automatique

<span class="text-lime">Polymarket Prediction Bot (Prediction Markets)</span>
  - Marchés surveillés : US Election, Macro-economics, SpaceTech
  - Opportunités détectées : 12 | Statut : Online`,

        saas: `<span class="cmd-highlight">Fiche produit - aisoluce.cc</span>
------------------------------------------------------------
[MODEL] Nano Banana (Image Generation API)
[MONETIZATION] Stripe Payment Links &amp; Margin Management
[STATUS] Démo en ligne · intégration Stripe fonctionnelle
- Stripe Webhook: implémenté (invoice.payment_succeeded -> gen_credits)
- User Balance tracking: Local Redis Cache
- Generative latency: ~3.4s / image`,

        automation: `<span class="cmd-highlight">Pipelines d'Automatisation Actifs</span>
------------------------------------------------------------
<span class="text-lime">Lead Gen &amp; Cold Emailing (Business Motion Design)</span>
  - Routine: Claude Scraping sémantique multicritères
  - Vérification emails: API Debounce intégrée
  - Statut: 120 leads traités aujourd'hui | Queue d'envoi: 0

<span class="text-lime">Autopilot Social Content Creation</span>
  - Scripting: Claude LLM
  - Rendu Vidéo: Higgsfield AI API
  - Publication: Blotato Scheduler (Automated API publish)
  - Statut: Synchro quotidienne active`,

        flashloan: `<span class="cmd-highlight">Solana Flash Loan Arbitrage Bot</span>
------------------------------------------------------------
[ENGINE] Python 3.10 + Solana Web3.py
[SMART CONTRACT] Rust / Anchor Framework (mainnet/devnet)
[DEX MONITOR] Jupiter API Aggregator, Raydium, Orca
[VOLUME] 1,250 SOL per flash loan pool transaction
- Scanner active: checking prices via price_fetcher.py
- Arbitrage logic: executing swap via simple_arbitrage.py
- Log state: scan latency ~120ms`,

        shadowaudit: `<span class="cmd-highlight">ShadowAudit: Go Security Scanner</span>
------------------------------------------------------------
[SCANNER] Go-based static analysis audit engine
- main.go       : program entry and CLI orchestrator
- scanner.go    : AST parser for Solidity source files
- notifier.go   : Discord/Telegram push notifications
[DETECTIONS] Reentrancy, Overflow, Insecure Call, Flash Attack
- Status: Ready (run_demo.ps1 demo script loaded)`,

        redteam: `<span class="cmd-highlight">ShadowPrompt: AI Red-Team Agent</span>
------------------------------------------------------------
[TARGET] gandalf.lakera.ai (prompt-injection challenge)
[AGENT] LLM generates, runs and iterates injection payloads
- L1-L6 : guardrails defeated
- L7    : secret extracted
[RESULT] <span class="text-lime">7/7 passwords extracted. Pipeline validated.</span>`,

        vapi: `<span class="cmd-highlight">Vapi.ai Voice Agent Orchestrator</span>
------------------------------------------------------------
[CLIENT] vapi_client.py (Python API wrapper)
- create_assistant() : deploys Claude 3.5 Haiku as a voice agent
- list_calls()       : tracks ongoing conversational audio sessions
- add_phone_number() : binds active phone numbers to assistants
- Status: Connected (VAPI_PRIVATE_KEY loaded)`,

        polymarket: `<span class="cmd-highlight">Polymarket Prediction Arbitrage Bot</span>
------------------------------------------------------------
[LOGS] Scanning US Election and Macro prediction markets...
[LOGS] Checking gap between Polymarket &amp; real-time odds...
[STATUS] VPS sync OK (Pm2 running). Hedge orders via Web3 API.`,

        mcp: `<span class="cmd-highlight">Model Context Protocol (MCP) Config</span>
------------------------------------------------------------
[ACTIVE MCP SERVERS]
  1. stripe-connector (Port 3010) - Permet à Claude de manipuler Stripe
  2. notion-mcp (Port 3015) - Sync des données bots de trading vers Notion DB
  3. local-financial-mcp (Port 3020) - Requêtes de cours temps-réel (AlphaVantage)
  4. system-tool-mcp (Port 3030) - Scripts d'automatisation OS local
[INTEGRITY] Connection SSL Sécurisée | Token auth active`,

        whoami: `<span class="cmd-highlight">Kylian Stomp (AISOLUCE)</span>
------------------------------------------------------------
[ROLE]   Ingénieur AI-first full-stack · indépendant (remote)
[FOCUS]  Orchestration LLM, agents, automatisations, Web3 R&amp;D, CGI
[CERT]   Claude Code in Action (Anthropic)
[STACK]  Python · Rust/Anchor · Go · JS / Three.js · MCP
[STATUT] Remote · sur sélection, 1 mission à la fois
> Tapez 'contact' pour me joindre.`,

        contact: `<span class="cmd-highlight">Me contacter</span>
------------------------------------------------------------
[EMAIL]  support-aisoluce@aisoluce.com
[SAAS]   https://aisoluce.cc
[MOTION] https://portfolio-aisoluce.netlify.app
> Réponse sous 24h · NDA possible.`
    };

    // Initialize mock terminal logging to look alive
    const mockLogs = [
        "Connecting to trading sockets...",
        "[VPS-NODE-01] Solana Devnet Web3 connection established.",
        "[VPS-NODE-01] Local LLM server listening on port 8080.",
        "[VPS-NODE-01] Debounced email queue processing completed successfully.",
        "Tapez 'help' pour démarrer."
    ];

    let logDelay = 400;
    mockLogs.forEach((log, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'terminal-line system-msg';
            line.innerHTML = `[sys] ${log}`;
            // insert before the active prompt
            const activePrompt = terminalBody.querySelector('.prompt-active');
            terminalBody.insertBefore(line, activePrompt);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, logDelay * (index + 1));
    });

    // Handle terminal input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCommand = terminalInput.value.trim();
            const command = rawCommand.toLowerCase();
            terminalInput.value = '';

            // 1. Replicate prompt in body
            const promptLine = document.createElement('div');
            promptLine.className = 'terminal-line prompt';
            promptLine.innerHTML = `<span class="prompt-user">guest@aisoluce</span>:<span class="prompt-path">~</span>$ ${rawCommand}`;
            const activePrompt = terminalBody.querySelector('.prompt-active');
            terminalBody.insertBefore(promptLine, activePrompt);

            // 2. Process Command
            if (command === 'clear') {
                // Clear all except the active prompt
                const lines = terminalBody.querySelectorAll('.terminal-line:not(.prompt-active)');
                lines.forEach(line => line.remove());
            } else if (command === '') {
                // Empty line
            } else if (commandResponses[command]) {
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line output';
                responseLine.innerHTML = commandResponses[command].replace(/\n/g, '<br>');
                terminalBody.insertBefore(responseLine, activePrompt);
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line text-red';
                errorLine.innerHTML = `bash: command not found: ${rawCommand}. Tapez <span class="cmd-highlight">help</span> pour voir les commandes valides.`;
                terminalBody.insertBefore(errorLine, activePrompt);
            }

            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // 3. MCP Interactive Display Logic
    const targetNodes = document.querySelectorAll('.mcp-target-node');
    const mcpDetails = document.getElementById('mcpDetails');
    const mcpLines = {
        stripe: document.querySelector('.mcp-line.line-1'),
        notion: document.querySelector('.mcp-line.line-2'),
        finance: document.querySelector('.mcp-line.line-3'),
        system: document.querySelector('.mcp-line.line-4')
    };

    // MCP code snippets stay language-agnostic; titles & texts come from i18n.js.
    const mcpCode = {
        // Server side: a Python tool exposed over MCP (FastMCP @mcp.tool()).
        stripe: `# server.py: MCP tool (Python / FastMCP)\n@mcp.tool()\ndef create_payment_link(amount: int, currency: str = "usd",\n                        description: str = "") -> dict:\n    """Create a Stripe Payment Link."""\n    link = stripe.PaymentLink.create(\n        line_items=[{"price_data": {\n            "currency": currency,\n            "unit_amount": amount,            # cents\n            "product_data": {"name": description},\n        }, "quantity": 1}],\n    )\n    return {"url": link.url, "id": link.id}`,
        // Client side: a Notion page creation via tools/call envelope.
        notion: `// client: tools/call (JSON-RPC envelope)\nawait client.request({\n  method: "tools/call",\n  params: {\n    name: "notion_create_page",\n    arguments: {\n      parent: { database_id: "a1b2c3d4e5f607182930a1b2c3d4e5f6" },\n      properties: {\n        Name:    { title: [{ text: { content: "Daily run" } }] },\n        Status:  { select: { name: "OK" } },\n        Date:    { date: { start: new Date().toISOString() } }\n      }\n    }\n  }\n});`,
        // Server side: TS handler registered on an MCP Server.
        finance: `// server.ts: @modelcontextprotocol/sdk\nserver.setRequestHandler(CallToolRequestSchema, async (req) => {\n  if (req.params.name !== "get_sol_price") throw new Error("unknown tool");\n  const { pair = "SOL/USDC" } = req.params.arguments ?? {};\n  const price = await fetchJupiterPrice(pair);\n  return {\n    content: [{ type: "text", text: JSON.stringify({ pair, price }) }],\n  };\n});`,
        // Tool definition with a JSON input schema.
        system: `// tool definition: JSON input schema\n{\n  name: "restart_process",\n  description: "Restart a supervised pm2 process",\n  inputSchema: {\n    type: "object",\n    properties: {\n      name: { type: "string", description: "pm2 process name" }\n    },\n    required: ["name"]\n  }\n}`
    };

    // FR fallbacks in case i18n.js fails to load.
    const mcpFallback = {
        stripe: { title: "Stripe API Connector", text: "Permet à Claude de générer à la volée des liens de paiement Stripe, de suivre les facturations et d'interagir directement avec le tableau de bord financier lors de sessions interactives." },
        notion: { title: "Notion MCP: Bot Data Tracker", text: "Synchronise les données de trading (PnL, positions, métriques de performance) vers des bases Notion en temps réel. Chaque bot push ses résultats vers un dashboard Notion dédié pour le suivi et l'analyse." },
        finance: { title: "Financial MCP Server", text: "Connecte Claude à des flux de marché en direct (prix des cryptomonnaies, cours du Forex, capitalisation Solana). Fournit des données en temps réel pour alimenter la prise de décision des LLMs locaux sur VPS." },
        system: { title: "Local System Tools MCP", text: "Assure la communication entre Claude et le VPS hôte pour redémarrer les scripts de trading, vérifier l'usage CPU/RAM, et vider les fichiers de logs en toute autonomie." }
    };

    let activeMcpTarget = 'stripe';

    function mcpTitle(target) {
        return window.i18n ? window.i18n.t('mcp.' + target + '.title') : mcpFallback[target].title;
    }
    function mcpText(target) {
        return window.i18n ? window.i18n.t('mcp.' + target + '.text') : mcpFallback[target].text;
    }
    function renderMcpDetails(target) {
        if (!mcpDetails) return;
        const code = (mcpCode[target] || '').replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
        mcpDetails.innerHTML =
            '<div class="details-title">' + mcpTitle(target) + '</div>' +
            '<p class="details-text">' + mcpText(target) + '</p>' +
            '<div class="details-code">' + code + '</div>';
    }

    // Draw active connectors
    function updateConnectorLines(activeTarget) {
        // Reset all lines
        Object.values(mcpLines).forEach(line => {
            if (line) line.classList.remove('active');
        });

        // Set active line
        if (mcpLines[activeTarget]) {
            mcpLines[activeTarget].classList.add('active');
        }
    }

    targetNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove active classes
            targetNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            activeMcpTarget = node.dataset.target;
            renderMcpDetails(activeMcpTarget);
            updateConnectorLines(activeMcpTarget);
        });
    });

    // Initialize lines positions dynamically (SVG replacement/alignment)
    function alignLines() {
        const claudeNode = document.querySelector('.node-claude');
        if (!claudeNode) return;
        
        const claudeRect = claudeNode.getBoundingClientRect();
        const displayRect = document.querySelector('.mcp-interactive-display').getBoundingClientRect();
        
        const startX = (claudeRect.left - displayRect.left) + claudeRect.width;
        const startY = (claudeRect.top - displayRect.top) + (claudeRect.height / 2);

        targetNodes.forEach((node, index) => {
            const nodeRect = node.getBoundingClientRect();
            const endX = nodeRect.left - displayRect.left;
            const endY = nodeRect.top - displayRect.top + (nodeRect.height / 2);

            const dx = endX - startX;
            const dy = endY - startY;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            const line = document.querySelector(`.mcp-line.line-${index + 1}`);
            if (line) {
                line.style.left = `${startX}px`;
                line.style.top = `${startY}px`;
                line.style.width = `${length}px`;
                line.style.transform = `rotate(${angle}deg)`;
            }
        });
    }

    // Run alignment
    alignLines();
    window.addEventListener('resize', alignLines);
    
    // Auto active first target node line + initial translated render
    renderMcpDetails(activeMcpTarget);
    setTimeout(() => {
        updateConnectorLines('stripe');
    }, 100);

    // Re-render MCP details whenever the language changes
    document.addEventListener('languagechange', () => {
        renderMcpDetails(activeMcpTarget);
    });

    // 4. Update Footer Year
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = '2026';
    }

    // 5. Motion Design: hover preview + fullscreen lightbox
    const motionCards = document.querySelectorAll('.motion-card');
    const lightbox = document.getElementById('motionLightbox');
    const lightboxVideo = document.getElementById('motionLightboxVideo');
    const lightboxTitle = document.getElementById('motionLightboxTitle');
    const lightboxClose = document.getElementById('motionLightboxClose');
    const lightboxBackdrop = document.getElementById('motionLightboxBackdrop');

    function openLightbox(src, titleKey) {
        if (!lightbox || !lightboxVideo) return;
        lightboxVideo.src = src;
        if (lightboxTitle) {
            lightboxTitle.textContent = (window.i18n && titleKey) ? window.i18n.t(titleKey) : '';
        }
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const p = lightboxVideo.play();
        if (p && p.catch) p.catch(() => {});
    }
    function closeLightbox() {
        if (!lightbox || !lightboxVideo) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src');
        lightboxVideo.load();
        document.body.style.overflow = '';
    }

    motionCards.forEach(card => {
        const vid = card.querySelector('.motion-video');
        const isFeatured = card.classList.contains('motion-card-featured');
        if (!isFeatured) {
            card.addEventListener('mouseenter', () => {
                if (!vid) return;
                const pr = vid.play();
                if (pr && pr.catch) pr.catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                if (!vid) return;
                vid.pause();
                try { vid.currentTime = 0; } catch (e) { /* ignore */ }
            });
        }
        card.addEventListener('click', () => {
            openLightbox(card.dataset.video, card.dataset.titleKey);
        });
    });

    // Featured clip autoplays muted on loop
    const featuredVid = document.querySelector('.motion-card-featured .motion-video');
    if (featuredVid) {
        const fp = featuredVid.play();
        if (fp && fp.catch) fp.catch(() => {});
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });

    // 6. 3D Render gallery: clickable image lightbox
    const renderCards = document.querySelectorAll('.render3d-card');
    const imgLightbox = document.getElementById('imgLightbox');
    const imgLightboxImg = document.getElementById('imgLightboxImg');
    const imgLightboxCaption = document.getElementById('imgLightboxCaption');
    const imgLightboxClose = document.getElementById('imgLightboxClose');
    const imgLightboxBackdrop = document.getElementById('imgLightboxBackdrop');

    function openImgLightbox(src, captionKey) {
        if (!imgLightbox || !imgLightboxImg || !src) return;
        imgLightboxImg.src = src;
        if (imgLightboxCaption) {
            imgLightboxCaption.textContent = (window.i18n && captionKey) ? window.i18n.t(captionKey) : '';
        }
        imgLightbox.classList.add('open');
        imgLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeImgLightbox() {
        if (!imgLightbox || !imgLightboxImg) return;
        imgLightbox.classList.remove('open');
        imgLightbox.setAttribute('aria-hidden', 'true');
        imgLightboxImg.removeAttribute('src');
        document.body.style.overflow = '';
    }

    renderCards.forEach(card => {
        const open = () => openImgLightbox(card.dataset.full, card.dataset.captionKey);
        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    });

    if (imgLightboxClose) imgLightboxClose.addEventListener('click', closeImgLightbox);
    if (imgLightboxBackdrop) imgLightboxBackdrop.addEventListener('click', closeImgLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imgLightbox && imgLightbox.classList.contains('open')) {
            closeImgLightbox();
        }
    });

    // 7. Navigation menu: #navToggle toggles .nav.open (all viewports); links,
    //    outside click, and Escape all close it.
    const navToggle = document.getElementById('navToggle');
    const navEl = document.querySelector('.nav');
    if (navToggle && navEl) {
        const closeNav = () => {
            navEl.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        };
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navEl.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        navEl.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeNav);
        });
        document.addEventListener('click', (e) => {
            if (navEl.classList.contains('open') && !navEl.contains(e.target) && !navToggle.contains(e.target)) {
                closeNav();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNav();
        });
    }

    // 8. Scroll reveal: IntersectionObserver adds .is-visible to .reveal
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(el => el.classList.add('is-visible'));
        } else {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            revealEls.forEach(el => revealObserver.observe(el));
        }
    }
});
