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
let nextUrl = `https://swapi.dev/api/planets/`;
let count = 0;
let counted = 0;


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

// async function printResults({results}) {
//       let result = results[count];
//       console.log(result);
//       let item = document.createElement('li');
//       item.innerText = result.name;
//       list.appendChild(item);
//       counted++;
//       return Promise.resolve(results)
// }

// setTimeout(printResults, 2000);

async function printResultsAndPage({data}) {
  
  printResults(data)
  printPageNumber(data);
  return (data.next);
}

function fetchNextPlanets(url=`https://swapi.dev/api/planets/`) {
    return axios.get(url);
}

async function fetchAndDisplay() {
  count+1 < 3 ? count++ : clearInterval(intervalId);
    const res = await fetchNextPlanets(nextUrl)
    nextUrl = await printResultsAndPage(res)
    return  nextUrl;
}
// fetchAndDisplay()
let intervalId =  setInterval(fetchAndDisplay, 3000); 
// fetchAndDisplay()
// .then(fetchAndDisplay)
// .then(fetchAndDisplay)
// .then(fetchAndDisplay)
// .then(fetchAndDisplay)

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

// fetchNextPlanets()
// .then(printResultsAndPage)
// .then(fetchNextPlanets)
// .then(printResultsAndPage)
// .then(fetchNextPlanets)
// .then(printResultsAndPage)
// .catch((error)=> {
//         console.log(`catched error below`);
//         console.log(error);
//     })


/*****************************************  using async and await ***************************************************/
// let nextUrl = `https://swapi.dev/api/planets/`
// let count = 0;

//   function displayFruit() {
//     const fruits = [
//         "apple", "banana", "orange", "mango", "grapes", "watermelon", "strawberry", "peach", "kiwi", "lemon",
//         "pineapple", "papaya", "pear", "plum", "cherries", "apricot", "fig", "grapefruit", "raspberries", "blackberries"
//       ];


//     const list = document.getElementById("fruit-list");

//     const item = document.createElement("li");
//       item.appendChild(document.createTextNode(fruits[count]));
//       list.appendChild(item);
//       if (count < 19) 
//         count++
//       else {
//         clearInterval(intervalId);
//         return
//       }

//   }

// let intervalId =  setInterval(displayFruit, 500); 


/*****************************************  just some practice ***************************************************/

// let nextUrl = `https://swapi.dev/api/planets/`
// let count = 0;

  function displayFruit() {
    const fruits = [
        "apple", "banana", "orange", "mango", "grapes", "watermelon", "strawberry", "peach", "kiwi", "lemon",
        "pineapple", "papaya", "pear", "plum", "cherries", "apricot", "fig", "grapefruit", "raspberries", "blackberries"
      ];

    const list = document.getElementById("fruit-list");

    const item = document.createElement("li");
      item.appendChild(document.createTextNode(fruits[count]));
      list.appendChild(item);
      if (count+1 < 3) 
        count++
      else {
        clearInterval(intervalId);
        return
      }
  }
// let intervalId =  setInterval(displayFruit, 1000); 