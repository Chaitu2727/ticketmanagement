import styles from "./styles.module.css";
import { Link} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import axios from "axios";
import image from "./image.png"
import {VictoryPie} from "victory-pie"




const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	 };

	 let decoded = jwtDecode(localStorage.getItem("token"))
     localStorage.setItem('decoded',decoded)
    console.log(decoded._id)
const [user,setUser]=useState([])
useEffect(()=>{
	axios.get("http://localhost:8080/"+decoded._id)
	.then(res=>setUser(res.data[0]))
},[])
 console.log(user.name)

 const [data, setData] = useState([]);

    const fetchInventory = () => {
      axios.get("http://localhost:8080/mytickets/"+decoded._id)
      .then(res=>setData(res.data))
    }

    useEffect(() => {
        fetchInventory();
    }, []);

var ass=0,inp=0,comp=0
data.forEach(element => {
	if(element.status=="assigned"){ass+=1}
	else if(element.status=="in-progress"){inp+=1}
	else if(element.status=="completed"){comp+=1}
});

const [data1, setData1] = useState([]);

    const fetchInventory1 = () => {
      axios.get("http://localhost:8080/myassignee/"+decoded._id)
      .then(res=>setData1(res.data))
    }

    useEffect(() => {
        fetchInventory1();
    }, []);

		var ass1=0,inp1=0,comp1=0
		data1.forEach(element => {
			if(element.status=="assigned"){ass1+=1}
			else if(element.status=="in-progress"){inp1+=1}
			else if(element.status=="completed"){comp1+=1}
		});

		//pie
		const mydata=[
			{x:"Assigned",y:ass},
			{x:"In-Progress",y:inp},
			{x:"Completed",y:comp}
		]
		const mydata1=[
			{x:"Assigned",y:ass1},
			{x:"In-Progress",y:inp1},
			{x:"Completed",y:comp1}
		]
// const fetchUser=()=>{
// fetch("http://localhost:8080/"+decoded._id).then(res=>res.json()).then((data)=>setUser(data))
// console.log(user)
// }

// useEffect(() => {
//   let isActive = true;

//   fetch("http://localhost:8080/"+decoded._id)
//     .then((response) => response.json())
//     .then((data) => {
//       if (isActive) {
//         setUser(data);
//       }
//     })
//     .catch((error) => console.log(error.message));

//   return () => {
//     isActive = false;

//   };
// }, []);
// console.log(user)

	return (
		<>
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Ticket Management</h1>
				<Link to={`/mytickets/`} className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					My Tickets
				</Link>
				<Link to={`/myassignee/`}  className={styles.white_btn} style={{textDecoration:"none",textAlign:"center",color:"black"}}>
					Assigned To me
				</Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h1 style={{textAlign: "center",fontFamily:"Comic Sans MS"}}>Hello!.. {user.name}</h1>
			{/* <h1 style={{textAlign: "center",fontFamily:"sans-serif"}}>Welcome to Ticket Management Tool!</h1> */}
			{/* <h1 style={{textAlign: "center",fontWeight:"bold",marginTop:"10%"}}><Link to="/newticket" className="btn btn-dark me-2">Create New Ticket</Link></h1> */}
		<div className="row">
		<div className="col-sm-4" style={{textAlign:"center"}}>
		<h4>Tickets Created by You: {data.length} </h4>
			<h5>Assigned: {ass} </h5>
			<h5>In-Progress: {inp} </h5>
			<h5>Completed: {comp} </h5>
			<div  >
			<VictoryPie
		
			responsive={true}
			data={mydata}
			colorScale={["#03fcc6","#fc0394","#fcb103"]}
			radius={50}

			/></div>
			
		</div>
		<MDBCard style={{ maxWidth: '30rem', margin: "0 auto"}} className="col-sm-4">
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'> 
        <MDBCardImage src={image} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div> 
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Ticket</MDBCardTitle>
        <MDBCardText>
          What the problems you have mention here to resolve your probblem.
        </MDBCardText>
        <Link to="/newticket"  ><MDBBtn style={{ backgroundColor: '#a247fc' }}>Create A New Ticket</MDBBtn></Link>
      </MDBCardBody>
    </MDBCard>
		<div className="col-sm-4" style={{textAlign:"center"}}>
		<h4>Tickets Assigned to You: {data1.length} </h4>
			<h5>Assigned: {ass1} </h5>
			<h5>In-Progress: {inp1} </h5>
			<h5>Completed: {comp1} </h5>
			<div  >
			<VictoryPie
		
			responsive={true}
			data={mydata1}
			colorScale={["#03fcc6","#fc0394","#fcb103"]}
			radius={50}

			/></div>
		</div>
		</div>
	
		</div>
		</>
	);
};

export default Main;