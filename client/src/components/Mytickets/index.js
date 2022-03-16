import styles from "./styles.module.css";
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import jwtDecode from "jwt-decode";
const Mytickets = () =>{
  let decoded = jwtDecode(localStorage.getItem("token"))
  localStorage.setItem('decoded',decoded)
 console.log(decoded._id)
 
// useEffect(()=>{
// axios.get("http://localhost:8080/mytickets/"+decoded._id)
// .then(res=>setTickets(res.data))
// },[])
const [data, setData] = useState([]);

    const fetchInventory = () => {
      axios.get("/mytickets/"+decoded._id)
      .then(res=>setData(res.data))
    }

    useEffect(() => {
        fetchInventory();
    }, []);



    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
				
				<Link to={`/home`} className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					Home
				</Link>
				<h1 style={{margin:"auto"}}>Tickets Created By Me</h1>
			
			</nav>
            {/* <Link to={`/`} style={{color:"white",textDecoration:"none",backgroundColor:"#535353"}}  >
					Back
				</Link>
            <h3 className='container' style={{color:"white",textAlign:"center",backgroundColor:"#535353",padding:"10px"}}>Tickets Created By Me</h3> */}
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assignee</th>
                    <th>Description</th>
                    <th>Created on</th>
                    <th>Updated on</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.assignee}</td>
                            <td>{item.description}</td>
                            <td>{item.name+" created on "+item.time}</td>
                            <td>{(item.updatedAt!=null)?(item.assignee+" updated on "+item.updatedAt):("no update yet")}</td>
                            <td>{item.status}</td>

                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Mytickets;
