import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./styles/App.css"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Player from './player/Player';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="player" element={<Player />}>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
