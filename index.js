const firstReq =  new XMLHttpRequest();

firstReq.addEventListener('load', () => {
    console.log('It Worked');
    const data = JSON.parse(firstReq.responseText)
    console.log(data.results[0].residents[0]);
    
});

firstReq.addEventListener('error', () => {
    console.log('Error');
});
firstReq.open('GET', 'https://swapi.dev/api/planets/');
firstReq.send();
console.log('Request Sent');