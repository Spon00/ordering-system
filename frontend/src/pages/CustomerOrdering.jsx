import React, { useState } from 'react'

const MENU = [
  { id: 'm1', name: 'Margherita Pizza', price: 12 },
  { id: 'm2', name: 'Caesar Salad', price: 8 },
  { id: 'm3', name: 'Spaghetti Bolognese', price: 14 },
  { id: 'm4', name: 'Cheeseburger', price: 11 }
]

export default function CustomerOrdering() {
  const [cart, setCart] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [orderId, setOrderId] = useState(null)
  const add = (item) => {
    setCart((c) => {
      const found = c.find(x => x.id === item.id)
      if (found) return c.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x)
      return [...c, { ...item, quantity: 1 }]
    })
  }
  const submit = async () => {
    if (cart.length === 0) return alert('Add items first')
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customerName })
    })
    const data = await res.json()
    if (data.id) {
      setOrderId(data.id)
      setCart([])
    } else {
      alert('Failed to create order')
    }
  }
  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0)
  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-grid">
        {MENU.map(it => (
          <div key={it.id} className="card">
            <h3>{it.name}</h3>
            <p>${it.price}</p>
            <button onClick={() => add(it)}>Add</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <div>
        {cart.length === 0 && <p>No items</p>}
        {cart.map(it => (
          <div key={it.id}>{it.name} x {it.quantity} - ${it.price * it.quantity}</div>
        ))}
        <div>Total: ${total}</div>
        <input placeholder="Your name (optional)" value={customerName} onChange={e => setCustomerName(e.target.value)} />
        <button onClick={submit} disabled={cart.length===0}>Submit Order</button>
        {orderId && <div className="success">Order submitted. Your order number: <strong>{orderId}</strong></div>}
      </div>
    </div>
  )
}
