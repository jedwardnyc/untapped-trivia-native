const io = require('socket.io-client');
const socket = io('https://untapped-trivia.herokuapp.com/')

socket.on('connect', () => {
  console.log('socket native: connected!')
  socket.on('team-name', (name) => {
    console.log(`socket client: team ${name} has signed up!`)
  })
});

module.exports = socket;
