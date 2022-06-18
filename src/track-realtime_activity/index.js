export function filter(o) {
  o.map(function (response) {
    return response
  })

  return o;
}

export function makeDisplayBuffer(size) {
  var buffer = [];
  return function (element) {
    buffer.push(element);
    if (buffer.length > size) {
      var popped = buffer.shift();
      popped.parentNode.removeChild(popped);
    }
  }
}
