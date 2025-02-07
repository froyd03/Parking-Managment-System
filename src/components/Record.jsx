import '../pages/Dashboard/Dashboard.css'

export default function Record(props){
    return (
        <div className="live-item">
            {props.icon}
            <div className="text">
                <h5 >{props.title}</h5>
                <h2 >{props.number} {props.total}</h2>
            </div>
            
        </div>
    )
}