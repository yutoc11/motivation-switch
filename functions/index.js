const functions = require('firebase-functions');

exports.bigben = functions.https.onRequest((req, res) => {

  // const SITEURL = "〇〇〇〇〇"
  // const TITLE = "〇〇〇〇〇"
  // const DESCRIPTION = "〇〇〇〇〇"
  // const IMAGE = `https://firebasestorage.googleapis.com/〇〇〇〇〇〇〇`
  const ogpImage = 'https://firebasestorage.googleapis.com/v0/b/motivation-switch.appspot.com/o/test.png?alt=media&token=e4a0e1ce-92f4-4463-b94b-8580808f01b7`

  res.status(200).send(`<!doctype html>
    <head>
      <meta property="og:image" content="${ogpImage}">
      <meta name="twitter:image" content="${ogpImage}">
    </head>
    <body>
      ${'BONG '.repeat(3)}
    </body>
  </html>`);
});
