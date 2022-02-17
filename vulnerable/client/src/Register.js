import React,{useState} from "react";
import axios from "axios";
import "./index.css";
import {useNavigate} from "react-router-dom";

const Register = ()=>{
   const[details,setDetails] = useState({
       "email" : "",
       "password" : ""
   });

   let navigate = useNavigate();

   const update = (e)=>{
      const {name,value} = e.target;
      setDetails((prevValue)=>{
           return {...prevValue,[name]:value}
      });
   }

   const submit = async(e)=>{
       e.preventDefault();
       try{
         const resp = await axios.post("http://localhost:4000/register",details);
         console.log("response : ",resp);
         alert(resp.data.message);
         navigate("/login");
       }catch(err){
           console.log("error..");
           alert("something went wrong!");
       }
   }

   return(
     <>
      <div className="container">
        <div className="title">
            <p>Please Register</p>
            <div className="form">
                <div className="form-box">
                    <input type="text" placeholder="Enter your Email" value={details.email} name="email" onChange={update}/>
                </div>
                <div className="form-box">
                    <input type="password" placeholder="Enter your Password" value={details.password} name="password" onChange={update}/>
                </div>
                <button type="submit" onClick={submit}>Register</button>
            </div>
        </div>
    </div>
     </>
   );
}

export default Register;