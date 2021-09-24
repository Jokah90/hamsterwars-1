const admin = require("firebase-admin");
let serviceAccount;
if (process.env.SERVICE_KEY) {
  serviceAccount = JSON.parse(process.env.SERVICE_KEY);
} else {
  serviceAccount = require("./secrets/firebase-key.json");
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
module.exports = { db };
