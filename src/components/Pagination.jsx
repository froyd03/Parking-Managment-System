import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useRef, useState } from 'react';

export default function Pagination(props){

    const limitPage = 4;
    const pageNumber = Math.ceil(props.numberOfData / props.maxPerPage);
    const totalPage = pageNumber > limitPage ? limitPage : pageNumber;

    let activeRef = useRef([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        activeRef.current.forEach((element, i) => {
            activeRef.current[index].classList.add('pageActive');
            if(i !== index && element.classList.contains('pageActive')){
                element.classList.remove('pageActive');
            }
        });
    }, [index])

    useEffect(() => {
        activeRef.current = activeRef.current.filter(value => {
            return value !== null;
        });
        setIndex(i => i = 0);
        setCount(c => c = 0);
    }, [pageNumber])

    const [adjustCount, setCount] = useState(0);

    function handleNextBtn(){
        props.nextClick();

        if(index < totalPage-1){
            setIndex(i => i + 1);
        }else if(pageNumber > limitPage && index == (limitPage-1) && pageNumber !== (adjustCount+limitPage)){
            setCount(c => c + 1);
        }else return;
    }

    function handlePrevBtn(){
        const rear = adjustCount+limitPage;
        const current = (index+1)+adjustCount;
        const front = rear-3;

        props.prevClick();
        if(index > 0){
            setIndex(i => i - 1);
        }else if(front === current && current !== 1){
            setCount(c => c - 1);
        }else return;
    }

    return (
        <div id="pagination-controls"> 
        <ArrowBackIosNewIcon onClick={handlePrevBtn} color='primary' sx={{fontSize:15}}/>
         <button onClick={handlePrevBtn} id="prevPageBtn" className="pagination-btn" >previous</button>
            {Array.from({length: totalPage || 1}, (_, index) => (
                <span 
                    key={index} 
                    className='pageInfo' 
                    ref={(el) => (activeRef.current[index] = el)}>
                    {(index+1)+adjustCount}
                </span>
            ))}
            <button onClick={handleNextBtn} id="nextPageBtn" className="pagination-btn" >Next</button>
            <ArrowForwardIosIcon onClick={handleNextBtn} color='primary' sx={{fontSize:15}}/>
        </div>
    )
}