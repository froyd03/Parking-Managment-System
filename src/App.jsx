import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import LoginForm from './pages/Login/Login.jsx';

import Dashboard from "./pages/Dashboard/Dashboard.jsx";

export default function App(){

   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            
            <Route path='/' element={<Dashboard />} />
         </Routes>
      </BrowserRouter>
   )
}

