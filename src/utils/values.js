function values(obj) {
  let res = [];
  for (var key in obj) res.push(obj[key]);
  return res;
}

export default values;
