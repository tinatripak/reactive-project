const observableEventSource =  require('observable-event-source');

function initialize(params) {

    var url = 'https://stream.wikimedia.org/v2/stream/recentchange';

    const o = observableEventSource({
        url: url,
        json: true
    })

    var searchUsers = []
    
    console.log('recently changed npm packages...')
    const search = document.getElementById('search')

    var updateBuffer = makeDisplayBuffer(11);

    filter(o).subscribe(response => {
        if (searchUsers.length == 0 || searchUsers.includes(response.user)) {
          var node = document.createTextNode(response.title + '-' + response.user + '\n\n');
          result.prepend(node);
          updateBuffer(node);
        }
    })
      
    search.addEventListener('change', (event) => {
        searchUsers = search.value.split('|')
        while (result.firstChild) {
            result.removeChild(result.lastChild);
        }
        updateBuffer = makeDisplayBuffer(11);
    });

    function filter(o) {
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

}

module.exports = {
    init: initialize
}


