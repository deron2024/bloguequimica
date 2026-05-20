// ========== BANCO DE ARTIGOS ==========
const postsData = [
    {
        id: 1,
        titulo: "Modelos Atômicos: De Dalton à Mecânica Quântica",
        categoria: "geral",
        resumo: "Evolução dos modelos atômicos, experimentos de Rutherford, Bohr e o modelo probabilístico.",
        conteudo: `<h3>Dalton (1808)</h3><p>Átomos indivisíveis e esféricos.</p><h3>Thomson (1897)</h3><p>Modelo "pudim de passas" – elétrons incrustados numa esfera positiva.</p><h3>Rutherford (1911)</h3><p>Núcleo denso e positivo, elétrons na eletrosfera.</p><h3>Bohr (1913)</h3><p>Níveis de energia quantizados: \\( E_n = \\frac{-13,6}{n^2} eV \\)</p><h3>Modelo Atual</h3><p>Orbitais, números quânticos e probabilidade eletrônica.</p>`
    },
    {
        id: 2,
        titulo: "Termoquímica: Entalpia, Lei de Hess e Combustão",
        categoria: "fisico",
        resumo: "Estudo das trocas de calor em reações químicas. Cálculo de ΔH.",
        conteudo: `<p><strong>Entalpia (H)</strong> – conteúdo energético.</p><p>\\( \\Delta H = H_{produtos} - H_{reagentes} \\)</p><p>Reações exotérmicas (ΔH < 0): liberam calor.</p><p>Lei de Hess: ΔH total é a soma das etapas.</p>`
    },
    {
        id: 3,
        titulo: "Química Orgânica: Funções e Reações",
        categoria: "organica",
        resumo: "Hidrocarbonetos, grupos funcionais, nomenclatura IUPAC.",
        conteudo: `<p><strong>Hidrocarbonetos:</strong> apenas C e H.</p><p><strong>Funções oxigenadas:</strong> álcoois, éteres, aldeídos, cetonas, ácidos.</p><p><strong>Polímeros:</strong> polietileno, PVC, náilon.</p>`
    },
    {
        id: 4,
        titulo: "Cinética Química: Velocidade de Reação",
        categoria: "fisico",
        resumo: "Fatores que afetam a velocidade, lei de velocidade.",
        conteudo: `<p>Velocidade = \\( \\frac{\\Delta [produto]}{\\Delta t} \\)</p><p>Lei de velocidade: \\( v = k [A]^m [B]^n \\)</p><p>Equação de Arrhenius: \\( k = A e^{-E_a/RT} \\)</p>`
    },
    {
        id: 5,
        titulo: "Equilíbrio Químico e pH",
        categoria: "analitica",
        resumo: "Constante de equilíbrio, princípio de Le Chatelier, pH.",
        conteudo: `<p>\\( K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\)</p><p>pH = -log[H⁺], pH + pOH = 14</p>`
    },
    {
        id: 6,
        titulo: "Tabela Periódica: Propriedades e Tendências",
        categoria: "geral",
        resumo: "Períodos, grupos, propriedades periódicas (raio atômico, eletronegatividade).",
        conteudo: `<p><strong>Raio Atômico:</strong> aumenta para baixo e esquerda.</p><p><strong>Eletronegatividade:</strong> aumenta para direita e cima (F é o maior).</p><p><strong>Energia de Ionização:</strong> aumenta para direita e cima.</p>`
    },
    {
        id: 7,
        titulo: "Radioatividade: Decaimento e Meia-vida",
        categoria: "fisico",
        resumo: "Tipos de radiação (alfa, beta, gama), meia-vida, datação por C-14.",
        conteudo: `<p><strong>Alfa (α):</strong> núcleo de He, baixa penetração.</p><p><strong>Beta (β):</strong> elétron, média penetração.</p><p><strong>Gama (γ):</strong> radiação eletromagnética, alta penetração.</p><p>Meia-vida: \\( N = N_0 \\cdot (1/2)^{t/t_{1/2}} \\)</p>`
    },
    {
        id: 8,
        titulo: "Eletroquímica: Pilhas e Eletrólise",
        categoria: "fisico",
        resumo: "Pilhas, potenciais-padrão, eletrólise, leis de Faraday.",
        conteudo: `<p>Pilha de Daniell: Zn + Cu²⁺ → Zn²⁺ + Cu, E° = 1,10V</p><p>E°_célula = E°_cátodo - E°_ânodo</p><p>Leis de Faraday: \\( m = \\frac{Q \\cdot MM}{n \\cdot F} \\), F = 96500 C/mol</p>`
    },
    {
        id: 9,
        titulo: "Ligações Químicas: Iônica, Covalente e Metálica",
        categoria: "geral",
        resumo: "Tipos de ligações, polaridade, forças intermoleculares.",
        conteudo: `<p><strong>Iônica:</strong> metal + ametal, transferência de elétrons.</p><p><strong>Covalente:</strong> ametal + ametal, compartilhamento.</p><p><strong>Metálica:</strong> mar de elétrons.</p>`
    },
    {
        id: 10,
        titulo: "Soluções Químicas e Concentrações",
        categoria: "analitica",
        resumo: "Molaridade, diluição, título, ppm.",
        conteudo: `<p>M = n/V (mol/L)</p><p>Diluição: M_i × V_i = M_f × V_f</p><p>ppm = 1 mg/L</p>`
    }
];

