import React, { useState } from 'react';

function CodeGenerator() {
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('generate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (mode === 'generate' && !description.trim()) {
      setError('Digite uma descrição');
      return;
    }
    if (mode === 'review' && !code.trim()) {
      setError('Cole um código');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const endpoint = mode === 'generate' ? '/api/ai/code-generate' : '/api/ai/code-review';
    const body = mode === 'generate' 
      ? { description: description }
      : { code: code };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.data.content);
      } else {
        setError(data.message || 'Erro ao processar');
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>💻 Assistente de Código</h2>

      <div className="form-group">
        <label>Modo</label>
        <div className="radio-group">
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
      </div>

      {mode === 'generate' ? (
        <div className="form-group">
          <label>Descrição do Código Desejado</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Crie uma função que valida email em Python..."
            className="textarea-field"
            rows="6"
          />
        </div>
      ) : (
        <div className="form-group">
          <label>Código para Revisar</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Cole seu código aqui..."
            className="textarea-field"
            rows="8"
          />
        </div>
      )}

      <button 
        onClick={handleProcess}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? '⏳ Processando...' : '🚀 Executar'}
      </button>

      {error && (
        <div className="error-box">
          <p>❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="result-box">
          <h3>📝 Resultado</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeGenerator;
