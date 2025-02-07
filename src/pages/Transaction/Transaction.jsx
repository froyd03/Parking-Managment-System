import '../Transaction/Transaction.css'
import '../../styles/global.css'
import CardChip from '../../assets/icons8-chip-card-32.png';


export default function Transaction(){
    return (
        <section>
           <div className="header">
                <h3>Transaction History</h3>
            </div>
            <hr />
            <div className='credit-card'>
                <div className="earnings">
                    <div>
                        <p>Total Earings</p>
                        <h3>₱ 0.00</h3>
                    </div>
                    <span>
                        <img src={CardChip} alt="" />             
                    </span>
                 </div>
                 <div className="card-info">
                    <div>
                        <p>CARD HOLDER</p>
                        <p><b>Admin</b></p>
                    </div>
                    <div>
                        <p className='secondary'>VALID THRU </p>
                        <p><b>12/22</b></p>
                    </div>
                 </div>

                <div className="card-footer">
                    <h2>4321 **** **** 1234</h2>
                    <div className="circle-container">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}