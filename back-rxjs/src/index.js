import { EMPTY, fromEvent, Observable } from 'rxjs'
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter, subscribeOn } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import axios from 'axios'

const url = 'https://api.github.com/search/users?q=RomanPalamarhuk'
const wikiUrl = 'https://stream.wikimedia.org/v2/stream/recentchange'

const recent_changes$ = new Observable((observer) => {
  axios.get(url).
    then((response) => {
      observer.next(response.data);
      observer.complete();
    })
}).pipe( 
  debounceTime(1000),
  distinctUntilChanged())

recent_changes$.subscribe((data) => {
  console.log('---');
  console.log(data);
})

const myfunc = async () =>{
  const response = await axios.get(url);
  console.log("SSSSSSSSSSSSSSSSSSSSS");
  console.log(response.data)
}
myfunc()

//const search = document.getElementById('search')
//const result = document.getElementById('result')

// const stream$ = fromEvent(search, 'input')
//   .pipe(
//     map(e => e.target.value),
//     debounceTime(1000),
//     distinctUntilChanged(),
//     tap(() => result.innerHTML = ''),
//     filter(v => v.trim()),
//     switchMap(v => ajax.getJSON(url + v).pipe(
//       catchError(err => EMPTY)
//     )),
//     map(response => response.items),
//     mergeMap(items => items)
//   )


// stream$.subscribe(user => {
//   console.log(user)
//   if(true && false){
//   const html = `
//     <div class="card">
//       <div class="card-image">
//         <img src="${user.avatar_url}" />
//         <span class="card-title">${user.login}</span>
//       </div>
//       <div class="card-action">
//         <a href="${user.html_url}" target="_blank">Открыть github</a>
//       </div>
//     </div>
//   `
//   result.insertAdjacentHTML('beforeend', html)
//   }
//})