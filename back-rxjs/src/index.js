import observableEventSource from 'observable-event-source';

var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const o = observableEventSource({
  url: url,
  json: true
})
 
console.log('recently changed npm packages...')

myMap(o).subscribe(response => {
    console.log(response)
    const html = `
      <div style="float: left; margin-left: 10px;">${response.$schema}</div>
      <div style="float: left; margin-left: 10px;">${response.id}</div>
      <div style="float: left; margin-left: 10px;">${response.user}</div>
    `
    result.insertAdjacentHTML('beforeend', html)
  })

function myMap(o) {
    o.map(function (response) {
        return response
      })

    return o;
}