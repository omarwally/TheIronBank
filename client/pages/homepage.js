// import React from "react";
// import ReactDom from "react-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import jwt from "jwt-decode";
// import Dashboard from "../components/Dashboard";

// function Homepage() {


//     // withCredentials: true
//     const [payload, setPayload] = useState([]);
//     useEffect(() => {
//         axios.get("http://localhost:3000/user", { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbWFkQGdpdS5jb20iLCJ1c2VybmFtZSI6IkVtYWQiLCJpYXQiOjE2MzgzNTU5NjksImV4cCI6MTYzODM1NjI2OX0.iewkcIkmTSVEycRTeQ2dYUNcnEDwZLFm6jwsWcmh5H0` } }).then((response) => {
//             const data = response.data;
//             setPayload(data);
//             console.log(localStorage)

//         });
//     }, []);


//     return (
//         <div >
//             <Dashboard> </Dashboard>

//         </div>
//     );
// }

// export default Homepage;