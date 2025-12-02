import React, { useState } from 'react';
import './App.css';
import TextGenerator from './components/TextGenerator';
import TextAnalyzer from './components/TextAnalyzer';
import CodeGenerator from './components/CodeGenerator';
import Dashboard from './components/Dashboard';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🤖 HAWZX-AI</h1>
          <p>Sistema Inteligente com IA Generativa</p>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-btn ${currentTab === 'generate' ? 'active' : ''}`}
          onClick={() => setCurrentTab('generate')}
        >
          ✨ Gerar Texto
        </button>
        <button 
          className={`nav-btn ${currentTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setCurrentTab('analyze')}
        >
          🔍 Analisar
        </button>
        <button 
          className={`nav-btn ${currentTab === 'code' ? 'active' : ''}`}
          onClick={() => setCurrentTab('code')}
        >
          💻 Código
        </button>
      </nav>

      <main className="app-main">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'generate' && <TextGenerator />}
        {currentTab === 'analyze' && <TextAnalyzer />}
        {currentTab === 'code' && <CodeGenerator />}
      </main>

      <footer className="app-footer">
        <p>HAWZX-AI © 2024 | Powered by Gemini & Groq</p>
      </footer>
    </div>
  );
}

export default App;
