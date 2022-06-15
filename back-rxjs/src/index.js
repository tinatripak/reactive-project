import Rx from 'rx-dom'

var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

var source = Rx.DOM.fromEventSource(url);

source.subscribe(function (e) {
  console.log('Received data: ' + e);
});