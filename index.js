/*****************************************  using XMLHttpRequests  ***************************************************/
// const firstReq =  new XMLHttpRequest();

// firstReq.addEventListener('load', () => {
//     console.log('It Worked');
//     const data = JSON.parse(firstReq.responseText)
//     console.log(data.results[0].residents[0]);
// });

// firstReq.addEventListener('error', () => {
//     console.log('Error');
// });

// firstReq.open('GET', 'https://swapi.dev/api/planets/');
// firstReq.send();
// console.log('Request Sent');

/*****************************************  using Promises and the Fetch API ***************************************************/
const req = fetch('https://swapi.dev/api/planets/')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`thrown status code: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('first 10 planets');
        for (let planet of data.results) 
        {
           console.log(planet.name) 
        }
        const nextURL  = data.next;
       return fetch(nextURL)
    })
    .then((response)=> {
        if (!response.ok) {
            throw new Error(`thrown status code: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Next 10 planets');
        for (let planet of data.results) 
        {
            console.log(planet.name) 
        }
    })
    .catch((err) => {
        console.log (err);
        console.log('No connection');
    });