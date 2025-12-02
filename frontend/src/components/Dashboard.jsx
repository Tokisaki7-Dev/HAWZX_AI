import React from 'react';

function Dashboard() {
  const [status, setStatus] = React.useState('carregando...');
  const [apiUrl] = React.useState('http://localhost:5000');

  React.useEffect(() => {
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setStatus('online'))
      .catch(err => setStatus('offline'));
  }, [apiUrl]);

  return (
    <div className="component-container">
      <h2>📊 Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Status Backend</h3>
          <p className={`status-badge ${status}`}>{status}</p>
        </div>

        <div className="dashboard-card">
          <h3>Recursos Disponíveis</h3>
          <ul>
            <li>✨ Geração de Texto</li>
            <li>🔍 Análise de Conteúdo</li>
            <li>📝 Resumo Automático</li>
            <li>🌐 Tradução</li>
            <li>💻 Geração de Código</li>
            <li>🔎 Revisão de Código</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>Modelos de IA</h3>
          <ul>
            <li>🔷 Google Gemini Pro</li>
            <li>🟦 Groq Mixtral</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>Endpoints Principais</h3>
          <ul>
            <li>/api/ai/generate</li>
            <li>/api/ai/analyze</li>
            <li>/api/ai/summarize</li>
            <li>/api/ai/code-generate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
