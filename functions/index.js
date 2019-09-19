const functions = require('firebase-functions')
const express = require('express')
const app = express()
const admin = require('firebase-admin')
// const cors = require('cors')({origin: true});

var serviceAccount = require("./motivation-switch-firebase-adminsdk-xq1qk-40c433b787.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://motivation-switch.firebaseio.com",
  storageBucket: "motivation-switch.appspot.com"
});

// 参考にしたQiitaはこう
// admin.initializeApp(functions.config().firebase)

//ストレージにアクセス
let bucket = admin.storage().bucket()
const db = admin.firestore()

let projectId = 'motivation-switch'
let bucketName = 'motivation-switch.appspot.com'
let keyFilename = './motivation-switch-firebase-adminsdk-xq1qk-40c433b787.json'

// URLを生成する関数
async function generateSignedUrl (bucketName, filename) {

  console.log('generateSignedUrlなう')
  const {Storage} = require('@google-cloud/storage');
  console.log('@google-cloud/storageできたよ')
  const storage = new Storage({projectId,keyFilename});
  console.log('strageNewできたよ')
  console.log(storage)
  const options = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
  }
  console.log(options)

  // Get a signed URL for the file
  console.log(bucketName)
  console.log(filename)
  console.log(options)
  const [url] = await storage.bucket(bucketName).file(filename).getSignedUrl(options)
  console.log('urlの先まで行ったよ')
  console.log(url)
  console.log(`The signed url for ${filename} is ${url}.`)
  // [END storage_generate_signed_url]
  return url
}

const url = 'https://motivation-switch.com/'
const site_name = 'モチベーションスイッチ'
const title = 'モチベーションスイッチ'
const meta_description = '気分や好みに合わせた名言が届いて、モチベーションを上げてくれるサービスです。'
const og_description = '名言がモチベーションを上げてくれるサービス'
const og_image_width = 1200
const og_image_height = 630
const tw_description = '名言がモチベーションを上げてくれるサービスです。'
const tw_site = ''
const tw_creator = ''

const genHtml = (url) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content=${meta_description}>
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content=${url}>
    <meta property="og:title" content=${title}>
    <meta property="og:site_name" content=${site_name}>
    <meta property="og:description" content=${og_description}>
    <meta property="og:image" content=${url}>
    <meta property="og:image:width" content=${og_image_width}>
    <meta property="og:image:height" content=${og_image_height}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content=${title}>
    <meta name="twitter:description" content=${tw_description}>
    <meta name="twitter:image" content=${url}>
    <meta name="twitter:site" content=${tw_site}>
    <meta name="twitter:creator" content=${tw_creator}>
  </head>
  <body>
  テスト
    <script>
      //クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
      // location.href = '/';
    </script>
  </body>
</html>`

app.get('/:id', async (req, res) => {

  // cors(req, res, async() => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
    // res.set('Access-Control-Allow-Headers', 'Content-Type');

    // res.json({ data: items });
    const doc = await db.collection('cards').doc(req.params.id).get()
    // console.log('doc')
    // console.log(doc)
    // console.log('req.params.id')
    // console.log(req.params.id)
    if (!doc.exists) {
      console.log('ないよ！')
      console.log(`${req.params.id} not exist`)
      res.status(404).send('404 Not Exist')
    } else {
      console.log('あったよ！')
      console.log(`images/${req.params.id}.png`)
      const url = await generateSignedUrl(bucketName, `images/${req.params.id}.png`)
      console.log(url)
      const html = genHtml(url)
      res.set('cache-control', 'public, max-age=3600');
      res.send(html)
    }
  // });
})
exports.s = functions.https.onRequest(app)
