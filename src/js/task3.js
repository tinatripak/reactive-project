const Rx = require('rxjs');
const rxOperators = require('rxjs/operators');
const axios = require('axios');

const userTodayURL = "http://localhost:8000/api/userToday/";
const userAllTime = "http://localhost:8000/api/userAllTime/"

const search = document.getElementById('searchuser');
const result = document.getElementById('result');

const stream$ = Rx.fromEvent(search, 'input')
    .pipe(
        rxOperators.map(e => e.target.value),
        rxOperators.debounceTime(1000),
        rxOperators.distinctUntilChanged(),
        rxOperators.switchMap(v => axios.get(userTodayURL + v, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })),
        rxOperators.map(response => response.data)
    );


const streamAlldata$ = Rx.fromEvent(search, 'input')
    .pipe(
        rxOperators.map(e => e.target.value),
        rxOperators.debounceTime(1000),
        rxOperators.distinctUntilChanged(),
        rxOperators.switchMap(v => axios.get(userAllTime + v, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })),
        rxOperators.map(response => response.data)
    );

streamAlldata$.subscribe(value => {
    console.log(value);
})

stream$.subscribe(el => {
    console.log(el);
    let titlesString =  '';
    for (const [key, value] of new Map(Object.entries(el.user.title.type))) {
        titlesString += `${key.toString()}: ${value.toString()}` + "\n";
    }
    let editsString = ""
    for (const [key, value] of new Map(Object.entries(el.user.type.type))) {
        editsString += `${key.toString()}: ${value.toString()}` + "\n";
    }
    const html = `
    <p>User: ${el.user.user}</p>
    <p>Total Actions Today: ${el.totalActions}</p>
    <p>Actions: ${editsString}</p>
    <p>Titles: ${titlesString}</p>
    `;
    result.insertAdjacentHTML('beforeend', html)
})
