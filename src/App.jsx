import { useState } from 'react'
import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const isSubRoute = location.pathname !== "/";

  return (
    <>
      <div className='navigation'>
        <nav className='nav-menu'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="shop">Shop</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
            <li>
              <Link to="login">Authenticate</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='content'>
        {
          !isSubRoute && (
            <div className='home-page'>
              <h1>Home</h1>
            </div>
          )
        }
        <Outlet />
      </div>
    </>
  )
}

export default App
