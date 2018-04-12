'use strict';

const local = !module.parent; //will be 'true' if this file is being run from =node
const express = require('express') //import the express.js library
const app = express() //create a variable app which is a new Express app
app.get('/', (req, res) => res.send('Hello world!')) //when someone requests the root '/' url (normally by visiting www.our-new-website.com/), send 'hello world' back
const port = process.env.PORT || 3000 //if the node app was started with an environment variable defined called PORT, use that port number, otherwise 3000
if(local){ //no need to 'start the app' if we're running on Lambda
  app.listen(port, () => //start the app!
    console.log(`Server is listening on port ${port}.`) //console log a message when the app is started and listening
  )
}

module.exports = function handler (event, context, callback) {
  console.log(event);
  /* Transform Api Gateway message to request message for hapi */
  let request = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    payload: event.body,
    remoteAddress: event.ip
  };

  return server.initialize()
    .then(() => app.inject(request))
    .then((response) => {
      console.log(response);
      /* Transform hapi response to Api Gateway response message */
      callback(null, {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.payload
      });
    });
};
