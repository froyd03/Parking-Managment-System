import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Client from './pages/Client/Client.jsx'

export default function App(){

   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/client' element={<Client />} />
         </Routes>
      </BrowserRouter>
   )
}

