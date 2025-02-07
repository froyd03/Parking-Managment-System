import { useEffect, useRef, useState } from 'react';
import '../Slot/Slot.css'
import Pagination from '../../components/Pagination';
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';

export default function Slot(){
    const totalSlot = 50;
    const column = 10;
    const Row = totalSlot / column;;

    const tableRow = JSON.parse(localStorage.getItem("data")) || [];

    function occupied(i){  
        let isEqual;
        for(let j = 0; j < tableRow.length; j++){
            isEqual = false;
            if(getSlotIndex(j) == i){
                isEqual = true;
                break;
            }
        }
        return isEqual ? 'primary':'action';
    }

    let currentPage = 0;
    const [showForm, setShowForm] = useState(false);
    const [indexByPage, setIndex] = useState(0);

    function getClient(index){
        setIndex(maxPerPage*(currentPage-1) + index)
        setShowForm(true);
    }

    function getSlotIndex(i){
        return tableRow[i].Floor * 10 + tableRow[i].Slot;   
    }

    const slotOptRef = useRef();
    const floorOptRef = useRef();

    const maxPerPage = 5;
    const [front, setFront] = useState(-1);
    const [back, setBack] = useState(maxPerPage);

    function nextBtn(){
        if(back >= tableRow.length){
            return;
        }else{
            setFront(s => s + maxPerPage);
            setBack(b => b + maxPerPage);
        } 
    }
    
    function previousBtn(){
        if(front <= -1){
            return;
        }else{
            setFront(s => s - maxPerPage);
            setBack(b => b - maxPerPage);
        }
    }

    useEffect(() => {
        currentPage = Math.ceil(back / tableRow.length)
    }, [front])

    const limitShow = tableRow.filter((_, index) => {
        return front < index && back > index;
    })
    
    return(
        <section>
           <h3>Slot Management</h3>
           <hr/>
           <div className="container">
                <div className="occupancyTable">
                        <p>Parking Occupancy</p>
                        <hr className='line'/>
                        <div className="rows">
                            {Array.from({length: Row}, (_, rowIndex) => (
                                    <div key={rowIndex} className="eachRow" >
                                        <div>
                                            <p>Row {rowIndex+1}</p>
                                            <span className='carsIcon'>
                                                {Array.from({length: column}, (_, colIndex) => (
                                                    <DirectionsBusOutlinedIcon
                                                        color={occupied(rowIndex * column + colIndex)}
                                                        key={colIndex} 
                                                        className='icon'/>
                                                ))}
                                            </span>                  
                                        </div>
                                    </div>
                                ))}
                        </div>
                </div>
                <div className="slotDetails">
                    <p>Client Slot Details</p>
                    <hr className='line' />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>License Plate</th>
                                <th>Row</th>
                                <th>Slot</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {limitShow.map((value, index) => 
                            <tr key={index}>
                                <td>{value.ClientName}</td>
                                <td>{value.licensePlate}</td>
                                <td>Row {value.Floor + 1}</td>
                                <td>Slot {value.Slot + 1}</td>
                                <td>
                                    <button onClick={() => getClient(index)}>transfer</button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='pagination'>
                        <Pagination numberOfData={tableRow.length} // 6
                                    maxPerPage={maxPerPage}
                                    prevClick={previousBtn}
                                    nextClick={nextBtn}/>
                    </div>
                </div>
           </div>
           {showForm && <div id="modal">
                <div className="">
                    {tableRow[indexByPage].ClientName}
                    <label className="lblSlots" htmlFor="clientSlot">Parking floors
                      <select name="client" ref={floorOptRef} id="clientSlot">
                        <option value="0">1st Floor</option>
                        <option value="1">2nd Floor</option>
                        <option value="2">3rd Floor</option>
                        <option value="3">4th Floor</option>
                        <option value="4">5th Floor</option>
                      </select>
                    </label>
                    <label className="lblSlots" htmlFor="clientSlot">Available slots
                      <select name="client" onChange={getValue} ref={slotOptRef} id="clientSlot">
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
            </div>}
        </section>
    )
}