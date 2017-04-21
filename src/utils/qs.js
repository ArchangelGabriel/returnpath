function parseQueryString(url) {
  return (url[0] === '?' ? url.slice(1) : url).split('&').reduce((acc, curr) => {
    const [key, val] = curr.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(val);
    return acc;
  }, {});
}

function toQueryString(obj) {
  var qs = '';
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key && obj[key]) {
      if (i === keys.length - 1) qs += `${key}=${obj[key]}`;
      else qs += `${key}=${obj[key]}&`;
    }
  }
  return qs;
}

export {
  parseQueryString,
  toQueryString
};
