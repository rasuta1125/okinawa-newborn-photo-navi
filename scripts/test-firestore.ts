// Simplified script to test Firestore connection
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestore() {
    console.log('🧪 Testing Firestore connection...\n');

    try {
        // Test with a simple document
        const testData = {
            name: 'Test Photographer',
            photographerType: 'Studio',
            membershipRank: 'Free',
            areas: ['那覇市'],
            options: ['ニューボーン'],
            handprintOption: false,
            description: 'Test description',
            email: 'test@example.com',
            phone: '098-123-4567',
            approvalStatus: 'Approved',
            isPublished: true,
            maxGalleryImages: 5,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        console.log('Adding test document...');
        const docRef = await addDoc(collection(db, 'photographers'), testData);
        console.log('✅ Success! Document ID:', docRef.id);

        process.exit(0);
    } catch (error: any) {
        console.error('❌ Error:', error.message);
        console.error('Code:', error.code);
        process.exit(1);
    }
}

testFirestore();
