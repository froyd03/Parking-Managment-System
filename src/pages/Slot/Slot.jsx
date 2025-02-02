import { useRef, useState } from 'react';
import '../Slot/Slot.css'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';

export default function Slot(){
    const totalSlot = 50;
    const column = 10;
    const Row = totalSlot / column;;

    const tableRow = JSON.parse(localStorage.getItem("data")) || [];
    const iconRef = useRef([]);

    function occupied(i){  
        let isEqual;   
        for(let j = 0; j < tableRow.length; j++){
            isEqual = false;
            if(tableRow[j].slotLocation == i){
                isEqual = true;
                break;
            }
        }
        return isEqual ? 'primary':'action';
    }

    console.log(iconRef)
    
    return(
        <section>
           <h3>Slot Management</h3>
           <hr />
           <div className="occupancyTable">
                <p>Parking Occupancy</p>
                <hr />
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
                                                className='icon'
                                                ref={(el) => iconRef.current[rowIndex * column + colIndex] = el}/>
                                        ))}
                                    </span>                  
                                </div>
                            </div>
                        ))}
                </div>
                

           </div>
        </section>
    )
}