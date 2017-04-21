function filterText(text, obj, fields) {
  const textRegex = new RegExp(text, 'i');
  if (text) {
    for (var i = 0; i < fields.length; i++) {
      if (textRegex.test(obj[fields[i]]))
        return true;
    }
    return false;
  } else {
    return true;
  }
};

export default filterText;
