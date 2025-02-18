Janitri Backend
A Node.js and Express.js backend for managing users, patients, and heart rate data. Built with MongoDB and includes authentication, CRUD operations, and API endpoints.

Features
* User authentication (Login & Register)
* CRUD operations for patients
*  Heart rate data storage and retrieval
* MongoDB integration with Mongoose

Tech Stack
* Backend: Node.js, Express.js
* Database: MongoDB, Mongoose

Installation:
* Node.js (v16+)
* MongoDB (Local or Atlas Cloud)

API Endpoints
* User Routes
Method	Endpoint	            Description
POST	/api/users/register	    Register a new user
POST	/api/users/login	    User login

* Patient Routes
Method	 Endpoint	         Description
POST	 /api/patients	     Add a new patient
GET	     /api/patients/:id	 Get patient details

* Heart Rate Routes
Method	  Endpoint	                    Description
POST	  /api/heartrate/:patientId	    Add heart rate data
GET	      /api/heartrate/:patientId	    Get heart rate data


Future Improvements
* Add JWT authentication for all protected routes
* Improve error handling with middleware
* Write better test cases for authentication and validation


Contributing
 * Feel free to open issues or submit PRs!
