# Ticket Management tool

A ticket/incident management tool  built on the MERN stack.

# Problem Statement

Ticket/Incident management tool:
1.	Users should be able to log in and log out (Pre-populated user list)
2.	Users should be able to view the tickets which are assigned to them and created by them
3.	Users should be able to create a ticket with the following details
      •	Type
      •	Name
      •	Description
      •	Assignee (No self-assignment is allowed)
4.	Ticket lifecycle
      •	ASSIGNED - Created and assigned to someone (Default)
      •	IN-PROGRESS - When the assignee started the work, this status can be set by the assignee only
      •	COMPLETED - When the assignee completed the work, this status can be set by the assignee only
5.	Users should be able to view the activity of the ticket which includes ticket status, activity time, the  respective user. Example: John changed the status to Completed on 21 Feb 2022 10:00 AM

# Solution Provided
1.For the purpose of SignIn/SignUp JWT is used.
2.The token will be stored in local storage.
3.For creating new Ticket the data shold be sent to the dataBase using post method.
4.For viewing tickets created by user, get method along with filtering the tickets with the name equal to user name.
5.For viewing tickets assigned to the user,get method along with filtering the tickets with the assignee is eual to user name. 
6.To edit the status of assigned tickets patch method is used.
7.For viewing the activity of user pie charts are shown in home page.
8.when user gets logout the token in local storage will be removed.
9.For more resposive application build for mobile screen resolution also.

# Architecture
![Capture](https://user-images.githubusercontent.com/94965596/159108848-90d092bc-3ce2-4808-b0b2-12810e4a4748.PNG)

# Dependendencies
for front end:
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.24.0",
    "bootstrap": "^4.6.0",
    "jwt-decode": "^3.1.2",
    "mdb-react-ui-kit": "^2.4.0",
    "react": "^17.0.2",
    "react-bootstrap": "^2.1.2",
    "react-chartjs-2": "^4.0.1",
    "react-dom": "^17.0.2",
    "react-hook-form": "^7.28.0",
    "react-icons": "^4.3.1",
    "react-router-dom": "^6.2.1",
    "react-scripts": "5.0.0",
    "react-toastify": "^8.2.0",
    "victory": "^36.3.0",
    "web-vitals": "^2.1.2"

for backend:
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.2",
    "joi": "^17.5.0",
    "joi-password-complexity": "^5.1.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.1.2",
    "mongoose-dummy": "^1.0.8",
    "nodemon": "^2.0.15"

## Project Setup

split the terminal:
In one terminal
1. cd server
2. npm install
3. npm start
4. server will listen to localhost:8080

In another terminal
1. cd client
2. npm install
3. npm start
4. Open the project on localhost:3000

## Technology Stack

##### MERN stack

- MongoDB
- Express.js
- React.js
- Node.js

# Results
![Screenshot (4)](https://user-images.githubusercontent.com/94965596/158993397-d2e3f19e-d1a1-445a-b540-68ecad5be3b0.png)


![Screenshot (5)](https://user-images.githubusercontent.com/94965596/158993456-0c1b1a30-c854-42f6-a81a-0b843033ab53.png)
![Screenshot (16)](https://user-images.githubusercontent.com/94965596/158993487-77a1dc1c-e80b-427e-b278-6db4399be4e5.png)
![Screenshot (10)](https://user-images.githubusercontent.com/94965596/158993515-03fb2b50-cff4-4c83-b6d9-4f7351c743e1.png)
![Screenshot (11)](https://user-images.githubusercontent.com/94965596/158993555-7627db61-29e9-4aaf-ab36-e19302d8eda2.png)
![Screenshot (13)](https://user-images.githubusercontent.com/94965596/158993569-1e8352c4-ed63-43b7-af77-a9286b5c9bee.png)
