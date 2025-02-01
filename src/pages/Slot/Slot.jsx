import { useRef } from 'react';
import '../Slot/Slot.css'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';

export default function Slot(){
    const totalSlot = 50;
    const column = 10;
    const Row = totalSlot / column;;

    const index = [1, 10, 39];
    const iconRef = useRef([]);

    function occupied(i){  
        let isEqual;   
        for(let j = 0; j < index.length; j++){
            isEqual = true;
            if(index[j] != i) isEqual = false;
            else break;
        }
        return isEqual ? 'primary':'action';
    }
    
    return(
        <section>
           <h3>Slot</h3>
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