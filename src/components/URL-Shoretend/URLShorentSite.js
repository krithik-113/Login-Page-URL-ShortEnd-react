import axios from "axios";
import React, { useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";

const URLShorentSite = ({ dataEmail }) => {
const navigate =useNavigate()
    const [bigURL, setBigURL] = useState('')
    const popupRef = useRef()
    let [error,setError] = useState('')
    const [shorturl,setShorturl]=useState('')
    const handleShortURL = () => {
            
        if (!bigURL) {
            error = '*Required'
            setError(error)
        } else if (!dataEmail) {
            alert('Kindly login before pasting URL')      
            navigate("/");
        }
        else {
            setError('')
            axios
              .post(
                `https://login-page-url-shortend-react.onrender.com/url/shorturl/${dataEmail}`,
                {
                  url: bigURL,
                }
              )
              .then((res) => {
                console.log(
                  `Your email: ${res.data.email}\n Note:- ${res.data.message}\n Shorten URL- ${res.data.shortURL}\n`
                );
                console.log(res.data.user);
                setShorturl(res.data.shortURL);
                popupRef.current.style.display = "block";
              })
              .catch((err) => console.log(err.message));
        }
    }
    function handleClosePopup() {
        popupRef.current.style.display = 'none'
    }
  return (
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Put your URL</label>
      <div className="input-group mb-3" style={{ marginTop: "30px" }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Paste URL"
          aria-label="Username"
          aria-describedby="basic-addon1"
          required
          value={bigURL}
          onChange={(e) => setBigURL(e.target.value)}
        />
        <br />
      </div>
      <p style={{ color: "red" }}>{error}</p>
      <button
        type="button"
        className="btn btn-success"
        style={{ marginTop: "30px" }}
        onClick={handleShortURL}
      >
        Shortend URL
      </button>
      <div className="modal-dialog" style={{display:"none"}} ref={popupRef}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
          </div>
          <div className="modal-body">
                      Your email:{ " " } <span style={{ color: "black" }}> {dataEmail} </span>
            <br /> Note:- Replace {"<email>"} from your actual login email to
            navigate your given URL <br /> Shorten URL-{"  "}
            <span style={{ color: "black" }}> {shorturl}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShorentSite;
