import { Route, Routes,Link, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterNewAC from "./components/Register.NewAC";
import ResetPassword from "./components/ResetPassword";
import URLAllTable from "./components/URL-Shoretend/URLAllTable";
import { useRef, useState } from "react";
import URLShorentSite from "./components/URL-Shoretend/URLShorentSite";
import AllURLs from "./components/URL-Shoretend/AllURLs";

function App() {
  const tableRef = useRef("");
  const pasurlRef = useRef('')
  const createutlRef = useRef('')

  const navigate = useNavigate()

  const mainRef = useRef()

  function handleActiveStatus() {
    createutlRef.current.classList.remove("active");
  pasurlRef.current.classList.remove('active')
    tableRef.current.classList.add("active");
    
  }
  function handleAnoActive() {
      createutlRef.current.classList.remove("active");
    tableRef.current.classList.remove("active");
    pasurlRef.current.classList.add("active");
    alert("Please Login to enter the Site");
    navigate('/')
  }
  function handleURL() {
    pasurlRef.current.classList.remove("active");
    tableRef.current.classList.remove("active");
    createutlRef.current.classList.add('active');
  }

const [dataEmail, setDataEmail] = useState("");

  return (
    <div className="container" id="login-cont">
      <div className="URL-shortend">
        <div className="conatiner" id="sidebar">
          <h1>DashBoard</h1>
        <Link to='/'><button type="button" className="btn btn-light" style={{margin:"10px"}} >Log Out</button></Link>
          <ul className="list-group" id="ul">
            <Link to="/url">
              <li
                className="list-group-item"
                ref={createutlRef}
                onClick={handleURL}
              >
                Create Short URL
              </li>
            </Link>
            <Link to="/">
              <li
                className="list-group-item active"
                ref={pasurlRef}
                onClick={handleAnoActive}
              >
                URL Created By You
              </li>
            </Link>
            <Link to="/allurl">
              <li
                className="list-group-item"
                ref={tableRef}
                onClick={handleActiveStatus}
              >
                Created URL in Site
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<LoginPage setDataEmail={setDataEmail} />} />
        <Route path="/register" element={<RegisterNewAC />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/URL-table"
          element={<URLAllTable dataEmail={dataEmail} />}
        />
        <Route path="/url" element={<URLShorentSite dataEmail={dataEmail} />} />
        <Route path="/allurl" element={<AllURLs dataEmail={dataEmail} />} />
      </Routes>
    </div>
  );
}

export default App;
