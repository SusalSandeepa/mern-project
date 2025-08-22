import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard.jsx'
import AdminPage from './pages/adminPage.jsx'
import HomePage from './pages/homePage.jsx'
import TestPage from './pages/test.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-[100vh]">
        <Routes path="/">
          <Route path="/*" element={<HomePage/>} />
          <Route path="/register" element={<h1>Register Here</h1>} />
          <Route path="/admin/*" element={<AdminPage/>} /> 
          <Route path="/test" element={<TestPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
// <BrowserRouter> use to enable routing in the web application
// /admin/* is used to match any route that starts with /admin, allowing for rest of the admin routes to be defined in the AdminPage component.
export default App
