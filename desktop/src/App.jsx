import React, { useEffect, useState } from 'react';
import './styles/main.css';
import Sidebar from './components/Sidebar';
import TextTools from './components/TextTools';
import CodeTools from './components/CodeTools';
import Settings from './components/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('text');
  const [apiStatus, setApiStatus] = useState('desconectado');

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      if (response.ok) {
        setApiStatus('conectado');
      } else {
        setApiStatus('desconectado');
      }
    } catch (err) {
      setApiStatus('desconectado');
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        apiStatus={apiStatus}
      />
      
      <main className="main-content">
        {currentPage === 'text' && <TextTools />}
        {currentPage === 'code' && <CodeTools />}
        {currentPage === 'settings' && <Settings />}
      </main>
    </div>
  );
}
