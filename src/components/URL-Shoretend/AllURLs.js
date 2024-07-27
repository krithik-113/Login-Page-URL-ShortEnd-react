import axios from "axios";
import React, { useEffect, useState } from "react";

const AllURLs = () => {

    const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(`https://login-page-url-shortend-react.onrender.com/url/allurl`)
      .then((response) => response.data)
      .then((result) => {
        setData(result.user);
        console.log(result.user);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="container">
      {data.length ?<h3>***Short URL's Created By Users***</h3>: <h3>***No Record Found Right Now***</h3>}
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">_id</th>
            <th scope="col">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {data.length &&
            data.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllURLs;
