import React, { useState } from 'react';

function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [provider, setProvider] = useState('gemini');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Digite um prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          provider: provider
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.data.content);
      } else {
        setError(data.message || 'Erro ao gerar texto');
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>✨ Gerador de Texto</h2>

      <div className="form-group">
        <label>Provedor de IA</label>
        <select 
          value={provider} 
          onChange={(e) => setProvider(e.target.value)}
          className="input-field"
        >
          <option value="gemini">🔷 Google Gemini</option>
          <option value="groq">🟦 Groq Mixtral</option>
        </select>
      </div>

      <div className="form-group">
        <label>Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite seu prompt aqui..."
          className="textarea-field"
          rows="6"
        />
      </div>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? '⏳ Gerando...' : '🚀 Gerar'}
      </button>

      {error && (
        <div className="error-box">
          <p>❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="result-box">
          <h3>📝 Resultado</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default TextGenerator;
