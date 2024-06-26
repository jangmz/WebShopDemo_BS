import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Shop from "./components/shop.jsx"
import Cart from "./components/cart.jsx"
import Login from "./components/login.jsx"
import History from './components/history.jsx'
//import './index.css'
import "./styles/styles.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
