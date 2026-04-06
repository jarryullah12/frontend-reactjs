import https from 'https';

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI0MDg2YTczZjY0YTI3MzBiZTY2ODgwM2VkOTg0OWUzOTUyMjkzMjc1NjRkY2U4M2ZjOGE1ZmY2Yzc4ZTA0MjNkZTJjN2UyODgzNjY0ZGExMiIsImlhdCI6MTc3NDI3MDU5NS40MzI1NywibmJmIjoxNzc0MjcwNTk1LjQzMjU3MywiZXhwIjoxNzkwMTIxNjAwLjAxOTgwNiwic3ViIjoiNjcwNjczMCIsInNjb3BlcyI6W119.N1n6FiZin30UvYcj3rN6lpgussek94oJ2ZHhE0GQVjDtGP3hgOJbTvhCKPZbz27lV8KaPdBKc2QEewlUlzrJg2BUD8UgzfRx_7mAW89NwgRQ2DUGwdbSPqmtXnn_aBisaqSu5uwK3NxY9ILX9xUdolLPXkslvXNb7dLyoaukQ5vub53uIUwCOqaXjQKR6Umlo4dNmHnvEkCm_YmqXh8-ZDq7pQlWrzCSEUpMzKnBKdy2w8F4co6dd4YxP-PVSC42e1sBMbaD8QdsBjCF0OmvFpodokPkfS-z4tQLlqUrVuAVhGMdez8nx1HI-MpcueNmjKafEOS3TiiJaQCwzNQz7744GWqVQJzbeFnNbEa2D3dn28yZms8DmZc3EC9EVRDj9-LgoJOxilNAcestiCycurmzGcVtOIyv4e7zZDJEO2ey0IeGQ8OcFMSPtq7DDjgirF2WQckj1ddTT3FqduBge0rC2mQof0MEAsjaV6j93myCoWBOrSTrSDegW7N1-HwwieHyqc5eAd0Wma1Toq0Lhz9tM1yb4LtgvJv1ziFjmBgyEmvYUkA-72-EMVFk5JqCitmSmvZFIL902CPtv2oGSRyCgcnaJr_7Ie0ktsKfcdOvCQ2ZUdiBihAOFAC2CMM1nS62aenq9_BAKDXWGKxkk0EFR_XO-jtigwVV8TcQEg8';

const options = {
  hostname: 'api.lemonsqueezy.com',
  path: '/v1/variants',
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.api+json',
    'Authorization': `Bearer ${apiKey}`
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
