import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import MovieGrid from './pages/MovieGrid'
import MovieWatchList from './pages/MovieWatchList'
import Profile from './pages/Profile'
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/movies" element={<MovieGrid/>} />
          <Route path="/moviegrid/:id/:age/:userid" element={<MovieGrid/>} />
          <Route path="/movies/:id/:movieId" element={<MovieDetail/>} />
          <Route path="/profiles/:id" element={<Profile/>} />
          <Route path="/watchHistory/:id" element={<MovieWatchList/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App


{/*
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
   <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}