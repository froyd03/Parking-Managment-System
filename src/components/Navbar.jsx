import { Link } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import '../components/Nav.css'

export default function Navbar(){

    const [active, setActive] = useState(["navBtn active", "navBtn", "navBtn", "navBtn"]);
    const [pageName, setPageName] = useState("Dashboard");
    
        //active.current.classList.add("active")
    function setDashboardClass(){
        setActive(a => ["navBtn active", "navBtn", "navBtn", "navBtn"])
        setPageName("Dashboard");
    }

    function setSlotClass(){
        setActive(a => ["navBtn", "navBtn active", "navBtn", "navBtn"])
        setPageName("Available Slot")
    }

    function setClientClass(){
        setActive(a => ["navBtn", "navBtn", "navBtn active", "navBtn"])
        setPageName("Client Type")
    }

    function setTransactionClass(){
        setActive(a => ["navBtn", "navBtn", "navBtn", "navBtn active"])
        setPageName("Transaction History")
    }

    function activeIcon(number){
        return active[number] ==="navBtn active"?"action":"";
    }

    return(<>
       
        <nav className="nav-container">
        <h1 id="name">ParkEase</h1>
        <hr/>
        <Link to='/'>
            <div className={active[0]} onClick={setDashboardClass}>
                <DashboardIcon color={activeIcon(0)} sx={{fontSize: 25}}/>
                <span>Dashboard</span>
            </div>
        </Link>
        <Link to=''>
            <div className={active[1]} onClick={setSlotClass}>
                <GarageOutlinedIcon color={activeIcon(1)} sx={{fontSize: 25}}/>
                <span>Slots</span>
            </div>
        </Link>
        <Link to='/client'>
            <div className={active[2]} onClick={setClientClass}>
                <PeopleAltIcon color={activeIcon(2)} sx={{ fontSize: 25 }}/>
                <span>Client</span>
            </div>
        </Link>
        <Link to=''>
            <div className={active[3]} onClick={setTransactionClass}>
                <PaidIcon color={activeIcon(3)} sx={{ fontSize: 25 }}/>
                <span>Transaction</span>
            </div>
        </Link>
      </nav>
      </>
    )
}