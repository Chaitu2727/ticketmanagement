import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import {VictoryPie} from "victory-pie"
import { Row, Col } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';

const Charttwo = () => {

	let decoded = jwtDecode(localStorage.getItem("token"))
    localStorage.setItem('decoded',decoded)
    console.log(decoded._id)

    const [data1, setData1] = useState([]);

    const fetchInventory1 = () => {
      axios.get("/myassignee/"+decoded._id)
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
    
    const mydata=[
        {x:"Assigned",y:ass1},
        {x:"In-Progress",y:inp1},
        {x:"Completed",y:comp1}
    ]
		
	return (
		<>
            <Row mt-5>
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
                <MDBCardBody style={{ textAlign : "left" }} >
                    <MDBCardTitle><b><u><i>Ticket</i></u></b></MDBCardTitle>
                        <MDBCardText>
                            Total tickets: {data1.length}
                        </MDBCardText>
                        <MDBCardText>
                            Assigned: {ass1}
                        </MDBCardText>
                        <MDBCardText>
                            In-Progress: {inp1}
                        </MDBCardText>
                        <MDBCardText>
                            Completed: {comp1}
                        </MDBCardText>
                    </MDBCardBody>
                </Col>
            </Row>
		</>
	);
};

export default Charttwo;
