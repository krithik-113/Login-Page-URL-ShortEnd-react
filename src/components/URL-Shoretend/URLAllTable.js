import axios from 'axios';
import React, { useEffect, useState } from 'react'

const URLAllTable = ({ dataEmail }) => {

  const [user, setUser] = useState([])

  useEffect(() => {
    
    axios.get(`http://localhost:3003/url/getuser/${dataEmail}`)
      .then(res => {
        setUser(res.data.user)
        console.log(res.data.user)
      })
      .catch(err=>console.log(err.message))
  },[dataEmail])

  return (
    <div className="conatiner" id="table">
      <div className="row">
        {user.length?<><div className="col">First name- {user.length && user[0].firstName}</div>
        <div className="col">Last name- { user.length && user[0].lastName}</div>
        <div className="col">Created Date- { user.length && user[0].createdAt}</div></>:<h3>***No Record Found Right Now***</h3>}
        
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope='col'>_id</th>
            <th scope="col">Short URL</th>
            <th scope='col'>User Email</th>
          </tr>
        </thead>
        <tbody>
          {user.length &&
            user[0].shortURL.map((val, index) => {
              console.log(val.email)
              return (
                <tr key={index}>
                  <td>{index+1 }</td>
                  <td>{val}</td>
                  <td>{dataEmail }</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default URLAllTable