import React, { useState } from 'react';

export default function TextTools() {
  const [activeTab, setActiveTab] = useState('generate');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Digite algo para gerar');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, provider: 'gemini' })
      });
      
      const data = await response.json();
      if (data.success) {
        setOutput(data.data.content);
      } else {
        setOutput('Erro: ' + data.message);
      }
    } catch (error) {
      setOutput('Erro de conexão: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert('Copiado para clipboard');
  };

  return (
    <div className="tools-container">
      <h1>🤖 HAWZX-AI Desktop</h1>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          ✨ Gerar
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          🔍 Analisar
        </button>
        <button 
          className={`tab-btn ${activeTab === 'translate' ? 'active' : ''}`}
          onClick={() => setActiveTab('translate')}
        >
          🌐 Traduzir
        </button>
      </div>

      <div className="editor-section">
        <div className="input-area">
          <label>Entrada</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite seu texto aqui..."
            rows="10"
          />
        </div>

        <div className="output-area">
          <label>Resultado</label>
          <textarea
            value={output}
            readOnly
            rows="10"
          />
          {output && (
            <button className="copy-btn" onClick={handleCopy}>
              📋 Copiar
            </button>
          )}
        </div>
      </div>

      <button 
        className="action-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '⏳ Processando...' : '🚀 Processar'}
      </button>
    </div>
  );
}
