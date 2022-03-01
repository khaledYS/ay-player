import { useState } from 'react'
import { Outlet } from 'react-router'
import './tailwind/output.css';

function App() {

  

  return (
    <div className="App h-full w-full bg-gray-900">
      <Outlet />
    </div>
  )
}

export default App