// ========== VARIÁVEIS GLOBAIS ==========
let currentCategory = "all";
let searchTerm = "";
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [
    { user: 'Bot', message: 'Olá! 👋 Bem-vindo ao chat do QuímicaTotal! Como posso ajudar?', time: new Date().toLocaleTimeString() }
];

// ========== FUNÇÕES DE RENDERIZAÇÃO ==========
function renderPosts() {
    const container = document.getElementById("postsContainer");
    const filtered = postsData.filter(post => {
        const matchCat = currentCategory === "all" || post.categoria === currentCategory;
        const matchSearch = post.titulo.toLowerCase().includes(searchTerm) || post.resumo.toLowerCase().includes(searchTerm);
        return matchCat && matchSearch;
    });

    if(filtered.length === 0) {
        container.innerHTML = "<p>❌ Nenhum artigo encontrado.</p>";
        document.getElementById("indexList").innerHTML = "";
        return;
    }

    let postsHtml = "";
    let indexHtml = "";

    filtered.forEach(post => {
        const isFav = favorites.includes(post.id);
        const favIcon = isFav ? '❤️' : '🤍';
        
        postsHtml += `
            <div class="post-card" id="post-${post.id}">
                <span class="categoria-badge">${post.categoria}</span>
                <h2>${post.titulo}</h2>
                <p>${post.resumo}</p>
                <div class="post-meta">
                    <span>👁️ <span id="views-${post.id}">0</span> visualizações</span>
                    <button class="fav-btn" data-id="${post.id}" style="background: none; border: none; cursor: pointer;">${favIcon} Favorito</button>
                    <button class="share-btn" data-title="${post.titulo}" data-url="${window.location.href.split('#')[0]}#post-${post.id}" style="background: none; border: none; cursor: pointer;">📤 Compartilhar</button>
                </div>
                <details>
                    <summary>📖 Ler artigo completo</summary>
                    <div class="conteudo-completo">${post.conteudo}</div>
                    <button class="load-comments-btn" data-post-id="${post.id}" data-post-title="${post.titulo}" style="margin-top: 1rem; background: #0d6efd; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 5px; cursor: pointer;">💬 Carregar comentários</button>
                    <div class="comments-container" id="comments-${post.id}"></div>
                </details>
            </div>
        `;
        indexHtml += `<li><a href="#post-${post.id}">${post.titulo}</a></li>`;
    });

    container.innerHTML = postsHtml;
    document.getElementById("indexList").innerHTML = indexHtml;
    
    // Renderizar favoritos na sidebar
    renderFavoritesList();
    
    // Carregar visualizações
    loadAllViews();
    
    // Setup dos eventos
    setupFavoriteButtons();
    setupShareButtons();
    setupCommentButtons();
    
    if(window.MathJax) MathJax.typesetPromise();
}

