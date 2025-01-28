import '../Client/Client.css'
import VIP from '@mui/icons-material/StarBorderOutlined';
import Guest from '@mui/icons-material/HelpOutlineOutlined';
import Member from '@mui/icons-material/PersonOutlined';
import Record from '../../components/Record.jsx'
import { useEffect, useRef, useState } from 'react';


export default function Client(){

    const tableRow = JSON.parse(localStorage.getItem("data")) || [];
    const [sort, setSort] = useState(tableRow);


    function handleSort(e){
        if(e.target.value === "all"){
            setSort([...tableRow])
        }else if(e.target.value === "VIP"){
            const sortVIP = tableRow.filter(value => {
                return value.clientType === "VIP"
            })
            setSort([...sortVIP])

        }else if(e.target.value === "guest"){
            const sortGuest = tableRow.filter(value => {
                return value.clientType === "Guest"
            })

            setSort([...sortGuest])
        }else if(e.target.value === "member"){
            const sortMember = tableRow.filter(value => {
                return value.clientType === "Member"
            })
            setSort([...sortMember])
        }
    }
    
    return(
        <section>

            <div className="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="main-wrapper">
    
                <div className="main-content">
                    <h3>Client Type</h3>
                    <hr />
                        <div className="dashboard-grid">
                            <div className="dashboard-item">
                                <div className="dashboard-icon">
                                    <VIP sx={{fontSize: 45}}/>
                                </div>
                                <div className="dashboard-details">
                                    <h3><a href="#records">Vip</a></h3>
                                    <p id="totalVipCount">0</p>
                                </div>
                            </div>
                            
                            <div className="dashboard-item">
                                <div className="dashboard-icon">
                                   <Member sx={{fontSize: 45}}> </Member>
                                </div>
                                <div className="dashboard-details">
                                    <h3><a href="">Members</a></h3>
                                    <p id="totalMemberCount">0</p>
                                </div>
                            </div>  
                        
                            <div className="dashboard-item">
                                <div className="dashboard-icon">
                                    <Guest sx={{fontSize: 45}}></Guest>
                                </div>
                                <div className="dashboard-details">
                                    <h3><a href="">Guest</a></h3>
                                    <p id="totalGuestsCount">0</p>
                                </div>
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
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="clientTableBody">
                                    {sort.map((value, index) => 
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{value.ClientName}</td>
                                            <td>{value.licensePlate}</td>
                                            <td>{value.clientType}</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="pagination-controls">
                        <button id="prevPageBtn" className="pagination-btn" >Prev</button>
                        <span id="pageInfo">Page 1 of 1</span>
                        <button id="nextPageBtn" className="pagination-btn" >Next</button>
                    </div>
                </div>
            </div>
        </section>
    )
}