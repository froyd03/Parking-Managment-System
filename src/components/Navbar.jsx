import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import '../components/Nav.css'

export default function Navbar(){

    const navigationBtn = [
        {
            btnName:'Dashboard', 
            path: '/',
            btnIcon: <DashboardIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Slots', 
            path: '/slot',
            btnIcon:  <GarageOutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Client', 
            path: '/client',
            btnIcon: <PaidIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Transaction', 
            path: '/',
            btnIcon: <PeopleAltIcon sx={{fontSize: 25}}/>
        }
    ];

    const activePageRef = useRef([]);
    const [clickedIndex, setClickedIndex] = useState(0);

    useEffect(() => {
        activePageRef.current[clickedIndex].classList.add('active');
    }, [clickedIndex])

    
    function handleActiveBtn(index){
        activePageRef.current.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        })
        setClickedIndex(index);
    }

    return(<>
        <nav className="nav-container">
        <h1 id="name">ParkEase</h1>
        <hr/>
        {navigationBtn.map((item, index) => 
            <Link key={index} to={item.path} onClick={() => handleActiveBtn(index)}>
                <div className='navBtn' 
                    ref={(el) => activePageRef.current[index] = el}>
                    {item.btnIcon}
                    <span>{item.btnName}</span>
                </div>
            </Link>
        )}
      </nav>
      </>
    )
}