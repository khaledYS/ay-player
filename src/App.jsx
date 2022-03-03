import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import './tailwind/output.css';

function App() {
  useEffect(()=>{console.clear(); document.title = "AY player"}, [])
  return (
    <div className="App h-full w-full bg-gray-900">
      <Outlet />
    </div>
  )
}

export default App
