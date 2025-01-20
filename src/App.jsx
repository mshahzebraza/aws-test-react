import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiUrl, setApiUrl] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      // Use the custom URL if provided, otherwise fall back to environment variable
      const url = apiUrl || import.meta.env.VITE_API_URL
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>{import.meta.env.VITE_MSG}</h2>
      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder={`API URL (default: ${import.meta.env.VITE_API_URL})`}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            Current URL: {apiUrl || import.meta.env.VITE_API_URL}
          </div>
        </div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{ marginLeft: '1rem' }}
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        {data.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Fetched Data:</h3>
            <ul style={{ textAlign: 'left' }}>
              {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
