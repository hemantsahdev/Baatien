import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../pages/download.jpg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../util/APIRoute';
function Register() {
    const navigate=useNavigate();
    const[values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
    });

    const toastoptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    };
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
          navigate("/");
        }
      },[]);
      
    // const PostData=async()=>{
        
    // }

    const handleSubmit=async (event)=>{
        event.preventDefault();
        // alert("form");
        if(handleValidation()){
            console.log("in validation",registerRoute);
            const{username,password,email}=values;
            const {data}= await axios.post(registerRoute,{
                username,
                email,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastoptions);
            }
            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/");
            }
            
        }
    };

    const handleValidation=()=>{
        const{password,confirmpassword,username,email}=values;
        if(password!==confirmpassword){
            toast.error("password and confirm password should be same.",toastoptions);
            return false;
        }else if(username.length<3){
            toast.error("Username should be greater than 3 character.",toastoptions);
            return false;
        }else if(password.length<8){
            toast.error("Password should be greater than or equal to 8 characters",toastoptions);
            return false;

        }else if(email===""){
            toast.error("Email is required ",toastoptions);
            return false;
        }
        return true;
        
       
    };
    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    };
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className='brand'>
                <img src={Logo} alt="Logo" />
                <h1>CareBridge</h1>
            </div>
            <input type ="text" 
            placeholder="Username" 
            name="username" 
            onChange={(e)=>handleChange(e)} />
            <input type ="email" 
            placeholder="Email" 
            name="email" 
            onChange={(e)=>handleChange(e)} />
            <input type ="password" 
            placeholder="Password" 
            name="password" 
            onChange={(e)=>handleChange(e)} />
            <input type ="password" 
            placeholder="Confirm Password" 
            name="confirmpassword" 
            onChange={(e)=>handleChange(e)} />
            <button type='submit'>Create User</button>
            <span> already have an account ?<Link to="/login">Login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}

const FormContainer =styled.div`
    height: 100vh;
    widht:100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap:1rem;
    align-items:center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items:center;
        gap:1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        background-color:#00000076;
        display:flex;
        flex-direction:column;
        gap:2rem;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            fot-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transistion:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
    }
`;

export default Register;
