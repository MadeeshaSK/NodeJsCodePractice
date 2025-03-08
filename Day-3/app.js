// express js simplyfy the codes and solve problems of node js
// express js is a framework of node js
// express js is a middleware
/* middleware is a function that has access to the request object (req), 
the response object (res), and the next middleware function in the application’s request-response cycle.*/
// express js is a routing framework
// express js is a template engine
// express js is a web application framework
// install : npm install express

const http = require('http');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const customerRoute = require('./customerRoute');
const mongoose = require('mongoose');
const PORT = process.env.PORT; 
const app = express();
const MONGO_URI = process.env.MONGO_URL;

//npm i body-parser (to get data from the body)
app.use (bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(MONGO_URI).then (() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.use('/customers', customerRoute);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

// structure of project for express js as code redundancy
/*
UI(postman in this example) 
    -> app.js -> route (customer), route (product), route (order) 
        -> controller (customer), controller (product), controller (order)
           -> model (customer), model (product), model (order)
                -> database (mysql, mongodb, sql server) 
*/

/*
 when we enter in postman http://localhost:3000/customers/create
 first http://localhost:3000 it identifies the server this is app.js
    then /customers it identifies the route //app.use('/customers', customerRoute);
    then /create it identifies the controller //router.post('/create', customerController.CreateCustomer);
    then it will execute the CreateCustomer function

    //output
    {
        "message": "Customer created successfully"
    }
*/

// solid principle
// solid principle is a set of five design principles that are used to make software designs more understandable, flexible and maintainable.
// S - Single Responsibility Principle
// single responsibility principle is a computer programming principle that states that every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.
// O - Open/Closed Principle
// open/closed principle is a computer programming principle that states "software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification"; that is, such an entity can allow its behaviour to be extended without modifying its source code.
// L - Liskov Substitution Principle
// Liskov substitution principle is a particular definition of a subtyping relation, called (strong) behavioral subtyping, that was initially introduced by Barbara Liskov in a 1987 conference keynote address titled Data abstraction and hierarchy.
// I - Interface Segregation Principle
// interface segregation principle is a principle of object-oriented design that states that no client should be forced to depend on methods it does not use.
// D - Dependency Inversion Principle
// dependency inversion principle is a specific form of decoupling software modules. When following this principle, the conventional dependency relationships established from high-level, policy-setting modules to low-level, dependency modules are reversed, thus rendering high-level modules independent of the low-level module implementation details.

// db variatiions
/*
RDBMS (Relational Database Management System) 
-> use SQL (Structured Query Language)
tables (relations) / records (tuples) / columns (attributes)
    - MySQL
    - PostgreSQL
    - SQLite
    - Oracle
    - SQL Server    
NoSQL (Not Only SQL) 
-> use JSON (JavaScript Object Notation) /BSON (Binary JSON)
collections / documents / fields
    - MongoDB
    - CouchDB
    - Cassandra
    - Redis
    - HBase
    - Neo4j
    - DynamoDB
    - Firebase

    RDBMS vs NoSQL  

RDBMS (Relational Database)  
Pros:  
- Structured with SQL  
- Ensures data integrity (ACID)  
- Good for complex queries and relationships  

Cons:  
- Hard to scale horizontally  
- Rigid schema  
- Slower for unstructured data  

NoSQL (Non-Relational Database)  
Pros:  
- Flexible schema, easy to scale  
- Fast read/write for big data  
- Supports different data models  

Cons:  
- Weaker consistency (eventual consistency)  
- No standard query language  
- Not ideal for complex relationships  

Use Cases  
- RDBMS: Banking, ERP, e-commerce, healthcare  
- NoSQL: Social media, IoT, real-time analytics, microservices
*/

// mongoose
// mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
// mongodb mapper
// npm install mongoose

// URI (Uniform Resource Identifier)
/*
TYPES OF URI
- URL (Uniform Resource Locator) EX: http://www.example.com/index.html
- URN (Uniform Resource Name) EX: urn:isbn:0451450523
*/