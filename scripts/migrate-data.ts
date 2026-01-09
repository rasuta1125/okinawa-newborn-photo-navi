// Script to migrate mock data to Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { photographers, plans, blogs } from '../src/lib/mockData';

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

async function migratePhotographers() {
    console.log('📸 Starting photographer migration...');

    for (const photographer of photographers) {
        try {
            // Remove the id field and convert dates to Firestore Timestamps
            const { id, createdAt, updatedAt, ...photographerData } = photographer;

            const docData = {
                ...photographerData,
                // Convert -1 to 999 (unlimited)
                maxGalleryImages: photographer.maxGalleryImages === -1 ? 999 : photographer.maxGalleryImages,
                createdAt: Timestamp.fromDate(createdAt),
                updatedAt: Timestamp.fromDate(updatedAt),
            };

            console.log(`Attempting to add: ${photographer.name}`);
            const docRef = await addDoc(collection(db, 'photographers'), docData);
            console.log(`✅ Added photographer: ${photographer.name} (ID: ${docRef.id})`);
        } catch (error: any) {
            console.error(`❌ Error adding photographer ${photographer.name}:`);
            console.error('Error message:', error.message);
            console.error('Error code:', error.code);
            console.error('Full error:', JSON.stringify(error, null, 2));
        }
    }
}

async function migratePlans() {
    console.log('\n💰 Starting plans migration...');

    for (const plan of plans) {
        try {
            const { id, ...planData } = plan;

            const docRef = await addDoc(collection(db, 'plans'), planData);
            console.log(`✅ Added plan: ${plan.title} (ID: ${docRef.id})`);
        } catch (error) {
            console.error(`❌ Error adding plan ${plan.title}:`, error);
        }
    }
}

async function migrateBlogs() {
    console.log('\n📝 Starting blogs migration...');

    for (const blog of blogs) {
        try {
            const { id, publishedAt, ...blogData } = blog;

            const docData = {
                ...blogData,
                publishedAt: Timestamp.fromDate(publishedAt),
            };

            const docRef = await addDoc(collection(db, 'blogs'), docData);
            console.log(`✅ Added blog: ${blog.title} (ID: ${docRef.id})`);
        } catch (error) {
            console.error(`❌ Error adding blog ${blog.title}:`, error);
        }
    }
}

async function main() {
    console.log('🚀 Starting Firestore data migration...\n');

    try {
        await migratePhotographers();
        await migratePlans();
        await migrateBlogs();

        console.log('\n✨ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

main();
