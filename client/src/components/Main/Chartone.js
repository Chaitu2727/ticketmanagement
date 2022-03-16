import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import {VictoryPie} from "victory-pie"
import { Row, Col } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';

const Chartone = () => {

	let decoded = jwtDecode(localStorage.getItem("token"))
    localStorage.setItem('decoded',decoded)
    console.log(decoded._id)

    const [data, setData] = useState([]);

    const fetchInventory = () => {
      axios.get("/mytickets/"+decoded._id)
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
    
    const mydata=[
        {x:"Assigned",y:ass},
        {x:"In-Progress",y:inp},
        {x:"Completed",y:comp}
    ]
		
	return (
		<>
            <Row className="myassign">
                <Col sm={12} md={6} lg={6}>
                    <VictoryPie
                    responsive={true}
                    data={mydata}
                    colorScale={["#03fcc6","#fc0394","#fcb103"]}
                    radius={80}
                    />
                </Col>
                <Col sm={12} md={6} lg={6} mt-5>
                <br/><br/><br/>
                <MDBCardBody style={{ textAlign : "left" }}>
                    <MDBCardTitle><b><u><i>Ticket</i></u></b></MDBCardTitle>
                    <MDBCardText>
                            Total tickets: {data.length}
                        </MDBCardText>
                    <MDBCardText>
                        Assigned: {ass}
                    </MDBCardText>
                    <MDBCardText>
                        In-Progress: {inp}
                    </MDBCardText>
                    <MDBCardText>
                        Completed: {comp}
                    </MDBCardText>
                </MDBCardBody>
                </Col>
            </Row>
		</>
	);
};

export default Chartone;
