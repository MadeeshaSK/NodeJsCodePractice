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
