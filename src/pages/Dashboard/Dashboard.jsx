import '../Dashboard/Dashboard.css'
import '../../styles/global.css'
import { useRef, useState, useEffect} from 'react';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Record from '../../components/Record.jsx'
import Pagination from '../../components/Pagination.jsx'

export default function Dashboard(){
    
    const [activeData, setActiveData] = useState(() => {
        return JSON.parse(localStorage.getItem("data")) || []
    });

    function setStoredData(arrayOfObj){
        const parsedData = JSON.parse(localStorage.getItem("allClientData")) || [];
        const storedData = [arrayOfObj, ...parsedData];
        localStorage.setItem("allClientData", JSON.stringify(storedData));
    }

    const [showForm, setShowForm] = useState(false);
    const [isShowDetails, setShowDetails] = useState(false);

    const [clickedIndex, setClickedIndex] = useState(0);
    function handleDetails(index){
        setShowDetails(d => !d); 
        setClickedIndex(index); //assign for  global variable
    }
 
    function toggleform(){
        setShowForm(f => !f);
        setErrorMassage("");
    }

    function dateNow(){
        const date = new Date();
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }
    
    function formatedDate(){
        const date = new Date();
        const HOUR = date.getHours() > 12 ? "0"+(date.getHours()-12): date.getHours();
        const MINS = date.getMinutes() < 10 ? "0"+(date.getMinutes()): date.getMinutes();
        const MERIDIEM = date.getHours() > 11 ? "PM":"AM";
        
        return `${HOUR}:${MINS} ${MERIDIEM}`;
    }

    const totalCharge= useRef();

    function calculateTimeConsumed() {
        function to24HourFormat(timeStr) {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
    
            if (modifier === 'PM' && hours !== 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            return { hours, minutes };
        }
    
        const { hours: inHours, minutes: inMinutes } = to24HourFormat(activeData[clickedIndex].timeIn);
        const { hours: outHours, minutes: outMinutes } = to24HourFormat(formatedDate());
    
        let inTime = new Date(1970, 0, 1, inHours, inMinutes);
        let outTime = new Date(1970, 0, 1, outHours, outMinutes);
    
        if (outTime < inTime) outTime.setDate(outTime.getDate() + 1); 
    
        const totalMinutes = (outTime - inTime) / (1000 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        totalCharge.current = amountToPay(hours, minutes);
        return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
    }
    
    function amountToPay(hours, minutes){
        const CAR_PER_HOUR = 15, MOTOR_PER_HOUR = 7;
        const CAR_PER_MIN = 5, MOTOR_PER_MIN = 2;
        const MINIMUM_MIN = 10, HALF_MIN = 30;
        
        let isCarType = activeData[clickedIndex].vehicleType === "Car";
        let perMinCharge = isCarType ? CAR_PER_MIN : MOTOR_PER_MIN;
        let perHourCharge = isCarType ? hours * CAR_PER_HOUR : hours * MOTOR_PER_HOUR;

        let totalCharge = 0;
        if (minutes >= MINIMUM_MIN) {
            totalCharge += perMinCharge; // Charge for MINIMUM_MIN
            if (minutes >= HALF_MIN) {
                totalCharge += perMinCharge; // Extra charge for HALF_MIN
            }
        }
        totalCharge += perHourCharge;
        return totalCharge;
    }

    const [errorMessage, setErrorMassage] = useState("");
    const nameInput = useRef();
    const plateInpt = useRef();
    const vehicleRbtn = useRef();
    const clientOpt = useRef();
    const floorOpt = useRef();
    const slotOpt = useRef();

    function addClient(){
        let isReject = false;

        if(nameInput.current.value && plateInpt.current.value){
            activeData.forEach(value => {
                if(value.licensePlate === plateInpt.current.value.toUpperCase()){
                    isReject = true;
                    plateInpt.current.classList.add("invalid");
                    nameInput.current.classList.remove("invalid");
                    setErrorMassage("Plate number already existed.")
                }
            }) 
            if(isReject) return;

            const newClient = {
                ClientName:  nameInput.current.value,
                licensePlate: plateInpt.current.value.toUpperCase(),
                vehicleType: vehicleRbtn.current.checked ? "Car" : "Motorcycle",
                clientType: clientOpt.current.value,
                timeIn: formatedDate(),
                Rate: vehicleRbtn.current.checked ? "₱15/hr" : "₱7/hr",
                Floor: Number(floorOpt.current.value),
                Slot: Number(slotOpt.current.value)
            }
            setActiveData(tr => [newClient, ...activeData]);   
            setStoredData(newClient);
            toggleform();
        }else{
            plateInpt.current.classList.add("invalid");
            nameInput.current.classList.add("invalid");
            setErrorMassage("Please ensure all filled out before submitted.")
            return;
        }
        
        setErrorMassage("");
        if(vehicleRbtn.current.checked){
            setFourWheel(fh => fh + 1);
        }else{
            setTwoWheel(th => th + 1);
        }   
    }

    function removeClient(){
        const filtered = activeData.filter(value => {
            return value.licensePlate !== activeData[clickedIndex].licensePlate;
        })
        setActiveData(t => [...filtered]);
        setShowDetails(d => !d);

        if(activeData[clickedIndex].vehicleType === "Car"){
            setFourWheel(fh => fh - 1);
        }else{
            setTwoWheel(th => th - 1);
        }
    }

    const [fourWheelStatus, setFourWheel] = useState(() => {
        let count = 0;
        activeData.forEach(value => {
            if(value.vehicleType === "Car") count++;
        })
        return count;
    });

    const [twoWheelStatus, setTwoWheel] = useState(() => {
        let count = 0;
        activeData.forEach(value => {
            if(value.vehicleType === "Motorcycle") count++;
        })
        return count;
    });

    const [availSlot, setAvailSlot] = useState(0);
    const [activeClient, setActive] = useState(0);

    useEffect(()=> {
        localStorage.setItem("data", JSON.stringify(activeData));
        setAvailSlot(50-(fourWheelStatus + twoWheelStatus))
        setActive(fourWheelStatus + twoWheelStatus)
    }, [activeData])
    
    function nextBtn(){
        console.log("sample 1")
    }

    function prevBtn(){
        console.log("sample 2")
    }

    return(
        <section>
            <div className="header">
                <h3>Dashboard</h3>
            </div>
            <hr />
            <div className="live">
                <div className="live-record">
                    <Record icon={<LocalParkingIcon 
                                    color='primary'
                                    sx={{fontSize: 35}} 
                                    className='icon'/>} 
                        title="Total Parking Slots" 
                        number={50}/>
                    <Record icon={<DirectionsCarFilledIcon color='primary' sx={{fontSize: 40}} className='icon'/>} 
                        title="4 Wheeler Slot Status" 
                        number={fourWheelStatus}
                        total="/25"/> 
                    <Record icon={<TwoWheelerOutlinedIcon color='primary' sx={{fontSize: 40}} className='icon'/>} 
                        title="2 Wheeler Slot Status" 
                        number={twoWheelStatus}
                        total="/25"/>
                    <Record icon={<CheckCircleOutlinedIcon color='primary' sx={{fontSize: 40}} className='icon'/>} 
                        title="Available Slot" 
                        number={availSlot}/>
                    <Record icon={ <RecentActorsOutlinedIcon color='primary' sx={{fontSize: 40}} className='icon'/>} 
                        title="Active clients" 
                        number={activeClient}/>
                    <Record icon={<EditCalendarIcon color='primary' sx={{fontSize: 40}} className='icon'/>} 
                        title="Total Reservation" 
                        number={0}/>
                </div> 
            </div>
            <div className="meter">
                <div className="search">
                    <p>Parking Meter</p>
                    <div className="search-bar">    
                        <SearchIcon color='action' sx={{fontSize: 22}}/>     
                        <input placeholder="Plate #" type="text"/>
                    </div>
                </div>
                <div className="add">
                    <button onClick={toggleform} id="addVehicle">check-in</button>
                </div>
                <table className='tableData'>
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>License Plate</th>
                            <th>Vehicle Type</th>
                            <th>Time-in</th>
                            <th>Rate</th>
                            <th>Actions</th>
                        </tr>        
                        {activeData.map((value, index) => 
                            <tr key={index}>
                                <td>{value.ClientName}</td>
                                <td>{value.licensePlate}</td>
                                <td>{value.vehicleType}</td>
                                <td>{value.timeIn}</td>
                                <td>{value.Rate}</td>
                                <td><button 
                                        className='btnView' 
                                        onClick={() => handleDetails(index)}>
                                    view
                                    </button></td>
                            </tr>)}     
                    </thead>
                </table>
                <Pagination numberOfData={activeData.length} prevClick={prevBtn} nextClick={nextBtn}/>  
            </div>
            {showForm && <div id="modal">
              <form action="">
                <h4>Vehicle Registration</h4>
                <div className="inputs">
                  <label className="lblTxt">Name</label>
                  <input className="formInp" ref={nameInput} required type="text" placeholder="John Dela Cruz,."/>
                  <label className="lblTxt">Plate Number</label>
                  <input className="formInp" ref={plateInpt} required type="text" placeholder="NBC 1234 "/>
                  
                  <div className="rbtn">
                  <span>Vehicle type:</span>
                    <div className="rbtn-car">
                      <input defaultChecked ref={vehicleRbtn} type="radio" className="radio-btn" value="Car" name="rbtn" id="Car"/>
                      <label htmlFor="Car">Car</label>
                    </div>
                    <div className="rbtn-motor">
                      <input type="radio" className="radio-btn" value="Motor" name="rbtn" id="Motor"/>
                      <label htmlFor="Motor">Motorcycle</label>
                    </div>
                  </div>
                  <div id="clientContainer">
                    <label className="lblClient" htmlFor="clientSelect">Client type
                      <select name="client" ref={clientOpt} id="clientSelect">
                        <option value="VIP">VIP</option>
                        <option value="Member">Member</option>
                        <option value="Guest">Guest</option>
                      </select>
                    </label>
                    <label className="lblSlots" htmlFor="clientSlot">Parking floors
                      <select name="client" ref={floorOpt} id="clientSlot">
                        <option value="0">1st Floor</option>
                        <option value="1">2nd Floor</option>
                        <option value="2">3rd Floor</option>
                        <option value="3">4th Floor</option>
                        <option value="4">5th Floor</option>
                      </select>
                    </label>
                    <label className="lblSlots" htmlFor="clientSlot">Available slots
                      <select name="client" ref={slotOpt} id="clientSlot">
                        <option value="0">Slot 1</option>
                        <option value="1">Slot 2</option>
                        <option value="2">Slot 3</option>
                        <option value="3">Slot 4</option>
                        <option value="4">Slot 5</option>
                        <option value="5">Slot 6</option>
                        <option value="6">Slot 7</option>
                        <option value="7">Slot 8</option>
                        <option value="8">Slot 9</option>
                        <option value="9">Slot 10</option>
                      </select>
                    </label>
                  </div>
                  <label className='textError'>
                        {errorMessage}
                  </label>
                </div>
                <div className="btn-info">
                  <button onClick={toggleform} id="btnClose" value="close">Close</button>
                  <button onClick={addClient} id="btnStart" value="Start">Start</button>
                </div>
              </form>
            </div> }
            {isShowDetails && <div id='modal'>
                <div className="details">
                    <h4>Client Details</h4>
                    <p><b>Name:</b> {activeData[clickedIndex].ClientName}</p>
                    <p><b>License:</b> {activeData[clickedIndex].licensePlate}</p>
                    <p><b>Time-in:</b> {activeData[clickedIndex].timeIn} | {dateNow()}</p>
                    <p><b>Vehicle Type:</b> {activeData[clickedIndex].vehicleType} | {activeData[clickedIndex].Rate}</p>
                    <p><b>Time Consumed:</b> {calculateTimeConsumed()}</p>
                    <p><b>Amount Payable:</b> ₱{totalCharge.current}</p>
                    <div>
                        <button className='close' onClick={() => setShowDetails(d => !d)}>close</button>
                        <button className='btn-out' onClick={removeClient}>out</button>
                    </div>  
                </div>
            </div>}
        </section>
    )
}                                                                                       