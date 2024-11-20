# Todo Application with Node.js, MongoDB, and Jest Testing

This is a simple Todo application built using Node.js and MongoDB. The app allows users to create, update, delete, and view tasks. It demonstrates how to set up and write unit tests using Jest to ensure the functionality of the backend API endpoints.

## Features

- **CRUD Operations**: 
  - Create a new Todo
  - Read all Todos
  - Update a Todo
  - Delete a Todo
- **MongoDB**: All data is stored in MongoDB for persistence.
- **Testing with Jest**: Unit tests are written for each of the API endpoints to ensure that the application logic works as expected.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) or a MongoDB cloud instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

  1. Clone the repository:
  
   git clone https://github.com/snishan/todo-app-with-nodeJs-jest.git
   cd jest-testing-coverage

  2.Install dependencies:

    npm install

  3. Set up MongoDB:

    If you are using a local MongoDB server, make sure it is running.
    If using MongoDB Atlas, configure the connection URL in the db.js file.
  
  
##  Running the Application
  
    To start the application locally, run the following command:

    npm start


  
##  Running Tests
    The project uses Jest for unit testing. To run tests, use the following command:

    npm test


 
## Technologies Used
    Node.js: JavaScript runtime for building the server.
    Express: Web framework for building the API.
    MongoDB: NoSQL database for storing Todos.
    Mongoose: ODM (Object Data Modeling) library to interact with MongoDB.
    Jest: JavaScript testing framework for writing and running unit tests.
    Supertest: HTTP assertion library used for testing API endpoints in Jest.

