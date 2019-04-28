import asyncHandler from 'express-async-handler';
var request = require("request");

var options = {
    method: 'POST',
    url: process.env.TEST_ACCESS_URL,
    headers: { 'content-type': 'application/json' },
    body:
    {
        grant_type: process.env.TEST_ACCESS_GRANT_TYPE,
        client_id: process.env.TEST_ACCESS_CLIENT_ID,
        client_secret: process.env.TEST_ACCESS_CLIENT_SECRET,
        audience: process.env.TEST_ACCESS_AUDIENCE
    },
    json: true
};

exports.getTestToken = asyncHandler(async (callback) => {
    console.log(`getTestToken starts`);
    await request(options, callback);
    console.log(`getTestToken is done` );
});

export default this;


