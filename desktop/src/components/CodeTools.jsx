import React, { useState } from 'react';

export default function CodeTools() {
  const [mode, setMode] = useState('generate');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!input.trim()) {
      alert('Digite algo');
      return;
    }

    setLoading(true);
    const endpoint = mode === 'generate' ? '/api/ai/code-generate' : '/api/ai/code-review';
    const body = mode === 'generate' 
      ? { description: input }
      : { code: input };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      if (data.success) {
        setOutput(data.data.content);
      } else {
        setOutput('Erro: ' + data.message);
      }
    } catch (error) {
      setOutput('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert('Copiado');
  };

  return (
    <div className="tools-container">
      <h1>💻 Assistente de Código</h1>

      <div className="mode-selector">
        <label>
          <input 
            type="radio" 
            value="generate" 
            checked={mode === 'generate'}
            onChange={(e) => setMode(e.target.value)}
          />
          ✨ Gerar Código
        </label>
        <label>
          <input 
            type="radio" 
            value="review" 
            checked={mode === 'review'}
            onChange={(e) => setMode(e.target.value)}
          />
          🔍 Revisar Código
        </label>
      </div>

      <div className="editor-section">
        <div className="input-area">
          <label>
            {mode === 'generate' ? 'Descrição' : 'Código para Revisar'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'generate' 
              ? 'Descreva o código que deseja gerar...'
              : 'Cole o código aqui...'
            }
            rows="12"
          />
        </div>

        <div className="output-area">
          <label>Resultado</label>
          <textarea
            value={output}
            readOnly
            rows="12"
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
        onClick={handleProcess}
        disabled={loading}
      >
        {loading ? '⏳ Processando...' : '🚀 Executar'}
      </button>
    </div>
  );
}
