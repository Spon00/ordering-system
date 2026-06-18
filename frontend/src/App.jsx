import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CustomerOrdering from './pages/CustomerOrdering'
import KitchenDashboard from './pages/KitchenDashboard'
import OrderStatus from './pages/OrderStatus'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Order</Link>
        <Link to="/kitchen">Kitchen</Link>
        <Link to="/status">Track</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<CustomerOrdering />} />
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/status" element={<OrderStatus />} />
        </Routes>
      </main>
    </div>
  )
}
