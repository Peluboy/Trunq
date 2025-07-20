const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, updateDoc, increment } = require('firebase/firestore');

console.log("API redirect.cjs CALLED");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
  console.log("Redirect function triggered for shortCode:", req.query.shortCode);

  const { shortCode } = req.query;

  try {
    const linkDoc = await getDoc(doc(db, "links", shortCode));
    if (!linkDoc.exists()) {
      console.log("Short code not found:", shortCode);
      res.status(404).json({ error: "Link not found" });
      return;
    }
    const { longURL } = linkDoc.data();
    await updateDoc(doc(db, "links", shortCode), {
      totalClicks: increment(1),
    });
    console.log("Redirecting to:", longURL);
    res.writeHead(301, { Location: longURL });
    res.end();
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};