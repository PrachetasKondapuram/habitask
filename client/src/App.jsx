import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

export default function App() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then(response => response.json())
      .then(data => {
        setApiStatus(data.ok ? "API is healthy" : "API error");
      })
      .catch(() => setApiStatus("API error"));
  }, []);
      
  return (
    <div className="min-h-screen bg-green-100">
      <h1 className="text-4x1 font-bold mb-4">Habitask</h1>
      <p>{apiStatus || "Checking API..."}</p>
    </div>
  );
}