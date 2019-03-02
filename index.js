const https = require('https');

const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
);

const options = {
  hostname: 'accounts.spotify.com',
  path: '/api/token',
  port: 443,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + authString,
  },
};

module.exports.handler = (event, ctx, cb) => {
  const req = https.request(options, res => {
    res.setEncoding('utf-8');
    res.on('data', body => {
      cb(null, {
        statusCode: 200,
        body,
      });
    });
  });
  req.on('error', err => cb(err));
  req.write('grant_type=client_credentials');
  req.end();
};
