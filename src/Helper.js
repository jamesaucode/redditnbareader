
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

// Note: pass in the UTC time to make the correct time string.
const turnEpochToTime = (date) => {
  var epoch = new Date(date);
  var time = new Date(epoch.getTime());
  var min = '';
  if (time.getMinutes() < 10) {
    min = "0" + time.getMinutes();
  } else {
    min = time.getMinutes();
  }
  return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + '\n' + time.getHours() + ":" + min;
}

const turnToDate = (date) => {
  var epoch = new Date();
  
}

const makeDateAndYear = (seconds) => {
  var date = new Date(seconds);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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

export { cleanString, turnEpoch, turnEpochToTime, capitalizeFirstLetter, makeDate, decodeHtml, makeDateAndYear }

