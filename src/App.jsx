import { useState } from 'react'
import { Outlet } from 'react-router'


function App() {
  return (
    <div className="App h-full w-full bg-slate-600">
      <Outlet />
    </div>
  )
}

export default App
