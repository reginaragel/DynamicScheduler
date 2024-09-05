import React,{useState,useContext} from "react";
import Header from "./Header";
import { assets } from "./assets/image";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
const AdminSignLog=()=>{

    const [signup,setSetSignup]=useState('Signup');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [userName,setUserName]=useState('');
    const [redirect,setRedirect]=useState(false)
    const {setUserInfo}=useContext(UserContext);
    const {setToken}=useContext(UserContext);

    const handleLogin= async(e)=>{
        e.preventDefault();

        if(!email || !password){
            alert('Please provide user credentials')
        }
        try{
            const response=await fetch('http://localhost:5000/loginadmin',{
                method:'POST',
                body:JSON.stringify({email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',

            })
            if(!response.ok){
                throw new Error('Network response was not ok')
            }else if(response.ok){
                response.json()
                .then(userInfo=>{
                    setUserInfo(userInfo);
                    setToken(userInfo.token);
                    setRedirect(true)
                })
            }
            console.log('Login Successful')
        }catch(err){
            console.error('Error while Logging In',err);
            alert('Login Failed')
        }
    }
    const handleSignup=async(e)=>{
        e.preventDefault();
        if(!userName || !email || !password){
            alert('Please Provide User Details to Signup')
        }
        try{
            const response=await fetch('http://localhost:5000/signupadmin',{
                method:'POST',
                body:JSON.stringify({userName,email,password}),
                headers:{'Content-Type':'application/json'},
            });
            if(response.ok){
                alert('User Registered Successfully!!!!')
            }else{
                throw new Error('Network response was not ok')
            }
        }catch(err){
            console.error('Error While Signing Up',err);
            alert('Registration Failed');
        }
    }
    if(redirect){
        return <Navigate to='/adminportal'/>
    }

    return(
        <div>
            <Header/>
            <div className="employee">
                <form onSubmit={signup==='Signup'? handleSignup:handleLogin}>
                    <div className="box">
                        <div className="title">
                            <span>Admin{signup}</span>
                        </div>
                        <div className="input-field">
                           {signup==="Signup" &&( <input type="text" placeholder="UserName"
                           value={userName} onChange={(e)=>setUserName(e.target.value)} required/>)}
                            <input type="email" placeholder="Email" 
                            value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            <input type="password" placeholder="Password"
                            value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                            <button type="submit">
                                {signup === 'Signup' ? 'Sign Up' : 'Login'}
                            </button>
                            <span>
                                {signup === 'Signup' ? (
                                    <>
                                        Already have an account?{' '}
                                        <a href="#login" onClick={() => setSetSignup('Login')}>
                                            Login
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        New User?{' '}
                                        <a href="#signup" onClick={() => setSetSignup('Signup')}>
                                            Signup
                                        </a>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </form>
                <div className="avatar">
                    <img src={assets.logo_icon} alt="avatar"/>
                </div>
            </div>

        </div>
    )
}
export default AdminSignLog