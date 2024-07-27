import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterNewAC = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fName, setFname] = useState('')
  const [lName,setLname] = useState('')

  const navigate = useNavigate()
  const paraRef = useRef()
  const anoParaRef = useRef()

  let [errEmail, setErrEmail] = useState('')
  let [errPass, setErrPass] = useState('')
  let [errfname, setfname] = useState('')
  let [errlname,setlname]=useState('')

  const handleUserInfo = () => {
    if (!fName) {
      errfname = "*Required";
      setfname(errfname);
    } else if (!lName) {
       errlname = "*Required";
       setlname(errlname);
    }else if (!email) {
      errEmail = "*Required";
      setErrEmail(errEmail)
      paraRef.current.style.display = 'block'; 
      errPass = ''
      setErrPass(errPass)
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errEmail = "Invalid email address";
      setErrEmail(errEmail)
      anoParaRef.current.style.display = 'block'; 
      errEmail = ''
      setErrEmail(errEmail)
    }else if (!pass) {
      errPass = "*Required";
      setErrPass(errPass)
    } else {
       axios
         .post("http://localhost:3003/api/user", {
           email: email,
           password: pass,
           firstName: fName,
           lastName:lName,
         })
         .then((res) => {
           if (res.data.message === "User Email already Exists") {
             alert(res.data.message);
             navigate("/");
           } else {
             alert("Successfully SignUp");
             setEmail("");
             setPass("");
             navigate("/");
           }
         })
         .catch((err) => console.log(err));
    }
   
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
        <input type="type" className="form-control" value={fName} onChange={(e) => setFname(e.target.value)} />
        <div ref={paraRef} id="emailHelp" className="form-text" style={{color:"red"}}>{errfname}</div>
         <label htmlFor="exampleInputEmail1" className="form-label">Second Name</label>
        <input type="type" className="form-control" value={lName} onChange={(e) => setLname(e.target.value)} />
        <div ref={paraRef} id="emailHelp" className="form-text" style={{color:"red"}}>{errlname}</div>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div ref={paraRef} id="emailHelp" className="form-text" style={{color:"red"}}>{errEmail}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e) => setPass(e.target.value)} />
        <div id="emailHelp" ref={ anoParaRef} className="form-text" style={{color:"red"}}>{errPass}</div>
  </div>
          <button type="button" className="btn btn-primary" onClick={handleUserInfo}>SignUp</button>
           <Link to="/"> <button id="reg-back" type="button" className="btn btn-primary">Back</button></Link>
      </form>
  )
}

export default RegisterNewAC