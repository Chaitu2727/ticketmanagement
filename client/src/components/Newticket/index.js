import styles from "./styles.module.css";
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newticket = () =>{
  // const options = [
  //   { name: "One", id: 1 },
  //   { name: "Two", id: 2 },
  //   { name: "Three", id: 3 },
  //   { name: "four", id: 4 }
  // ];
  let decoded = jwtDecode(localStorage.getItem("token"))
     localStorage.setItem('decoded',decoded)
    console.log(decoded._id)
  const [val,setVal] =useState([])
  const [user,setUser]=useState([])
useEffect(()=>{
	axios.get("/"+decoded._id)
	.then(res=>setUser(res.data[0]))
},[])
 console.log(user.name)
  // fetch("http://localhost:8080/newticket").then(res=>res.json())
  // .then(data=>data(element => {
  //   set(element.name)
  // }));
  useEffect(()=>{
    axios.get("/newticket")
    .then(res=>setVal(res.data))
},[])

console.log(val)
  // console.log(val.at(1))
  //val.forEach((e)=>{console.log(e);})

// const display=(e)=>(
//   <option>{e}</option>
// )
  const [data, setData] = useState({ name: "", type: "" ,assignee:"",description:""});
        const handleChange = e => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
            console.log(data)
        };

        const handleSubmit=(e)=> {
        e.preventDefault();
      
          // Once the form has been submitted, this function will post to the backend
       const {name, type,assignee,description}=data;
         if(name!=user.name){toast.warning("Name doesn't matched",{autoClose:1000})}
         else if(type=="" || type=="Open this select Type" || assignee=="" || assignee=="Select Assignee" || description==""){toast.warning("All feilds are Mandatory",{autoClose:1000})}
         else{
          const postURL = "/newticket" //Our previously set up route in the backend
          axios.post(postURL,data)
          toast.success("Submitted Successfully")
          // fetch(postURL, {
          //     method: 'POST',
          //     headers: {
          //         'Accept': 'application/json',
          //         'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({ // We should keep the fields consistent for managing this data later
          //       name, type,assignee,description
          //     })
          // })
          // .then(()=>{
          //     // Once posted, the user will be notified 
          //     console.log(data);
          //     alert('You have been added to the system!');
          // })
           setTimeout(()=>{window.location.reload()},5000)  }
           
      }
      
      const resetform=()=>{
        setData({...data,name:"",type:"",assignee:"",description:""})
      }


  return (
    <div className={styles.main_container}>
     {/* <button><Link to={`/`} style={{color:"black",textDecoration:"none"}}  >
					Back
				</Link></button>  */}
      
      <nav className={styles.navbar}>
				
				<Link to={`/home`} className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					Home
				</Link>
				<h1 style={{margin:"auto"}}>New Ticket</h1>
			
			</nav>
    <ToastContainer />
    {/* <h1 style={{backgroundColor:"#535353",padding:"10px"}}></h1> */}
    {/* <h3 className='container' style={{color:"white",textAlign:"center",backgroundColor:"#535353",padding:"10px"}}>New Ticket</h3> */}
   
   
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="form.name" >
            <Form.Label style={{fontWeight:"bold"}}>Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" name="name" value={data.name} autoFocus  required onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="form.type" >
            <Form.Label style={{fontWeight:"bold"}}>Type:</Form.Label>
        <Form.Select  aria-label="Default select example" name="type"  required onChange={handleChange}>
          <option>Open this select Type</option>
          <option value="IT Infra" >IT Infra</option>
          <option value="Human Resources">Human Resources</option>
          <option value="IT Application">IT Application</option>
          <option value="Policy & Process">Policy & Process</option>
        </Form.Select>
        </Form.Group>
        <Form.Group controlId="form.assignee">
            <Form.Label style={{fontWeight:"bold"}}>Assignee:</Form.Label>
            <Form.Select  name="assignee" required onChange={handleChange}>
              <option>Select Assignee</option>
              {val.map((e)=>(decoded._id!=e._id?<option value={e.name} key={e._id}>{e.name}</option>:null))}
            </Form.Select>
            {/* <select name="assignee" id="form.assignee">
            {val.map((e)=>(<option>{e.name}</option>))}
              </select> */}
        </Form.Group>
        <Form.Group controlId="form.textarea">
            <Form.Label style={{fontWeight:"bold"}}>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={data.description} required onChange={handleChange} />
        </Form.Group><br/>
              
      <button className="btn btn-primary" type='submit' style={{backgroundColor:"#a247fc"}}>Submit</button>&nbsp;
      <button className="btn btn-secondary" onClick={resetform} style={{backgroundColor:"red"}}>Reset</button>
      </Form>
          
    </Container>
    </div>
  );
}
export default Newticket;
