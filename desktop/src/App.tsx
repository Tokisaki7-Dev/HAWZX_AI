import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface AppState {
  apiOnline: boolean
  version: string
  projects: any[]
  tasks: any[]
}

function App() {
  const [state, setState] = useState<AppState>({
    apiOnline: false,
    version: '1.0.0',
    projects: [],
    tasks: [],
  })

  useEffect(() => {
    checkAPIStatus()
    loadProjects()
    loadTasks()
  }, [])

  const checkAPIStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health')
      setState(prev => ({ ...prev, apiOnline: true }))
    } catch (error) {
      console.error('API Error:', error)
      setState(prev => ({ ...prev, apiOnline: false }))
    }
  }

  const loadProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects')
      setState(prev => ({ ...prev, projects: response.data.data?.projects || [] }))
    } catch (error) {
      console.error('Projects Error:', error)
    }
  }

  const loadTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks')
      setState(prev => ({ ...prev, tasks: response.data.data?.tasks || [] }))
    } catch (error) {
      console.error('Tasks Error:', error)
    }
  }

  return (
    <div className=\"App\">
      <header className=\"app-header\">
        <div className=\"header-content\">
          <h1>🤖 HAWZX-AI</h1>
          <div className=\"status\">
            <span className={state.apiOnline ? 'online' : 'offline'}>
              {state.apiOnline ? '● Online' : '● Offline'}
            </span>
          </div>
        </div>
      </header>

      <main className=\"app-main\">
        <div className=\"dashboard-grid\">
          <div className=\"card\">
            <h2>📊 Dashboard</h2>
            <div className=\"stat\">
              <span>Projetos</span>
              <strong>{state.projects.length}</strong>
            </div>
            <div className=\"stat\">
              <span>Tarefas</span>
              <strong>{state.tasks.length}</strong>
            </div>
          </div>

          <div className=\"card\">
            <h2>✅ Ações Rápidas</h2>
            <button className=\"btn btn-primary\">Novo Projeto</button>
            <button className=\"btn btn-secondary\">Nova Tarefa</button>
          </div>

          <div className=\"card\">
            <h2>🔄 Status</h2>
            <p>API: {state.apiOnline ? 'Conectado' : 'Desconectado'}</p>
            <p>Versão: {state.version}</p>
          </div>
        </div>

        {state.projects.length > 0 && (
          <div className=\"projects-section\">
            <h2>Meus Projetos</h2>
            <ul>
              {state.projects.map((proj: any) => (
                <li key={proj.id}>{proj.name}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className=\"app-footer\">
        <p>&copy; 2025 HAWZX-AI. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App
