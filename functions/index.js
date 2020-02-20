const functions = require('firebase-functions');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage(); // creates a client from a google service account key
const os = require('os');
const path = require('path');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

exports.onFileChange = functions.storage.object().onFinalize(event => {
  const object = event.metadata;
  const bucket = object.bucket;
  const contentType = object.contentType;
  const filePath = object.name;
  console.log('Change in file detected, function execution has started');

  if (path.basename(filePath).startsWith('renamed-')) {
    console.log('Already renamed current file');
    return true;
  }

  const mainBucket = storage.bucket(bucket);
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return mainBucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    return mainBucket.upload(tempFilePath, {
      destination: 'renamed-' + path.basename(filePath),
      metadata: metadata
    })
  });
});



