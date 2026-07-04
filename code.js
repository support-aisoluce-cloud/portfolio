/* =============================================================================
   code.js — "Code & Repos" flagship section
   -----------------------------------------------------------------------------
   A dependency-free tabbed repo switcher with a tiny vanilla syntax highlighter.
   - 6 real snippets, stored as PLAIN strings (read verbatim from local repos).
   - Highlighter escapes <, >, & FIRST, then wraps tokens in safe <span> markup.
     Code is never injected as raw innerHTML — only the escaped/tokenized output.
   - Tab wiring clones the existing MCP node-click pattern (app.js): a NodeList
     forEach that toggles .active and calls a render function.
   - Re-renders on 'languagechange' so the rationale localizes; code stays
     language-agnostic (filenames, language tags and code bodies never translate).
   ========================================================================== */
(function () {
    'use strict';

    /* ---------------------------------------------------------------------
       1. SNIPPETS — verbatim, trimmed to the tightest block that shows the
          decision. Stored as plain strings; \n newlines, real characters.
       --------------------------------------------------------------------- */
    var SNIPPETS = [
        {
            repo: 'intelligence-pipeline',
            file: 'intelligence/gate.py',
            lang: 'python',
            langLabel: 'PYTHON',
            url: 'https://github.com/support-aisoluce-cloud/intelligence-pipeline/blob/main/intelligence/gate.py',
            code:
'_SYSTEM = """You are an independent verification gate in a multi-agent intelligence pipeline.\n' +
'Assess whether the parallel research findings are consistent, well-sourced, and reliable.\n' +
'\n' +
'Respond ONLY with valid JSON — no prose, no markdown fences:\n' +
'{ "pass": true, "confidence": 8, "conflicts": [...], "gaps": [...], "verdict": "..." }"""\n' +
'\n' +
'async def run_gate(topic: str, findings: list[dict]) -> dict:\n' +
'    formatted = "\\n\\n".join(\n' +
'        f"=== {f[\'angle\'].upper()} ({f[\'searches\']} searches) ===\\n{f[\'content\']}"\n' +
'        for f in findings\n' +
'    )\n' +
'    response = await client.messages.create(\n' +
'        model="claude-sonnet-5", max_tokens=512, system=_SYSTEM,\n' +
'        messages=[{"role": "user", "content": f"Topic: {topic}\\n\\n{formatted}"}]\n' +
'    )\n' +
'    return json.loads(response.content[0].text.strip())'
        },
        {
            repo: 'treasuryos',
            file: 'lib/accounting/cost-basis.ts',
            lang: 'typescript',
            langLabel: 'TYPESCRIPT',
            url: 'https://github.com/support-aisoluce-cloud/treasuryos/blob/main/lib/accounting/cost-basis.ts',
            code:
'// Consume tax lots using the selected method (exact-decimal maths)\n' +
'const available = [...lots];\n' +
'if (method === "fifo") {\n' +
'  available.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());\n' +
'} else if (method === "lifo") {\n' +
'  available.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());\n' +
'} else {\n' +
'  available.sort((a, b) => b.costPerUnit.minus(a.costPerUnit).toNumber());\n' +
'}\n' +
'\n' +
'for (const lot of available) {\n' +
'  if (remaining.lte(0)) { updatedLots.push(lot); continue; }\n' +
'  if (lot.amount.lte(remaining)) {\n' +
'    totalCostBasis = totalCostBasis.plus(lot.totalCost);\n' +
'    remaining = remaining.minus(lot.amount);\n' +
'  } else {\n' +
'    const partialCost = lot.costPerUnit.mul(remaining);   // partial lot\n' +
'    totalCostBasis = totalCostBasis.plus(partialCost);\n' +
'    updatedLots.push({ ...lot, amount: lot.amount.minus(remaining),\n' +
'                       totalCost: lot.totalCost.minus(partialCost) });\n' +
'    remaining = new Decimal(0);\n' +
'  }\n' +
'}\n' +
'const term = holdingDays > 365 ? "long" : "short";'
        },
        {
            repo: 'ai-ui-generator',
            file: 'src/lib/transform/jsx-transformer.ts',
            lang: 'typescript',
            langLabel: 'TYPESCRIPT',
            url: 'https://github.com/support-aisoluce-cloud/ai-ui-generator/blob/main/src/lib/transform/jsx-transformer.ts',
            code:
'// Resolve an import against every variant we might have generated\n' +
'let found = false;\n' +
'const variations = [\n' +
'  importPath, importPath + ".jsx", importPath + ".tsx",\n' +
'  importPath + ".js", importPath + ".ts",\n' +
'  importPath.replace("@/", "/"),\n' +
'  importPath.replace("@/", "/") + ".jsx",\n' +
'  importPath.replace("@/", "/") + ".tsx",\n' +
'];\n' +
'for (const variant of variations) {\n' +
'  if (imports[variant] || files.has(variant)) { found = true; break; }\n' +
'}\n' +
'\n' +
'if (!found) {\n' +
'  // On a miss, synthesize a placeholder module so preview never crashes\n' +
'  const match = importPath.match(/\\/([^\\/]+)$/);\n' +
'  const componentName = match ? match[1] : importPath.replace(/[^a-zA-Z0-9]/g, "");\n' +
'  const placeholderCode = createPlaceholderModule(componentName);\n' +
'  imports[importPath] = createBlobURL(placeholderCode);\n' +
'}'
        },
        {
            repo: 'yt-agent-studio',
            file: '.claude/agents/idea-scout.md',
            lang: 'markdown',
            langLabel: 'MARKDOWN',
            url: 'https://github.com/support-aisoluce-cloud/yt-agent-studio/blob/main/.claude/agents/idea-scout.md',
            code:
'---\n' +
'name: idea-scout\n' +
'description: Phase A. Trouve des idées de vidéos déjà prouvées (Icon Method) en repérant les outliers de chaînes concurrentes via Apify. Renvoie une liste d\'idées classées.\n' +
'tools: Read, Write, Skill, ToolSearch, mcp__Apify__search-actors, mcp__Apify__call-actor, mcp__Apify__get-dataset-items\n' +
'---\n' +
'\n' +
'Tu es le chercheur d\'idées. Tu utilises la skill `icon-method`.\n' +
'\n' +
'Workflow :\n' +
'1. Lis les concurrents seed dans `channel/channel-profile.md`.\n' +
'2. Scrape leurs vidéos via Apify, calcule les ratios outlier (vues/moyenne ≥ 3).\n' +
'3. Si data de revenu dispo, trie par $ plutôt que par vues.\n' +
'4. Propose un angle d\'amélioration par idée.\n' +
'\n' +
'Semi-autonome : pas de blocage, mais signale les 2-3 meilleures idées pour revue.\n' +
'Ne devine jamais une idée sans preuve de concept (un outlier source réel).'
        },
        {
            repo: 'portfolio',
            file: 'i18n.js',
            lang: 'javascript',
            langLabel: 'JAVASCRIPT',
            url: 'https://github.com/support-aisoluce-cloud/portfolio/blob/main/i18n.js',
            code:
'function t(key) {\n' +
'    const dict = translations[currentLang] || translations[DEFAULT_LANG];\n' +
'    if (dict && dict[key] != null) return dict[key];\n' +
'    const fb = translations[DEFAULT_LANG];\n' +
'    return (fb && fb[key] != null) ? fb[key] : key;   // key fallback\n' +
'}\n' +
'\n' +
'function apply(lang) {\n' +
'    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;\n' +
'    currentLang = lang;\n' +
'    document.documentElement.lang = lang;\n' +
'    // 3 declarative binding modes: text, html, placeholder\n' +
'    document.querySelectorAll("[data-i18n]").forEach(el => {\n' +
'        const v = t(el.getAttribute("data-i18n"));\n' +
'        if (v != null) el.textContent = v;\n' +
'    });\n' +
'    document.querySelectorAll("[data-i18n-html]").forEach(el => {\n' +
'        el.innerHTML = t(el.getAttribute("data-i18n-html"));\n' +
'    });\n' +
'    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));\n' +
'}'
        },
        {
            repo: 'pixa-gandalf',
            file: 'agent/tactic_scores.py',
            lang: 'python',
            langLabel: 'PYTHON',
            url: 'https://github.com/support-aisoluce-cloud/pixa-gandalf/blob/main/agent/tactic_scores.py',
            code:
'def rank(self, target_id: str, candidates: list[str], top_n: int = 5) -> list[tuple[str, float]]:\n' +
'    """Rank tactics by Wilson lower-bound on win rate. Unseen tactics get a\n' +
'    neutral prior so they still get tried at least once (exploration)."""\n' +
'    with self._lock:\n' +
'        t = self._scores.get(target_id, {})\n' +
'    scored: list[tuple[str, float]] = []\n' +
'    for tac in candidates:\n' +
'        row = t.get(tac)\n' +
'        if not row or row.get("attempts", 0) < 2:\n' +
'            # Optimistic prior: untried tactics rank 0.55 to encourage exploration\n' +
'            scored.append((tac, 0.55))\n' +
'            continue\n' +
'        wins = float(row.get("wins", 0))\n' +
'        n = int(row.get("attempts", 0))\n' +
'        p = max(0.0, min(1.0, wins / n))  # raw win rate, clamped\n' +
'        scored.append((tac, _wilson_lower_bound(p, n)))\n' +
'    scored.sort(key=lambda x: x[1], reverse=True)\n' +
'    return scored[:top_n]'
        }
    ];

    /* ---------------------------------------------------------------------
       2. TINY VANILLA HIGHLIGHTER
       Strategy: escape HTML first (so tokens can never break the DOM), then
       run an ordered tokenizer that emits <span class="tok-*">…</span>. We
       consume comments/strings/numbers as whole tokens so keyword regexes
       never touch text inside them. Correctness > completeness — anything we
       are unsure about is left as an unstyled (already-escaped) character.
       --------------------------------------------------------------------- */
    var KEYWORDS = {
        python: ['def','return','async','await','for','in','if','not','or','and','else','elif',
                 'import','from','class','with','as','lambda','True','False','None','try','except',
                 'raise','yield','while','continue','break','pass','list','dict','tuple','str','int','float','bool'],
        typescript: ['const','let','var','function','return','if','else','for','of','in','new','await','async',
                     'import','from','export','class','extends','interface','type','enum','continue','break',
                     'throw','try','catch','while','typeof','instanceof','void','null','undefined','true','false',
                     'string','number','boolean','this'],
        javascript: ['const','let','var','function','return','if','else','for','of','in','new','await','async',
                     'import','from','export','class','extends','continue','break','throw','try','catch','while',
                     'typeof','instanceof','void','null','undefined','true','false','this'],
        markdown: []
    };

    function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function span(cls, escapedText) {
        return '<span class="' + cls + '">' + escapedText + '</span>';
    }

    // Highlight a single logical line. `lang` selects keyword set + comment style.
    function highlightLine(line, lang) {
        // Markdown: keep it readable, only style frontmatter fences / headings / list markers.
        if (lang === 'markdown') {
            var mfence = /^---\s*$/;
            if (mfence.test(line)) return span('tok-com', escapeHtml(line));
            var mhead = line.match(/^(#{1,6}\s.*)$/);
            if (mhead) return span('tok-kw', escapeHtml(line));
            var mlist = line.match(/^(\s*(?:[-*]|\d+\.)\s)(.*)$/);
            if (mlist) return span('tok-num', escapeHtml(mlist[1])) + escapeHtml(mlist[2]);
            // key: value frontmatter
            var mkv = line.match(/^(\s*[A-Za-z_][\w-]*)(:)(.*)$/);
            if (mkv) return span('tok-fn', escapeHtml(mkv[1])) + span('tok-punc', ':') + escapeHtml(mkv[3]);
            return escapeHtml(line);
        }

        var kw = KEYWORDS[lang] || [];
        var kwSet = {};
        for (var i = 0; i < kw.length; i++) kwSet[kw[i]] = true;

        var out = '';
        var n = line.length;
        var pos = 0;

        while (pos < n) {
            var ch = line[pos];
            var rest = line.slice(pos);

            // Line comment (# for python, // for js/ts)
            if ((lang === 'python' && ch === '#') ||
                ((lang === 'typescript' || lang === 'javascript') && ch === '/' && line[pos + 1] === '/')) {
                out += span('tok-com', escapeHtml(rest));
                break;
            }

            // Strings: ' " ` and python triple-quotes (single line fragments only)
            if (ch === '"' || ch === "'" || ch === '`') {
                var quote = ch;
                var j = pos + 1;
                var str = quote;
                while (j < n) {
                    if (line[j] === '\\' && j + 1 < n) { str += line[j] + line[j + 1]; j += 2; continue; }
                    str += line[j];
                    if (line[j] === quote) { j++; break; }
                    j++;
                }
                out += span('tok-str', escapeHtml(str));
                pos = j;
                continue;
            }

            // Numbers (int / float)
            var numMatch = rest.match(/^\d+(?:\.\d+)?/);
            if (numMatch && !/[A-Za-z_]/.test(line[pos - 1] || '')) {
                out += span('tok-num', escapeHtml(numMatch[0]));
                pos += numMatch[0].length;
                continue;
            }

            // Identifiers / keywords / function-call names
            var idMatch = rest.match(/^[A-Za-z_]\w*/);
            if (idMatch) {
                var word = idMatch[0];
                if (kwSet[word]) {
                    out += span('tok-kw', escapeHtml(word));
                } else if (line[pos + word.length] === '(') {
                    out += span('tok-fn', escapeHtml(word));
                } else {
                    out += escapeHtml(word);
                }
                pos += word.length;
                continue;
            }

            // Punctuation
            if (/[{}()\[\].,:;=+\-*/<>!?&|%]/.test(ch)) {
                out += span('tok-punc', escapeHtml(ch));
                pos++;
                continue;
            }

            // Anything else: escape a single char, leave unstyled.
            out += escapeHtml(ch);
            pos++;
        }
        return out;
    }

    // Build the full <pre> body: a gutter is rendered via CSS counters, so we
    // only emit one wrapped line per source line.
    function highlight(code, lang) {
        var lines = code.split('\n');
        var html = '';
        for (var i = 0; i < lines.length; i++) {
            html += '<span class="code-line">' + highlightLine(lines[i], lang) + '</span>';
        }
        return html;
    }

    /* ---------------------------------------------------------------------
       3. RENDER + TAB WIRING  (mirrors the MCP node-click pattern)
       --------------------------------------------------------------------- */
    function t(key, fallback) {
        if (window.i18n && typeof window.i18n.t === 'function') {
            var v = window.i18n.t(key);
            if (v != null && v !== key) return v;
        }
        return fallback;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var tabWrap = document.getElementById('codeTabs');
        var windowEl = document.getElementById('codeWindow');
        if (!tabWrap || !windowEl) return;

        // Build tabs
        SNIPPETS.forEach(function (snip, idx) {
            var tab = document.createElement('button');
            tab.type = 'button';
            tab.className = 'repo-tab' + (idx === 0 ? ' active' : '');
            tab.dataset.repo = snip.repo;
            tab.setAttribute('role', 'tab');
            tab.innerHTML =
                '<span class="repo-tab-dot"></span>' +
                '<span class="repo-tab-name">' + escapeHtml(snip.repo) + '</span>' +
                '<span class="repo-tab-lang">' + escapeHtml(snip.langLabel) + '</span>';
            tabWrap.appendChild(tab);
        });

        var tabs = tabWrap.querySelectorAll('.repo-tab');
        var activeRepo = SNIPPETS[0].repo;

        function snippetFor(repo) {
            for (var i = 0; i < SNIPPETS.length; i++) {
                if (SNIPPETS[i].repo === repo) return SNIPPETS[i];
            }
            return SNIPPETS[0];
        }

        function renderWindow(repo) {
            var snip = snippetFor(repo);
            var rationale = t('code.' + repo + '.rationale', '');
            var viewLabel = t('code.view_github', 'View on GitHub');
            var copyLabel = t('code.copy', 'Copy');

            windowEl.innerHTML =
                '<div class="terminal-header">' +
                    '<div class="terminal-dots">' +
                        '<span class="dot red"></span>' +
                        '<span class="dot yellow"></span>' +
                        '<span class="dot green"></span>' +
                    '</div>' +
                    '<div class="terminal-title">' + escapeHtml(snip.file) + '</div>' +
                    '<div class="terminal-badge">' + escapeHtml(snip.langLabel) + '</div>' +
                '</div>' +
                '<div class="code-body">' +
                    '<pre class="code-pre"><code>' + highlight(snip.code, snip.lang) + '</code></pre>' +
                '</div>' +
                '<div class="code-rationale">' + escapeHtml(rationale) + '</div>' +
                '<div class="code-footer">' +
                    '<a class="btn btn-small btn-primary-outline code-gh" href="' + snip.url + '" target="_blank" rel="noopener">' +
                        viewLabel + ' ↗</a>' +
                    '<button type="button" class="code-copy" data-repo="' + escapeHtml(snip.repo) + '">' + copyLabel + '</button>' +
                '</div>';

            // Copy button
            var copyBtn = windowEl.querySelector('.code-copy');
            if (copyBtn) {
                copyBtn.addEventListener('click', function () {
                    var text = snippetFor(activeRepo).code;
                    var done = function () {
                        copyBtn.textContent = t('code.copied', 'Copied');
                        copyBtn.classList.add('copied');
                        setTimeout(function () {
                            copyBtn.textContent = t('code.copy', 'Copy');
                            copyBtn.classList.remove('copied');
                        }, 1200);
                    };
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(done, function () { done(); });
                    } else {
                        done();
                    }
                });
            }
        }

        // Tab clicks — clone of the MCP targetNodes.forEach pattern.
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t2) { t2.classList.remove('active'); });
                tab.classList.add('active');
                activeRepo = tab.dataset.repo;
                renderWindow(activeRepo);
            });
        });

        // Initial render
        renderWindow(activeRepo);

        // Re-render on language change so the rationale localizes.
        document.addEventListener('languagechange', function () {
            renderWindow(activeRepo);
        });
    });
})();
