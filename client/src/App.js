import { Route, Routes, Navigate } from "react-router-dom";
//import { useState,useEffect } from "react";

// import Main from "./components/Main/index";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login";
import Mytickets from "./components/Mytickets";
import Assigned from "./components/Assigned";
import Newticket from "./components/Newticket";
import Chartone from "./components/Main/Chartone";
import Charttwo from "./components/Main/Charttwo";
// import jwtDecode from "jwt-decode";
// import axios from "axios";

function App() {
	const user = localStorage.getItem("token");
// 	let decoded = jwtDecode(localStorage.getItem("token"))
//      localStorage.setItem('decoded',decoded)
// console.log(decoded._id)
// const [person,setPerson]=useState([])
// useEffect(()=>{
// 	axios.get("http://localhost:8080/"+decoded._id)
// 	.then(res=>setPerson(res.data[0]))
// },[])
//  console.log(person.name)
	return (
		<Routes>
			{user && 
			<Route path="/home" exact element={<Main />} >
				<Route path={`chartone`} exact element={<Chartone />} />
				<Route path={`charttwo`} exact element={<Charttwo />} />
			</Route>
			}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path={`/mytickets/`} exact element={<Mytickets />} />
			<Route path={`/myassignee/`} exact element={<Assigned />} />
			<Route path="/newticket" exact element={<Newticket />} />
		</Routes>
	);
}
  
export default App;