function renderFavoritesList() {
    const favContainer = document.getElementById('favoritesList');
    if(!favContainer) return;
    
    const favPosts = postsData.filter(p => favorites.includes(p.id));
    if(favPosts.length === 0) {
        favContainer.innerHTML = '<li style="color: #6c757d;">Nenhum favorito ainda</li>';
    } else {
        favContainer.innerHTML = favPosts.map(p => `<li><a href="#post-${p.id}">⭐ ${p.titulo.substring(0, 30)}</a></li>`).join('');
    }
}

// ========== VISUALIZAÇÕES ==========
function loadAllViews() {
    for(let i = 1; i <= 10; i++) {
        let views = localStorage.getItem(`view_post_${i}`);
        if(views === null) {
            localStorage.setItem(`view_post_${i}`, '0');
            views = 0;
        }
        const viewSpan = document.getElementById(`views-${i}`);
        if(viewSpan) viewSpan.textContent = views;
    }
}

function incrementView(postId) {
    let views = parseInt(localStorage.getItem(`view_post_${postId}`) || '0');
    views++;
    localStorage.setItem(`view_post_${postId}`, views);
    const viewSpan = document.getElementById(`views-${postId}`);
    if(viewSpan) viewSpan.textContent = views;
}

// Rastrear abertura de artigos
document.addEventListener('click', (e) => {
    if(e.target.tagName === 'SUMMARY' || e.target.closest('summary')) {
        const details = e.target.closest('details');
        if(details && details.open) {
            const postCard = details.closest('.post-card');
            if(postCard) {
                const idMatch = postCard.id.match(/post-(\d+)/);
                if(idMatch) {
                    incrementView(parseInt(idMatch[1]));
                }
            }
        }
    }
});

// ========== FAVORITOS ==========
function setupFavoriteButtons() {
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.removeEventListener('click', handleFavoriteClick);
        btn.addEventListener('click', handleFavoriteClick);
    });
}

function handleFavoriteClick(e) {
    const btn = e.currentTarget;
    const postId = parseInt(btn.dataset.id);
    const index = favorites.indexOf(postId);
    
    if(index === -1) {
        favorites.push(postId);
        btn.innerHTML = '❤️ Favorito';
        showNotification('⭐ Artigo adicionado aos favoritos!', 'success');
    } else {
        favorites.splice(index, 1);
        btn.innerHTML = '🤍 Favorito';
        showNotification('🗑️ Artigo removido dos favoritos', 'info');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavoritesList();
}

// ========== COMPARTILHAR ==========
function setupShareButtons() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.removeEventListener('click', handleShareClick);
        btn.addEventListener('click', handleShareClick);
    });
}

async function handleShareClick(e) {
    const btn = e.currentTarget;
    const title = btn.dataset.title;
    const url = btn.dataset.url;
    
    if(navigator.share) {
        try {
            await navigator.share({ title: title, text: `Confira este artigo: ${title}`, url: url });
        } catch(err) { console.log('Erro ao compartilhar:', err); }
    } else {
        await navigator.clipboard.writeText(url);
        showNotification(`🔗 Link copiado! Compartilhe "${title}"`, 'success');
    }
}

// ========== NOTIFICAÇÕES ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: '#28a745', error: '#dc3545', info: '#0d6efd', warning: '#ffc107' };
    notification.style.cssText = `position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: ${colors[type]}; color: white; padding: 0.8rem 1.5rem; border-radius: 8px; z-index: 3000; animation: slideIn 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2);`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.animation = 'slideOut 0.3s ease'; setTimeout(() => notification.remove(), 300); }, 3000);
    notification.onclick = () => notification.remove();
}

// ========== COMENTÁRIOS (SIMULADO) ==========
function setupCommentButtons() {
    document.querySelectorAll('.load-comments-btn').forEach(btn => {
        btn.removeEventListener('click', handleCommentClick);
        btn.addEventListener('click', handleCommentClick);
    });
}

function handleCommentClick(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.postId;
    const commentsContainer = document.getElementById(`comments-${postId}`);
    
    if(commentsContainer.innerHTML !== '') return;
    
    commentsContainer.innerHTML = `
        <div style="margin-top: 1rem; padding: 0.5rem; background: #f8f9fa; border-radius: 5px;">
            <p><strong>💬 Comentários (simulados)</strong></p>
            <div id="comments-list-${postId}">
                <p style="color: #6c757d;">Nenhum comentário ainda. Seja o primeiro!</p>
            </div>
            <div style="margin-top: 0.5rem;">
                <input type="text" id="comment-input-${postId}" placeholder="Deixe seu comentário..." style="width: 70%; padding: 0.3rem;">
                <button onclick="addComment(${postId})" style="background: #0d6efd; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 3px;">Enviar</button>
            </div>
        </div>
    `;
    btn.disabled = true;
    btn.textContent = '✅ Comentários carregados';
}

