import '../Client/Client.css'
import '../../styles/global.css'
import VIP from '@mui/icons-material/StarBorderOutlined';
import Guest from '@mui/icons-material/HelpOutlineOutlined';
import Member from '@mui/icons-material/PersonOutlined';
import Record from '../../components/Record.jsx'
import Pagination from '../../components/Pagination.jsx'
import { useState } from 'react';

export default function Client(){

    const tableRow = JSON.parse(localStorage.getItem("allClientData")) || [];
    const [sort, setSort] = useState(tableRow);

    function handleSort(e){
        let sortedClient = tableRow;
        if(e.target.value === "all"){
            setSort([...sortedClient])
        }else if(e.target.value === "VIP"){
            sortedClient = tableRow.filter(value => {
                return value.clientType === "VIP"
            })
        }else if(e.target.value === "guest"){
            sortedClient = tableRow.filter(value => {
                return value.clientType === "Guest"
            })
        }else if(e.target.value === "member"){
            sortedClient = tableRow.filter(value => {
                return value.clientType === "Member"
            })
        }
        setSort([...sortedClient])
    }

    const [vipCount, setVipCount] = useState(() => {
        let count = 0;
        tableRow.forEach(element => {
            if(element.clientType === "VIP") count++;
        });
        return count;
    });
    const [memberCount, setMemberCount] = useState(() => {
        let count = 0;
        tableRow.forEach(element => {
            if(element.clientType === "Member") count++;
        });
        return count;
    });
    const [guestCount, setGuestCount] = useState(() => {
        let count = 0;
        tableRow.forEach(element => {
            if(element.clientType === "Guest") count++;
        });
        return count;
    });

    const [front, setFront] = useState(-1);
    const [back, setBack] = useState(10)

    function nextBtn(){
        if(back > sort.length){
            console.log("next button triggered")
            return;
        }else{
            setFront(s => s + 10);
            setBack(b => b + 10);
        }    
    }
    function previousBtn(){
        if(front <= -1){
            console.log("previous button triggered")
            return;
        }else{
            setFront(s => s - 10);
            setBack(b => b - 10);
        }
    }

    const limitShow = sort.filter((_, index) => {
        return front < index && back > index;
    })

    return(
        <section>
            <div className="main-wrapper"> 
                <div className="main-content">
                    <h3>Client Type</h3>
                    <hr />
                    <div className="live">
                        <div className="live-record">
                            <Record icon={<VIP color='primary' sx={{fontSize: 40}} className='icon'/>} 
                                title="VIP" 
                                number={vipCount}/> 
                             <Record icon={<Member color='primary' sx={{fontSize: 40}} className='icon'/>} 
                                title="Member" 
                                number={memberCount}/> 
                             <Record icon={<Guest color='primary' sx={{fontSize: 40}} className='icon'/>} 
                                title="Guest" 
                                number={guestCount}/> 
                        </div>
                    </div>
                    <label htmlFor="clientTypeSort">Sort by Client Type:</label>
                        <select onChange={handleSort} id="clientTypeSort" >
                            <option value="all">All</option>
                            <option value="member">Members</option>
                            <option value="VIP">VIP Members</option>
                            <option value="guest">Guests</option>
                        </select>
                    <div className="records-section">
                        <div className = "table-responsive">
                            <table id="completed-parking-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Client Name</th>
                                        <th>License Plate</th>
                                        <th>Client Type</th>
                                    </tr>
                                </thead>
                                <tbody id="clientTableBody">
                                    {limitShow.map((value, index) => 
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{value.ClientName}</td>
                                            <td>{value.licensePlate}</td>
                                            <td>{value.clientType}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination prevClick={previousBtn} nextClick={nextBtn}/>
                    </div>
                </div>
            </div>
        </section>
    )
}