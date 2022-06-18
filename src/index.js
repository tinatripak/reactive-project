import observableEventSource from 'observable-event-source';
import { filter, makeDisplayBuffer } from "./track-realtime_activity/index.js";
import { MongoClient } from 'mongodb';
var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const o = observableEventSource({
  url: url,
  json: true
})

var searchUsers = []
 
console.log('recently changed npm packages...')
const search = document.getElementById('search')

var updateBuffer = makeDisplayBuffer(16);

filter(o).subscribe(response => {
  //console.log(response);
  if (searchUsers.includes(response.user)) {
    var node = document.createTextNode(response.title + '-' + response.user + '\n\n');
    result.prepend(node);
    updateBuffer(node);
  }
})

search.addEventListener('change', (event) => {
  searchUsers = search.value.split('|')
  console.log(searchUsers)
});
