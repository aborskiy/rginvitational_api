var request = require("request");

var options = { method: 'POST',
  url: process.env.TEST_ACCESS_URL,
  headers: { 'content-type': 'application/json' },
  body: 
   { grant_type: process.env.TEST_ACCESS_GRANT_TYPE,
     client_id: process.env.TEST_ACCESS_CLIENT_ID,
     client_secret: process.env.TEST_ACCESS_CLIENT_SECRET,
     audience: process.env.TEST_ACCESS_AUDIENCE },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});