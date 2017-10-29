const functions = require('firebase-functions');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.checkIfUserHasAccess = functions.auth.user().onCreate(event => {
  // ...
  const user = event.data; // The Firebase user.
  const email = user.email; // The email of the user.
  // const displayName = user.displayName; // The display name of the user.
  if (email.match(/@redeye.se$/)) {
    // registerUser(user);
  }
});

