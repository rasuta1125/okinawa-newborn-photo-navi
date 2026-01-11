// Firebase configuration and initialization
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

// Lazy initialization function
const initializeFirebase = () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase is not configured. Please set environment variables.');
    return;
  }

  // Only initialize if not already initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
};

// Initialize only if we're in the browser or if Firebase is configured
if (typeof window !== 'undefined' && isFirebaseConfigured()) {
  initializeFirebase();
}

// Getter functions that ensure Firebase is initialized
export const getFirebaseApp = (): FirebaseApp => {
  if (!app && isFirebaseConfigured()) {
    initializeFirebase();
  }
  if (!app) {
    throw new Error('Firebase is not configured. Please set environment variables.');
  }
  return app;
};

export const getFirebaseAuth = (): Auth => {
  if (!auth && isFirebaseConfigured()) {
    initializeFirebase();
  }
  if (!auth) {
    throw new Error('Firebase Auth is not configured.');
  }
  return auth;
};

export const getFirebaseDb = (): Firestore => {
  if (!db && isFirebaseConfigured()) {
    initializeFirebase();
  }
  if (!db) {
    throw new Error('Firebase Firestore is not configured.');
  }
  return db;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage && isFirebaseConfigured()) {
    initializeFirebase();
  }
  if (!storage) {
    throw new Error('Firebase Storage is not configured.');
  }
  return storage;
};

// Legacy exports for backward compatibility (will throw error if not configured)
export { app, auth, db, storage };
