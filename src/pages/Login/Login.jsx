import { useState } from 'react'
import '../Login/Login.css'
import { Link } from "react-router-dom";


export default function LoginForm(){

    const [userInput, setUserInput] = useState();
    const [userPass, setUserPass] = useState();
    
    function HandleUserInput(e){
        setUserInput(e.target.value)
    }

    function HandleUserPass(e){
        setUserPass(e.target.value)
    }

    function getLoginData(){
        fetch('user.json')
            .then(response => {
                if(!response.ok) throw new Error("can't fetch data");
                return response.json()       
            }).then(value => {
                if(userInput === value.username && userPass === value.password){    
                    
                }else{
                    console.log("wrong username and password")
                }
            })
            
    }

    return(
        <div className="main-container">
            <div className="container">
            <div className="user-login">
                <img src="profile-user.png" className="user-img" alt="unavailable"/>
                <input type="text" className="input" onChange={HandleUserInput} placeholder="Username"/>

                <div className="pass-container">
                    <input type="password" className="pass" onChange={HandleUserPass} placeholder="Password"/>
                </div>
                <p id="textIndicator"></p>
                <input type="button" onClick={getLoginData} className="btn" value="Login"/>
               
                <Link to='/dashboard'>
                    Login
                </Link>
            

                <div className="link">
                    <button >Create account</button>|
                    <button>Forgot Password</button>
                </div>
                <div className="createAcc">
                        <div className="h3"><h3>Create Account</h3></div>
                       
                        <div className="fullName">
                            <input type="text" className="inp" minLength="3" id="Fname" placeholder="First Name"/>
                            <input type="text" className="inp" minLength="3" id="Lname" placeholder="Last Name"/>
                        </div>

                        <input type="email" className="inp" minLength="8" id="username" placeholder="Mobile Number or Email"/>
                        <input type="password" className="inp" minLength="8" id="password" placeholder="New Password"/>
                        <div className="rbtn">
                            <div className="box">
                                <label htmlFor="Fradio">admin</label>
                                <input type="radio" name="gender" id="Fradio"/> 
                            </div>
                            <div className="box">
                                <label htmlFor="Cradio">attendant</label>
                                <input type="radio" name="gender" id="Cradio"/>                 
                            </div>   
                                           
                        </div>
                        <p id="label">complete all requirements!</p> 
                        <div className="btnContainer">
                            <button className="btnSign">Sign up</button>
                            <button className="btnLogin">Log in</button>
                        </div>
                    </div>
            </div>
            <div className="admin-login">
                <img src="park-img.jpg"  className="park-img" alt="failed to load"/>
            </div>
        </div>
    </div>)
}