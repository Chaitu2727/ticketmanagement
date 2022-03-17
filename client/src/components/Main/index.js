import { Link,  NavLink, Outlet , useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import axios from "axios";
import image from "./image.png"
import { Row , Col } from "react-bootstrap";

const Main = () => {
	
	const navigate = useNavigate();

	let decoded = jwtDecode(localStorage.getItem("token"))
	localStorage.setItem('decoded',decoded)
	console.log(decoded._id)

	const [chart, setChart] = useState('')
	const [user,setUser]=useState([])
	const [data1, setData1] = useState([]);

	let activeStyle={
		color: "white",
		padding: "0.7em 1.7em",
		fontsize: "18px",
		borderradius: "2em",
		background: "#a247fc",
		border: "1px solid #e8e8e8"
	}
	
	const onsubmitdata = () => {
		setChart('assigned to me')
	}

	const onsubmitdata1 = () => {
		setChart('assigned by me')
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};

	const fetchInventory1 = () => {
		axios.get("/myassignee/"+decoded._id)
		.then(res=>setData1(res.data))
	};

	useEffect(()=>{
		axios.get("/"+decoded._id)
		.then(res=>setUser(res.data[0]))
	},[])

    useEffect(() => {
        fetchInventory1();
    }, []);

	var ass1=0,inp1=0,comp1=0
	data1.forEach(element => {
		if(element.status=="assigned"){ass1+=1}
		else if(element.status=="in-progress"){inp1+=1}
		else if(element.status=="completed"){comp1+=1}
	});

	const mydata1=[
		{x:"Assigned",y:ass1},
		{x:"In-Progress",y:inp1},
		{x:"Completed",y:comp1}
	]
		
	return (
	 <>
	   <div className="poo">
		<div className="left">
		  <h2 className="align">Ticket Management</h2>		
		  <MDBCardImage src={image} style={{ backgroundColor: 'white' }} fluid alt='...' />
		
		  <MDBCardBody style={{ backgroundColor: 'white', color: "black" , textAlign : "left"}}>
			<MDBCardTitle>Ticket</MDBCardTitle>
			<MDBCardText>
			What the problems you have mention here to resolve your probblem.
			</MDBCardText>
			<Link to="/newticket"  ><MDBBtn   style={{ backgroundColor: '#a247fc' , color: 'white' , fontFamily: "sanseriff" , borderradius : "12px"  }}>Create A New Ticket</MDBBtn></Link>		
      	 </MDBCardBody>
		  
		 <br/><br/>
		 <Link to={`/mytickets/`} ><MDBBtn style={{ backgroundColor: 'white' , borderRadius : "20px", color: 'black' ,  width: "150px", fontWeight: "bold" }}>My Tickets</MDBBtn></Link>
		 <br/><br/>			
		 <Link to={`/myassignee/`} ><MDBBtn style={{ backgroundColor: 'white' , borderRadius : "20px", color: 'black', width: "150px", fontWeight: "bold"  }}>Assigned to me</MDBBtn></Link>
		 <br/><br/>		  
     	</div>
        
        <div className="right">
	      <button className="logbtn" style={{ backgroundColor: '#a247fc',color:"white" }} onClick={handleLogout}>
			Logout
		  </button>
		
		  <div className="container">
            <h3>Welcome back, {user.name}</h3>
		  </div>

		  <Row mt-5>
			<Col sm={12} md={6} lg={6}>
			<div onClick={() => onsubmitdata()} className="chartbtn">
			<NavLink className="nav-link" to="chartone" style={({ isActive }) => isActive ? activeStyle : undefined} ><i className="fa fa-facebook-official" aria-hidden="true"></i>Tickets Created by You</NavLink></div>
			</Col>

			<Col sm={12} md={6} lg={6} >
			<div onClick={() => onsubmitdata1()} className="chartbtn" >
			<NavLink className="nav-link" to="charttwo" style={({ isActive }) => isActive ? activeStyle : undefined} ><i className="fa fa-google" aria-hidden="true"></i>Tickets Assigned 2 You</NavLink></div>
			</Col>
          </Row>
		  
		  <div>
		  <Outlet />
		  	{/*  display the content in this page itself, instead of going to another path/page */}
		  </div>
		<Link to={`/login/`} ><MDBBtn className='logout' >Logout</MDBBtn></Link>
		 </div>
		</div>
     </>
	);
};

export default Main;
