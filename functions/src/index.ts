/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { firestore } from "firebase-functions";
admin.initializeApp();

// const functions = require("firebase-functions");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

export const linkCreated = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onCreate((snapshot, context) => {
    const userUid = context.params.userUid;
    const linkID = context.params.linkID;
    const longURL = snapshot.data().longURL;
    const shortCode = snapshot.data().shortCode;
    const customURL = snapshot.data().customURL;

    console.log(`New link created with ID ${linkID} and longURL ${longURL}`);

    return admin.firestore().doc(`links/${shortCode}`).set({
      userUid,
      linkID,
      longURL,
      customURL,
    });
    // return Promise.resolve();
  });

export const linkDeleted = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onDelete((snapshot, context) => {
    const shortCode = snapshot.data().shortCode;

    return admin.firestore().doc(`links/${shortCode}`).delete();
  });
