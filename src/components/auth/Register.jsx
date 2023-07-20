import React,{useState} from 'react'

import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Register() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    let navigate=useNavigate();
    const handleSignUp=async ()=>{
        try{await createUserWithEmailAndPassword(auth,email,password);
            updateProfile(auth.currentUser,{displayName:name})
            navigate('/')
        }catch(error){
            toast(error.code,{type:"error"});
            console.log(error);
        }
    }
  return (
    <div className="border p-3 bg-light" style={{marginTop:70}}>
        <h1>Register</h1>
        <div className="form-group">
            <label>Name</label>
            <input type="text" className='form-control' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type="email" className='form-control' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className='form-control' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleSignUp}>Register</button>
    </div>
  )
}

export default Register