import '../Client/Client.css'
import '../../styles/global.css'
import VIP from '@mui/icons-material/StarBorderOutlined';
import Guest from '@mui/icons-material/HelpOutlineOutlined';
import Member from '@mui/icons-material/PersonOutlined';
import Record from '../../components/Record.jsx'
import Pagination from '../../components/Pagination.jsx'
import { useEffect, useState } from 'react';

export default function Client(){

    const tableRow = JSON.parse(localStorage.getItem("allClientData")) || [];
    const [sort, setSort] = useState(tableRow);
    const [numOfData, setNumData] = useState(sort.length);
    
    function handleSort(e){    
        const sorted = tableRow.filter(value => value.clientType === e.target.value);
        setSort(s => s = sorted.length != 0 ? sorted : tableRow);
    }

    function getClientTypeCount(ClientType){
        return tableRow.filter(element => element.clientType === ClientType).length;
    }

    const MAX_PER_PAGE = 10;
    const [front, setFront] = useState(-1);
    const [back, setBack] = useState(MAX_PER_PAGE)

    function nextBtn(){
        if(back >= sort.length){
            return;
        }else{
            setFront(s => s + MAX_PER_PAGE);
            setBack(b => b + MAX_PER_PAGE);
        } 
    }
    
    function previousBtn(){
        if(front <= -1){
            return;
        }else{
            setFront(s => s - MAX_PER_PAGE);
            setBack(b => b - MAX_PER_PAGE);
        }
    }

    const limitShow = sort.filter((_, index) => {
        return front < index && back > index;
    })

    useEffect(() => {
        setNumData(sort.length);
        setFront(-1);
        setBack(MAX_PER_PAGE);
    }, [sort])
    
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
                                number={getClientTypeCount("VIP")}/> 
                             <Record icon={<Member color='primary' sx={{fontSize: 40}} className='icon'/>} 
                                title="Member" 
                                number={getClientTypeCount("Member")}/> 
                             <Record icon={<Guest color='primary' sx={{fontSize: 40}} className='icon'/>} 
                                title="Guest" 
                                number={getClientTypeCount("Guest")}/> 
                        </div>
                    </div>
                    <label htmlFor="clientTypeSort">Sort by Client Type:</label>
                        <select onChange={handleSort} id="clientTypeSort" >
                            <option value="all">All</option>
                            <option value="Member">Members</option>
                            <option value="VIP">VIP Members</option>
                            <option value="Guest">Guests</option>
                        </select>
                    <div className="records-section">
                        <p>Client History Overview </p>
                        <hr className='line'/>
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
                        <Pagination numberOfData={numOfData} 
                                    maxPerPage={MAX_PER_PAGE}
                                    prevClick={previousBtn} 
                                    nextClick={nextBtn}/>
                    </div>
                </div>
            </div>
        </section>
    )
}