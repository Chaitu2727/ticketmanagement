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
 

const [data, setData] = useState([]);
const [values,setValues]=useState([])
    const fetchInventory = () => {
      axios.get("/mytickets/"+decoded._id)
      .then(res=>{setData(res.data)
    setValues(res.data)})
    }

    useEffect(() => {
        fetchInventory();
    }, []);

const setfilter=(stat)=>{
    if(stat!=""){
  setValues( data.filter(val=>val.status==stat))
    }
    else{
        setValues(data)
    }

}

const sortbyDateNew=()=>{
    setValues(data.slice().sort((a, b) => new Date(b.time) - new Date(a.time)));
}
const sortbyDateOld=()=>{
    setValues(data.slice().sort((a, b) => new Date(b.time) - new Date(a.time)).reverse());
}
const sortbyDateMod=()=>{
    const res=data.filter(a=>a.updatedAt!=null)
    const res1=data.filter(a=>a.updatedAt==null)
    
    setValues([...res.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),...res1.slice().sort((a, b) => new Date(b.time) - new Date(a.time))]);
    //setValues(data.slice().sort((a, b) => a.updatedAt - b.updatedAt).reverse());
}
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
				
				<Link to={`/home`} className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					Home
				</Link>
				<h1 style={{margin:"auto"}}>Tickets Created By Me</h1>
			
			</nav>
            <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" style={{backgroundColor:"#fc03df",float:"right",fontWeight:"bold"}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Filter by Status
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" onClick={() => setfilter("")}>All</a></li>
    <li><a className="dropdown-item" onClick={() => setfilter("assigned")}>Assigned</a></li>
    <li><a className="dropdown-item" onClick={() => setfilter("in-progress")}>In-Progress</a></li>
    <li><a className="dropdown-item" onClick={() => setfilter("completed")}>completed</a></li>

  </ul>

  <button class="btn btn-secondary dropdown-toggle" style={{backgroundColor:"#fc03df",float:"right",fontWeight:"bold"}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By Date
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" onClick={() => sortbyDateNew()}>Newest First</a></li>
    <li><a className="dropdown-item" onClick={() => sortbyDateOld()}>Oldest First</a></li>

    <li><a className="dropdown-item" onClick={() => sortbyDateMod()}>Latest Modified</a></li>
    

  </ul>
</div>
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
                    values.map((item) => (
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
