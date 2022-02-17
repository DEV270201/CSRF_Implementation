import React,{useState,useEffect} from 'react';
import "./index.css";
import axios from 'axios';

const Profile = () => {
    const[mail,setMail] = useState("");
    const[data,setData] = useState();

    useEffect(()=>{
       try{
        async function getData(){
          const resp = await axios.get("http://localhost:4000/profile",{
              //should not reveal the token. Just for demonstration purpose
              headers : {
                  Authorization : "Bearer" + " " + "eyJhbGciOiJIUzI1NiJ9.NjIwZGM0M2VkNDQzOTI3Mzc2NDRhYzc2.ZOg_XNUa7Si1BjN_qRL72rsLJa1X_BV2YmxLsItzTCg"
              }
          });
          if(resp.data.status === "Failed"){
              console.log("failed");
          }
          console.log("response : ",resp);
          setData(resp.data.email);
        }
        getData();
       }catch(err){
           console.log("error in useeffect");
           console.log(err);
       }
    },[]);

    const update = (e)=>{
        const {value} = e.target;
        setMail(value);
     }

    const submit = async(e)=>{
        e.preventDefault();
        try{
          let csrf_token = document.getElementsByName("csrf_token")[0].value;
          //sending the csrf token along with the input
          const resp = await axios.post("http://localhost:4000/profile",{email : mail,csrf_token: csrf_token},
          //this information is stored in cookies. Do not display it as it is.
          //only for demonstration purpose.
          {
            headers : {
                Authorization : "Bearer" + " " + "eyJhbGciOiJIUzI1NiJ9.NjIwZGM0M2VkNDQzOTI3Mzc2NDRhYzc2.ZOg_XNUa7Si1BjN_qRL72rsLJa1X_BV2YmxLsItzTCg"
            }
        }
          );
          console.log("response : ",resp);
          alert(resp.data.message);
          setData(resp.data.email);
        }catch(err){
            console.log("error..");
            alert("something went wrong!");
            console.log(err);
        }
    }

    return (
        <>
            <div className="container">
                <div className="title">
                    <p>PROFILE</p>
                    <h5> Current Email : {data}</h5>
                    <div className="form">
                        <h6>To update your Email-ID</h6>
                        {/* hidden csrf token */}
                            <input type="hidden" value="eyJhbGciOiJIUzI1NiJ9.NjIwZGM0M2VkNDQzOTI3Mzc2NDRhYzc2.4AVI6xqLgLHd4O9yzpTssf2i9dnNeGFiH5qq8osoMW4"  name="csrf_token"/>
                        <div className="form-box">
                            <input type="text" placeholder="Enter your new Email" value={mail} onChange={update} name="email"/>
                        </div>
                        <button type="submit" onClick={submit}>Update</button>
                    </div>
                <br></br>
                <h6>Advertisment : </h6>
                <p> Love cats ? then do visit this <a href="http://localhost:3001">Link</a></p>
                </div>
            </div>
        </>
    )
}

export default Profile;