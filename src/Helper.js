
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const cleanString = (str) => {
  return str.toLowerCase().replace(/ /g, '')
}

const turnEpoch = (date) => {
  var epoch = new Date(date)
  return epoch.getTime();
}

const makeDate = (seconds) => {
  var date = new Date(seconds * 1000);
  var dateString = date.toLocaleString();
  return dateString;
}

const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export { cleanString, turnEpoch, capitalizeFirstLetter, makeDate, decodeHtml }

