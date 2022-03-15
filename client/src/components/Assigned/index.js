import styles from "./styles.module.css";
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Assigned = () =>{
  let decoded = jwtDecode(localStorage.getItem("token"))
  localStorage.setItem('decoded',decoded)
 console.log(decoded._id)
const [tickets,setTickets]=useState([])
// useEffect(()=>{
// axios.get("http://localhost:8080/mytickets/"+decoded._id)
// .then(res=>setTickets(res.data))
// },[])
const [data, setData] = useState([]);

    const fetchInventory = () => {
      axios.get("http://localhost:8080/myassignee/"+decoded._id)
      .then(res=>setData(res.data))
    }

    useEffect(() => {
        fetchInventory();
    }, []);

console.log(data);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [status, setStatus] = useState(null);

    
    const onEdit = ({_id, currentStatus}) => {
        setInEditMode({
            status: true,
            rowKey: _id
        })
        setStatus(currentStatus);
    }

    
    const updateInventory = ({_id, newStatus}) => {
        fetch("http://localhost:8080/myassignee/"+_id, {
            method: "PATCH",
            body: JSON.stringify({
                status: newStatus
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchInventory();
            })
    }

   
    const onSave = ({_id, newStatus}) => {
        updateInventory({_id, newStatus});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setStatus(null);
    }

    return (
        
        
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
				
				<Link to={`/`} className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					Home
				</Link>
				<h1 style={{margin:"auto"}}>Tickets Assigned to Me</h1>
			
			</nav>
        {/* <Link to={`/`} style={{color:"white",textDecoration:"none",backgroundColor:"#535353"}}  >
					Back
				</Link>
            <h3 className='container' style={{color:"white",textAlign:"center",backgroundColor:"#535353",padding:"10px"}}>Tickets Assigned to Me</h3> */}
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assignee</th>
                    <th>Description</th>
                    <th>Created On</th>
                    <th>Updated On</th>
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
                            <td>{(item.updatedAt!=null)?(item.assignee+" updated on "+item.updatedAt):("no upate yet")}</td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item._id ? (
                                        // <input value={status}
                                        //        onChange={(event) => setStatus(event.target.value)}
                                        // />
                                        <select name="status"  onChange={(event) => setStatus(event.target.value)}>
                                          <option>Select Status</option>
                                          <option value='assigned'>Assigned</option>
                                          <option value='in-progress'>In-Progress</option>
                                          <option value='completed'>Completed</option>
                                          
                                        </select>
                                    ) : (
                                        item.status
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item._id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"} 
                                                onClick={() => onSave({_id: item._id, newStatus: status})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"} style={{backgroundColor:"#a247fc",color:"black"}}
                                            onClick={() => onEdit({_id: item._id, currentStatus: item.status})}
                                        >
                                            Edit
                                        </button>
                                    )

                                }

                            </td>

                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        
    );
}
export default Assigned;