import { parseQueryString, toQueryString } from './qs';

function filterHelper({queryString, filterField, targetValue}) {
  let curQs = parseQueryString(queryString);
  let newQs = Object.assign({}, curQs, { [filterField]: targetValue });
  !targetValue && delete newQs[filterField];
  return { search: toQueryString(newQs) };
}

export default filterHelper;
