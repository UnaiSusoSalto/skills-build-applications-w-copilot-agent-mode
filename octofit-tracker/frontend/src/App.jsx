import { NavLink, Route, Routes } from 'react-router-dom'
import logo from './assets/hero.png'
import Users from './components/api/users/Users'
import Teams from './components/api/teams/Teams'
import Activities from './components/api/activities/Activities'
import Workouts from './components/api/workouts/Workouts'
import Leaderboard from './components/api/leaderboard/Leaderboard'
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
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
