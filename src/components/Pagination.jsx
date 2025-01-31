import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Pagination(props){

    function handleNextBtn(){
        props.nextClick;
        console.log("additional fucntion");
    }

    return (
        <div id="pagination-controls">
            <ArrowBackIosNewIcon onClick={props.prevClick} color='primary' sx={{fontSize:15}}/>
            <button onClick={props.prevClick} id="prevPageBtn" className="pagination-btn" >Previous</button>
            <span className="pageInfo pageActive">1</span>
            <span className="pageInfo">2</span>
            <span className="pageInfo">3</span>
            <button onClick={props.nextClick} id="nextPageBtn" className="pagination-btn" >Next</button>
            <ArrowForwardIosIcon onClick={handleNextBtn} color='primary' sx={{fontSize:15}}/>
        </div>
    )
}