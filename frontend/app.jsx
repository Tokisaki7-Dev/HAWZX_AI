'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Erro ao verificar saúde da API:', error);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="container">
      <h1>HAWZX-AI</h1>
      <p>Bem-vindo ao HAWZX-AI</p>
      
      {loading ? (
        <p>Carregando...</p>
      ) : status ? (
        <div>
          <h2>Status da API: {status.status}</h2>
          <p>{status.message}</p>
        </div>
      ) : (
        <p>Erro ao conectar com a API</p>
      )}
    </div>
  );
}
