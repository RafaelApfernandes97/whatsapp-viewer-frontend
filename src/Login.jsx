import { useState } from 'react'
import axios from 'axios'
import './Login.css'

// Normalizar URL: remover barras duplicadas
const normalizeUrl = (url) => {
  if (!url) return url
  return url.replace(/([^:]\/)\/+/g, '$1')
}

const API_URL = normalizeUrl(import.meta.env.VITE_API_URL) || '/api'

// Debug: verificar qual URL está sendo usada
console.log('🔍 [Login] VITE_API_URL (original):', import.meta.env.VITE_API_URL)
console.log('🔍 [Login] API_URL (normalizada):', API_URL)

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/login`, { username, password })
      localStorage.setItem('token', response.data.token)
      onLogin(response.data.token)
    } catch (err) {
      setError('Usuário ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Mais Chat - Viewer</h1>
        <p>Faça login para acessar</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
