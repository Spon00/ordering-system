import React from 'react'
export default function MenuItem({ item, onAdd }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <button onClick={() => onAdd(item)}>Add</button>
    </div>
  )
}
