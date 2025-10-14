import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage.jsx'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import TestPage from './pages/test.jsx'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-[100vh]">
        <Toaster position="top-right"/> 
        <Routes path="/">
          <Route path="/*" element={<HomePage/>} />
          <Route path="/register" element={<h1>Register Here</h1>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/admin/*" element={<AdminPage/>} /> 
          <Route path="/test" element={<TestPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
// <BrowserRouter> use to enable routing in the web application
// /admin/* is used to match any route that starts with /admin, allowing for rest of the admin routes to be defined in the AdminPage component.
// Toaster is used to show the toast notification on the screen and <Toaster position="top-right"/> is used to set the position of the toast notification on the screen
export default App
