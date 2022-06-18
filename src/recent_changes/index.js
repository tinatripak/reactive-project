import observableEventSource from 'observable-event-source';

var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const o = observableEventSource({
  url: url,
  json: true
})
 
console.log('recently changed npm packages...')

var updateBuffer = makeDisplayBuffer(16);

myMap(o).subscribe(response => {
  var node = document.createTextNode(response.title + '-' + response.user + '\n\n');
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
