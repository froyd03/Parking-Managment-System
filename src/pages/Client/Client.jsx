import '../Client/Client.css'
import VIP from '@mui/icons-material/StarBorderOutlined';
import Guest from '@mui/icons-material/HelpOutlineOutlined';
import Member from '@mui/icons-material/PersonOutlined';
import Record from '../../components/Record.jsx'

export default function Client(){
    return(
        <section>

            <div className="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="main-wrapper">
    
                <div className="main-content">
                    <h2>Client Type</h2>
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
                    <label for="clientTypeSort">Sort by Client Type:</label>
                    <select id="clientTypeSort" onchange="sortClientData()">
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
                                <tbody id="clientTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                    <div id="pagination-controls">
                        <button id="prevPageBtn" className="pagination-btn" onclick="changePage(-1)">Prev</button>
                        <span id="pageInfo">Page 1 of 1</span>
                        <button id="nextPageBtn" className="pagination-btn" onclick="changePage(1)">Next</button>
                    </div>
                </div>
            </div>
        </section>
    )
}