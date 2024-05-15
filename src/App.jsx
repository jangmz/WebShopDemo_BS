import { useState, createContext } from 'react'
import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import TokenMessage from './components/tokenMessage';

export const TokenContext = createContext();

function App() {
  const [token, setToken] = useState(null);
  const location = useLocation();
  const isSubRoute = location.pathname !== "/";

  return (
    <TokenContext.Provider value={{ token, setToken }}>
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
            { token === null && <li>
              <Link to="login">Authenticate</Link>
            </li> }
          </ul>
        </nav>
      </div>
      <div className='content'>
        {
          !isSubRoute && (
            <div className='home-page'>
              <h1>Home</h1>
              <TokenMessage />
            </div>
          )
        }
        <Outlet />
      </div>
    </TokenContext.Provider>
  )
}

export default App
