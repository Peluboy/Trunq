const admin = require('firebase-admin');

if (!admin.apps.length) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // On Vercel: use the JSON string from the environment variable
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
  } else {
    // Local: use GOOGLE_APPLICATION_CREDENTIALS file
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
  }
}
const db = admin.firestore();

const reservedRoutes = [
  "dashboard",
  "home",
  "about",
  "privacy-policy",
  "reset-password",
  "forgot-password",
  // add any other app routes here
];

module.exports = async (req, res) => {
  const { shortCode } = req.query;
  console.log("Admin SDK redirect function triggered for shortCode:", shortCode);
  // Prevent redirect for reserved app routes
  if (reservedRoutes.includes(shortCode)) {
    res.status(404).json({ error: "Not a short URL" });
    return;
  }
  try {
    const linkDoc = await db.collection("links").doc(shortCode).get();
    if (!linkDoc.exists) {
      console.log("Short code not found:", shortCode);
      res.status(404).json({ error: "Link not found" });
      return;
    }
    const { longURL, totalClicks = 0 } = linkDoc.data();
    await db.collection("links").doc(shortCode).update({
      totalClicks: totalClicks + 1,
    });
    console.log("Redirecting to:", longURL);
    res.writeHead(301, { Location: longURL });
    res.end();
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};