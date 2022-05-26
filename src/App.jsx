import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'


function App() {


  // in the meantime 
  // to redirect to the player page sence we don't have an home page
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === "/"){
      navigate("/player")
    }
  }, [])

  return (
    
    <div className="App h-full w-full bg-slate-600">
      <Outlet />
    </div>
  )
}

export default App
