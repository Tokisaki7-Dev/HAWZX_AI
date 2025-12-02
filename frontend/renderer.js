const API = 'http://localhost:8000';
const chat = document.getElementById('chat');
const input = document.getElementById('input');

function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'ai'}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function send() {
    const msg = input.value.trim();
    if (!msg) return;
    
    addMessage(msg, true);
    input.value = '';
    
    try {
        const res = await fetch(`${API}/api/chat?message=${encodeURIComponent(msg)}`, {
            method: 'POST'
        });
        const data = await res.json();
        addMessage(data.response, false);
    } catch (err) {
        addMessage('❌ Erro: Backend offline', false);
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') send();
});
