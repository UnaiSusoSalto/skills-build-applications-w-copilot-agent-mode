import { NavLink, Route, Routes } from 'react-router-dom'
import logo from './assets/hero.png'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'
import './App.css'

function Home() {
  return (
    <div>
      <h1>Welcome to OctoFit Tracker</h1>
      <p>Track activities, join teams and climb the leaderboard.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="OctoFit Tracker" width="32" height="32" />
          OctoFit Tracker
        </NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/api/users">Users</NavLink>
          <NavLink className="nav-link" to="/api/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/api/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/api/workouts">Workouts</NavLink>
          <NavLink className="nav-link" to="/api/leaderboard">Leaderboard</NavLink>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/api/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/api/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/api/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/api/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/api/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