window.addComment = function(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const comment = input.value.trim();
    if(!comment) return;
    
    const list = document.getElementById(`comments-list-${postId}`);
    const emptyMsg = list.querySelector('p');
    if(emptyMsg && emptyMsg.style.color === 'rgb(108, 117, 125)') list.innerHTML = '';
    
    list.innerHTML += `<div style="padding: 0.3rem; border-bottom: 1px solid #dee2e6;"><strong>Você:</strong> ${escapeHtml(comment)} <span style="font-size: 0.7rem; color: #6c757d;">${new Date().toLocaleTimeString()}</span></div>`;
    input.value = '';
    showNotification('💬 Comentário adicionado!', 'success');
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== CHAT FLUTUANTE ==========
function renderChat() {
    const container = document.getElementById('chatMessagesList');
    if(!container) return;
    container.innerHTML = chatMessages.map(msg => `
        <div style="margin-bottom: 0.5rem;">
            <strong style="color: #0d6efd;">${msg.user}:</strong>
            <span>${escapeHtml(msg.message)}</span>
            <span style="font-size: 0.7rem; color: #6c757d; display: block;">${msg.time}</span>
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

function addChatMessage(user, message) {
    chatMessages.push({ user, message, time: new Date().toLocaleTimeString() });
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages.slice(-50)));
    renderChat();
    
    // Respostas automáticas
    if(user !== 'Bot') {
        setTimeout(() => {
            let response = '';
            const lowerMsg = message.toLowerCase();
            if(lowerMsg.includes('ph') || lowerMsg.includes('ácido')) response = 'pH = -log[H⁺]. Use nosso conteúdo sobre Equilíbrio Químico!';
            else if(lowerMsg.includes('tabela') || lowerMsg.includes('periódica')) response = 'Temos um artigo completo sobre Tabela Periódica!';
            else if(lowerMsg.includes('obrigado')) response = 'Por nada! Continue estudando! 🧪';
            else response = 'Obrigado pela mensagem! Explore nossos artigos e simuladores.';
            addChatMessage('Bot', response);
        }, 1000);
    }
}

// Chat UI
document.getElementById('openChatFloatBtn')?.addEventListener('click', () => {
    const chat = document.getElementById('chatFloat');
    chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
    renderChat();
});
document.getElementById('closeChatFloatBtn')?.addEventListener('click', () => {
    document.getElementById('chatFloat').style.display = 'none';
});
document.getElementById('sendChatMessageBtn')?.addEventListener('click', () => {
    const input = document.getElementById('chatMessageInput');
    if(input.value.trim()) {
        addChatMessage('Você', input.value);
        input.value = '';
    }
});
document.getElementById('chatMessageInput')?.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') document.getElementById('sendChatMessageBtn').click();
});

// ========== EVENTOS GERAIS ==========
document.querySelectorAll(".categories button").forEach(btn => {
    btn.addEventListener("click", e => {
        currentCategory = e.target.dataset.cat;
        renderPosts();
    });
});

document.getElementById("searchInput").addEventListener("input", e => {
    searchTerm = e.target.value.toLowerCase();
    renderPosts();
});

// Tema escuro
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Modo claro" : "🌙 Modo escuro";
});

// ========== INICIALIZAÇÃO ==========
renderPosts();
renderChat();

// Registrar Service Worker para PWA
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW error:', err));
    });
}

// Botão de instalação PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.createElement('button');
    installBtn.textContent = '📱 Instalar App';
    installBtn.style.cssText = 'position: fixed; bottom: 80px; left: 20px; background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 50px; cursor: pointer; z-index: 1000;';
    installBtn.onclick = async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if(outcome === 'accepted') showNotification('App instalado! 🎉', 'success');
        deferredPrompt = null;
        installBtn.remove();
    };
    document.body.appendChild(installBtn);
});