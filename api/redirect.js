const admin = require('firebase-admin');
const crypto = require('crypto');
const fetch = require('node-fetch');

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
    const { longURL, totalClicks = 0, expiresAt, passwordHash } = linkDoc.data();
    // Check expiration
    if (expiresAt) {
      const now = new Date();
      const expDate = expiresAt._seconds ? new Date(expiresAt._seconds * 1000) : new Date(expiresAt);
      if (now > expDate) {
        res.statusCode = 410;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Link expired' }));
        return;
      }
    }
    // Password protection
    if (passwordHash) {
      if (req.method === 'GET') {
        res.status(401).json({ passwordRequired: true });
        return;
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { password } = JSON.parse(body);
            const hash = crypto.createHash('sha256').update(password).digest('hex');
            if (hash !== passwordHash) {
              res.status(403).json({ error: 'Incorrect password' });
              return;
            }
            // Geolocation tracking
            let country = null, city = null;
            try {
              const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;
              console.log("IP for geolocation:", ip);
              const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
              const geo = await geoRes.json();
              console.log("Geo response:", geo);
              country = geo.country || null;
              city = geo.city || null;
            } catch {}
            await db.collection("links").doc(shortCode).update({
              totalClicks: totalClicks + 1,
              clickLocation: admin.firestore.FieldValue.arrayUnion({ country, city, timestamp: new Date() })
            });
            res.writeHead(301, { Location: longURL });
            res.end();
          } catch (err) {
            res.status(400).json({ error: 'Invalid request' });
          }
        });
        return;
      }
    } else {
      // Geolocation tracking
      let country = null, city = null;
      try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;
        console.log("IP for geolocation:", ip);
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geo = await geoRes.json();
        console.log("Geo response:", geo);
        country = geo.country || null;
        city = geo.city || null;
      } catch {}
      await db.collection("links").doc(shortCode).update({
        totalClicks: totalClicks + 1,
        clickLocation: admin.firestore.FieldValue.arrayUnion({ country, city, timestamp: new Date() })
      });
      console.log("Redirecting to:", longURL);
      res.writeHead(301, { Location: longURL });
      res.end();
    }
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};