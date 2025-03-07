console.log('Welcome to Node.js');

// modules 
// modules are reusable block of code whose existence does not accidentally impact other code

const maths = require('./math');
console.log(maths.add(10, 20)); // 30

// async await
// await keyword is used to wait for a promise to resolve or reject 
//only inside an async function


// using promise then and catch (callback)
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true; // Change to false to test error handling
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Error fetching data.");
            }
        }, 2000);
    });
}

fetchData()
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
``
// using async await 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true; // Change to false to test error handling
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Error fetching data.");
            }
        }, 2000);
    });
}

async function getData() { //const fletchData = async () => {}
    try {
        let response = await fetchData();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

getData();

//real example with fake api

const getData2 = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // parse the json data
        console.log(data);  // log the data
    } catch (error) {
        console.error(error);
    }   
}
getData2();


