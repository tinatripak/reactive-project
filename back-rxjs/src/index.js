import observableEventSource from 'observable-event-source';

var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const o = observableEventSource({
  url: url,
  json: true
})
 
console.log('recently changed npm packages...')

var updateBuffer = makeDisplayBuffer(10);

myMap(o).subscribe(response => {
    console.log(response)
    const html = `
      <div style="float: left; margin-left: 10px;">${response.$schema}</div>
      <div style="float: left; margin-left: 10px;">${response.id}</div>
      <div style="float: left; margin-left: 10px;">${response.user}</div>
    `
    var node = document.createTextNode(response.comment + '\n\n');
    result.prepend(node);
    updateBuffer(node);
  })

function myMap(o) {
    o.map(function (response) {
        return response
      })

    return o;
}

function makeDisplayBuffer(size) {
    var buffer = [];
    return function (element) {
      buffer.push(element);
      if (buffer.length > size) {
        var popped = buffer.shift();
        popped.parentNode.removeChild(popped);
      }
    }
  }