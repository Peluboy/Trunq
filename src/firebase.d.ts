import firebase from "firebase/app";

declare module "firebase/app" {
  interface User {
    updateProfile(profile: { displayName?: string }): Promise<void>;
  }
}
