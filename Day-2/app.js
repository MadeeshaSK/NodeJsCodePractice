//asyncronous read file

/*
const fs = require('fs'); // fs is file system module which is core module of node.js
fs.readFile('example.txt', 'utf8', (err, data) => { //utf8 caracter encoding type
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(data);
  }
});
console.log('data read complete1');
*/

// but the output is: 
/*
data read complete
Contrary to popular belief, Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
and going through the cites of the word in classical literature, discovered the undoubtable source.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
(The Extremes of Good and Evil) by Cicero, written in 45 BC. 
This book is a treatise on the theory of ethics, very popular during the Renaissance.
The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
comes from a line in section 1.10.32.
*/

//syncronous read file
const fs = require('fs');
try {
  const data2 = fs.readFileSync('example.txt', 'utf8');
  console.log(data2);
} catch (err) {
  console.error(err);
}
console.log('data read complete2');

//output:
/*
Contrary to popular belief, Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
and going through the cites of the word in classical literature, discovered the undoubtable source.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
(The Extremes of Good and Evil) by Cicero, written in 45 BC.
This book is a treatise on the theory of ethics, very popular during the Renaissance.
The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
comes from a line in section 1.10.32.
data read complete
*/

//asyncronous write file

/*
const fs2 = require('fs');
const content = 'Some content!';
fs2.writeFile('autoCreateTxt.txt', content, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('file written successfully');
});
console.log('write file complete');
*/

//output:
/*
write file complete
file written successfully
*/

//syncronous write file
const fs4 = require('fs');
const content2 = 'Some content!';
try {
  const data3 = fs4.writeFileSync('autoCreateTxt2.txt', content2);
  console.log('file written successfully');
} catch (err) {
  console.error(err);
}   
console.log('write file complete');

//output:
/*
write file complete
file written successfully
*/

// read and write within two files

const fs5 = require('fs');
try {
    const data4 = fs5.readFileSync('example.txt', 'utf8');
    fs5.writeFileSync('autoCreateTxt.txt', data4,(err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
} catch (err) {
    console.error(err);
}
console.log('read and write complete');

//OS modules

const os = require('os');
console.log('CPU info', os.cpus());
console.log('Total memory', os.totalmem());
console.log('Free memory', os.freemem());
console.log('Uptime', os.uptime());
console.log('User info', os.userInfo());
console.log('Platform', os.platform());
console.log('Release', os.release());
console.log('Type', os.type());
console.log('Arch', os.arch());
console.log('Network Interfaces', os.networkInterfaces());
console.log('Hostname', os.hostname());
console.log('Load Average', os.loadavg());
console.log('Endianness', os.endianness());
console.log('Constants', os.constants);
console.log('OS version', os.version());
console.log('EOL', os.EOL);
console.log('Homedir', os.homedir());
console.log('Tmpdir', os.tmpdir());

// web client request from API server (using node), it response

// http module
const http = require('http');
require('dotenv').config(); // to access env use dotenv from install npm install dotenv
const PORT = process.env.PORT; // best practice use env , dont use const PORT = 3000;
const server = http.createServer((req, res) => {
  //GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, CONNECT, TRACE
  // load data from server(GET)
  if (req.method === 'GET' && req.url === '/link') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Read data from server");
// we can use that way GET method, but can not use POST, PUT, DELETE, PATCH, OPTIONS, HEAD, CONNECT, TRACE
// for that we use Postman software
// https://www.postman.com/downloads/
// option is the pre request, we can use that way same as GET method to check whether it is working or not


  // give data to server(POST)
  } else if (req.method === 'POST' && req.url === '/link2') {
    res.writeHead(201, { 'Content-Type': 'text/plain' });
    res.end("Create data to server");

  // update data to server(PUT)
  } else if (req.method === 'PUT' && req.url === '/link3') {
    res.writeHead(202, { 'Content-Type': 'text/plain' });
    res.end("Update data to server");

  // delete data from server(DELETE)
  } else if (req.method === 'DELETE' && req.url === '/link4') {
    res.writeHead(204, { 'Content-Type': 'text/plain' });
    res.end("Delete data from server");

  }else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Route Not Found");
  }
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // access project : http://localhost:3000/link
});
// to access env use dotenv from install npm install dotenv
//  then come files node_modules(dotenv is in this file),
//  package.json (dependencies of all node_module and recod), package-lock.json(log of package json), .env
/*
dont delete package json and package-lock.json, if delete node_modules, then run npm install
then it read dependencies from package.json and install all dependencies
*/
/*
status codes:
200 - OK
201 - Created
202 - Accepted
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
405 - Method Not Allowed
500 - Internal Server Error
501 - Not Implemented
502 - Bad Gateway
503 - Service Unavailable
504 - Gateway Timeout
...
100-199 - Informational
200-299 - Success
300-399 - Redirection
400-499 - Client Error
500-599 - Server Error

now type http://localhost:3000/link in browser
output: Read data from server
if link is wrong like http://localhost:3000/lin
output: Route Not Found
*/

/*
Nodemon
this is a tool that helps develop node.js based applications by automatically restarting
 the node application when file changes in the directory are detected.
 otherwise we have to stop the server and run again
npm install -g nodemon
nodemon app.js
this can only use in development mode, not in production mode

*/
