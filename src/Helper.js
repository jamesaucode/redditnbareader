
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

const turnRegex = (postTitle, home, visitor) => {
  // console.log(postTitle)
  var homeTeamIndex = postTitle.toLowerCase().indexOf(home.toLowerCase());
  var visitorTeamIndex = postTitle.toLowerCase().indexOf(visitor.toLowerCase());
  var str = postTitle.replace(/ /g, '').replace(/\(\d{1,2}\-\d{1,2}\)/gm, '');
  var regStr = str.match(/(\d{2,3})(\-\d{2,3})/);
  // first index is homescore, second index is awayscorer
  var scoreArray = [];

  if (regStr) {
    if (homeTeamIndex > visitorTeamIndex) {
      scoreArray[0] = regStr[2].replace('-', '');
      scoreArray[1] = regStr[1];
    } else {
      scoreArray[0] = regStr[1];
      scoreArray[1] = regStr[2].replace('-', '');
    }
    return scoreArray;
  }
}

export { cleanString, turnEpoch, turnEpochToTime, turnRegex, capitalizeFirstLetter, makeDate, decodeHtml, makeDateAndYear }

