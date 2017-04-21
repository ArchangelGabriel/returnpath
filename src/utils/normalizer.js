const NOT_ARRAY_ERROR = 'First argument is not of type array.';
const KEY_NOT_PRESENT = 'Key does not exist in one of the item in the list.'

function normalizer(list, property) {
  if (!Array.isArray(list)) throw new Error(NOT_ARRAY_ERROR);
  let obj = {};
  for (var i = 0; i < list.length; i++) {
    var key = list[i][property], val = list[i];
    if (!key) throw new Error(KEY_NOT_PRESENT);
    obj[key] = val;
  }
  return obj;
}

export default normalizer;
