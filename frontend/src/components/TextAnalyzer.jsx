import React, { useState } from 'react';

function TextAnalyzer() {
  const [text, setText] = useState('');
  const [analysisType, setAnalysisType] = useState('analyze');
  const [language, setLanguage] = useState('inglês');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Digite um texto');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    let endpoint = '/api/ai/analyze';
    let body = { text: text };

    if (analysisType === 'summarize') {
      endpoint = '/api/ai/summarize';
    } else if (analysisType === 'translate') {
      endpoint = '/api/ai/translate';
      body.language = language;
    }

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
      <h2>🔍 Analisador de Texto</h2>

      <div className="form-group">
        <label>Tipo de Análise</label>
        <select 
          value={analysisType} 
          onChange={(e) => setAnalysisType(e.target.value)}
          className="input-field"
        >
          <option value="analyze">Análise Profunda</option>
          <option value="summarize">Resumo</option>
          <option value="translate">Tradução</option>
        </select>
      </div>

      {analysisType === 'translate' && (
        <div className="form-group">
          <label>Idioma de Destino</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field"
          >
            <option value="inglês">Inglês</option>
            <option value="espanhol">Espanhol</option>
            <option value="francês">Francês</option>
            <option value="alemão">Alemão</option>
            <option value="japonês">Japonês</option>
            <option value="chinês">Chinês</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Texto para Processar</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole seu texto aqui..."
          className="textarea-field"
          rows="8"
        />
      </div>

      <button 
        onClick={handleAnalyze}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? '⏳ Processando...' : '🚀 Processar'}
      </button>

      {error && (
        <div className="error-box">
          <p>❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="result-box">
          <h3>📋 Resultado</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default TextAnalyzer;
