import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface ApiStatus {
  status: string
  version: string
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const response = await axios.get(\\/api/health\)
      setApiStatus({ status: 'online', version: '1.0.0' })
    } catch (error) {
      console.error('API Error:', error)
      setApiStatus({ status: 'offline', version: 'unknown' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>HAWZX-AI - Sistema Inteligente</title>
        <meta name=\"description\" content=\"HAWZX-AI - Sistema de Gerenciamento Inteligente\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
        <link rel=\"icon\" href=\"/favicon.ico\" />
      </Head>

      <main className=\"min-h-screen bg-gradient-to-br from-slate-900 to-slate-800\">
        {/* Navbar */}
        <nav className=\"bg-slate-900 border-b border-slate-700 shadow-lg\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center\">
            <div className=\"text-2xl font-bold text-blue-400\">
              🤖 HAWZX-AI
            </div>
            <div className=\"flex gap-4\">
              <button className=\"px-4 py-2 text-slate-300 hover:text-white transition\">
                Início
              </button>
              <button className=\"px-4 py-2 text-slate-300 hover:text-white transition\">
                Sobre
              </button>
              <button className=\"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition\">
                Entrar
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20\">
          <div className=\"grid md:grid-cols-2 gap-12 items-center\">
            <div>
              <h1 className=\"text-5xl font-bold text-white mb-4\">
                HAWZX-AI
              </h1>
              <h2 className=\"text-2xl text-blue-400 mb-6\">
                Sistema Inteligente de Gerenciamento
              </h2>
              <p className=\"text-slate-300 text-lg mb-8 leading-relaxed\">
                Organize seus projetos e tarefas com inteligência artificial. 
                Aumente sua produtividade com nossa plataforma moderna e intuitiva.
              </p>
              <div className=\"flex gap-4\">
                <button className=\"px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105\">
                  Começar Agora
                </button>
                <button className=\"px-8 py-3 border border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-slate-900 transition\">
                  Saiba Mais
                </button>
              </div>
            </div>
            <div className=\"bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-2xl\">
              <div className=\"space-y-4\">
                <div className=\"bg-slate-700 p-4 rounded text-slate-300\">
                  \$ API Status
                </div>
                <div className=\"bg-slate-700 p-4 rounded\">
                  {loading ? (
                    <div className=\"text-slate-400 animate-pulse\">Verificando...</div>
                  ) : apiStatus?.status === 'online' ? (
                    <div className=\"text-green-400 font-semibold\">✓ Backend Online</div>
                  ) : (
                    <div className=\"text-red-400 font-semibold\">✗ Backend Offline</div>
                  )}
                </div>
                <div className=\"bg-slate-700 p-4 rounded text-slate-400 text-sm\">
                  Versão: 1.0.0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className=\"bg-slate-800 py-20 border-t border-slate-700\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
            <h3 className=\"text-3xl font-bold text-white mb-12 text-center\">
              Recursos Principais
            </h3>
            <div className=\"grid md:grid-cols-3 gap-8\">
              {[
                { icon: '📊', title: 'Dashboard', desc: 'Visualize seus dados em tempo real' },
                { icon: '✅', title: 'Tarefas', desc: 'Organize e acompanhe suas atividades' },
                { icon: '🤖', title: 'IA', desc: 'Sugestões inteligentes e automação' },
              ].map((feature, i) => (
                <div key={i} className=\"bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-blue-400 transition\">
                  <div className=\"text-4xl mb-4\">{feature.icon}</div>
                  <h4 className=\"text-xl font-semibold text-white mb-2\">{feature.title}</h4>
                  <p className=\"text-slate-300\">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className=\"bg-slate-900 border-t border-slate-700 py-8\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400\">
            <p>&copy; 2025 HAWZX-AI. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
