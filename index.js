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
// const req = fetch('https://swapi.dev/api/planets1/')
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`thrown status code: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log('first 10 planets');
//         for (let planet of data.results) 
//         {
//            console.log(planet.name) 
//         }
//         const nextURL  = data.next;
//        return fetch(nextURL)
//     })
//     .then((response)=> {
//         if (!response.ok) {
//             throw new Error(`thrown status code: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log('Next 10 planets');
//         for (let planet of data.results) 
//         {
//             console.log(planet.name) 
//         }
//     })
//     .catch((err) => {
//         console.log (err);
//         console.log('No connection');
//     });

/*****************************************  using Promises and the Fetch API (my way) ***************************************************/
const list = document.querySelector('#list');

function getDataAndParse(response) {
    if (!response.ok) 
        throw new Error(`bad request:${response.status}`);
    return response.json();
}
function printPageNumber(data) {
    let pageNum = data.next.slice(data.next.length - 6, data.next.length).replace(/=/g, " ");
    let pageHeading = document.createElement('h3');
    pageHeading.innerText = pageNum;
    pageHeading.classList.add("underline", 'page-number-format');
    list.appendChild(pageHeading);
}

function printResults({results}) {
    for (let result of results) {
        let item = document.createElement('li');
        item.innerText = result.name;
        list.appendChild(item);
    }
}

function printResultsAndPage({data}) {
    printResults(data);
    printPageNumber(data);
    return (data.next);
}

function fetchNextPlanets(url=`https://swapi.dev/api/planets/`) {
    return axios.get(url);
}

// fetchNextPlanets()
// .then(getDataAndParse)
// .then(printResultsAndPage)
// .then(fetchNextPlanets)
// .then(getDataAndParse)
// .then(printResultsAndPage)
// .then(fetchNextPlanets)
// .then(getDataAndParse)
// .then(printResultsAndPage)
// .then(() => {
//     setTimeout(() =>list.removeChild(list.lastElementChild), 3000); 
// })
// .catch((error)=> {
//     console.log(`catched error below`);
//     console.log(error);
// })


/*****************************************  using Axios ***************************************************/

fetchNextPlanets()
.then(printResultsAndPage)
.then(fetchNextPlanets)
.then(printResultsAndPage)
.then(fetchNextPlanets)
.then(printResultsAndPage)
.catch((error)=> {
        console.log(`catched error below`);
        console.log(error);
    })