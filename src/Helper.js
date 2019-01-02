
const chainFetch = () => {
    var data = [];
    var result = fetch('https://www.reddit.com/r/nba.json?limit=100').then(response => {
      return response.json();
    }).then(json => {
      var after = json.data.after;
      console.log(after);
        data = json.data.children
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`)
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .then(response => response.json())
    .then(json => {
        data = this.state.data.concat(json.data.children)
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
    .catch(err => console.log('Request failed' + err))
    return data
}

const makeMatchString = (homeTeam, awayTeam) => {
  return homeTeam + " vs " + awayTeam 
}

const cleanString = (str) => {
  return str.toLowerCase().replace(/ /g, '')
}

const turnEpoch = (date) => {
  var epoch = new Date(date)
  return epoch.getTime();
}

export { chainFetch, makeMatchString, cleanString, turnEpoch }

