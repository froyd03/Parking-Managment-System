import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useRef, useState } from 'react';

export default function Pagination(props){

    let pageNumber = Math.ceil(props.numberOfData / 10);

    const activeRef = useRef([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        activeRef.current.forEach((element, i) => {
            activeRef.current[index].classList.add('pageActive');

            if(i !== index && element.classList.contains('pageActive')){
                element.classList.remove('pageActive');
            }
        });
        
    }, [index])

    function handleNextBtn(){
        props.nextClick();

        if(index < pageNumber-1) setIndex(i => i + 1) 
        else return; 
    }

    function handlePrevBtn(){
        props.prevClick();
        if(index > 0) setIndex(i => i - 1);
        else return; 
    }

    return (
        <div id="pagination-controls">
            <ArrowBackIosNewIcon onClick={handlePrevBtn} color='primary' sx={{fontSize:15}}/>
            <button onClick={handlePrevBtn} id="prevPageBtn" className="pagination-btn" >Previous</button>

            {Array.from({ length: pageNumber || 1}, (_, index) => (
                <span ref={(el) => activeRef.current[index] = el} key={index} className="pageInfo">{index + 1}</span>
            ))}

            <button onClick={handleNextBtn} id="nextPageBtn" className="pagination-btn" >Next</button>
            <ArrowForwardIosIcon onClick={handleNextBtn} color='primary' sx={{fontSize:15}}/>
        </div>
    )
}