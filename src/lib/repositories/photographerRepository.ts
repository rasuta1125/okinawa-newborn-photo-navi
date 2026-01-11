// Firestore repository for photographer CRUD operations
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    DocumentData,
    QueryConstraint,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import { Photographer, ApprovalStatus } from '@/lib/types';

const PHOTOGRAPHERS_COLLECTION = 'photographers';

// Convert Firestore Timestamp to Date
function convertTimestamps(data: DocumentData): Photographer {
    return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Photographer;
}

// Get all photographers (approved and published only)
export async function getAllPhotographers(): Promise<Photographer[]> {
    const db = getFirebaseDb();
    const q = query(
        collection(db, PHOTOGRAPHERS_COLLECTION),
        where('approvalStatus', '==', 'Approved'),
        where('isPublished', '==', true)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = convertTimestamps(doc.data());
        return { ...data, id: doc.id };
    });
}

// Get photographer by ID
export async function getPhotographerById(id: string): Promise<Photographer | null> {
    const db = getFirebaseDb();
    const docRef = doc(db, PHOTOGRAPHERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    const data = convertTimestamps(docSnap.data());
    return { ...data, id: docSnap.id };
}

// Get all photographers for admin (including pending and unpublished)
export async function getAllPhotographersForAdmin(): Promise<Photographer[]> {
    const db = getFirebaseDb();
    const snapshot = await getDocs(collection(db, PHOTOGRAPHERS_COLLECTION));
    return snapshot.docs.map((doc) => {
        const data = convertTimestamps(doc.data());
        return { ...data, id: doc.id };
    });
}

// Get pending photographers
export async function getPendingPhotographers(): Promise<Photographer[]> {
    const db = getFirebaseDb();
    const q = query(
        collection(db, PHOTOGRAPHERS_COLLECTION),
        where('approvalStatus', '==', 'Pending')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = convertTimestamps(doc.data());
        return { ...data, id: doc.id };
    });
}

// Create new photographer
export async function createPhotographer(
    data: Omit<Photographer, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    const db = getFirebaseDb();
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, PHOTOGRAPHERS_COLLECTION), {
        ...data,
        createdAt: now,
        updatedAt: now,
    });
    return docRef.id;
}

// Update photographer
export async function updatePhotographer(
    id: string,
    data: Partial<Photographer>
): Promise<void> {
    const db = getFirebaseDb();
    const docRef = doc(db, PHOTOGRAPHERS_COLLECTION, id);
    await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

// Delete photographer
export async function deletePhotographer(id: string): Promise<void> {
    const db = getFirebaseDb();
    const docRef = doc(db, PHOTOGRAPHERS_COLLECTION, id);
    await deleteDoc(docRef);
}

// Approve photographer
export async function approvePhotographer(id: string): Promise<void> {
    await updatePhotographer(id, {
        approvalStatus: 'Approved' as ApprovalStatus,
        isPublished: true,
    });
}

// Reject photographer
export async function rejectPhotographer(id: string): Promise<void> {
    await updatePhotographer(id, {
        approvalStatus: 'Rejected' as ApprovalStatus,
    });
}

// Toggle publish status
export async function togglePublishStatus(id: string, isPublished: boolean): Promise<void> {
    await updatePhotographer(id, { isPublished });
}

// Search photographers with filters
export async function searchPhotographers(filters: {
    area?: string;
    options?: string[];
    photographerType?: 'Studio' | 'Freelance';
}): Promise<Photographer[]> {
    const db = getFirebaseDb();
    const constraints: QueryConstraint[] = [
        where('approvalStatus', '==', 'Approved'),
        where('isPublished', '==', true),
    ];

    if (filters.area) {
        constraints.push(where('areas', 'array-contains', filters.area));
    }

    if (filters.photographerType) {
        constraints.push(where('photographerType', '==', filters.photographerType));
    }

    const q = query(collection(db, PHOTOGRAPHERS_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);

    let results = snapshot.docs.map((doc) => {
        const data = convertTimestamps(doc.data());
        return { ...data, id: doc.id };
    });

    // Filter by options (client-side filtering for array-contains-any alternative)
    if (filters.options && filters.options.length > 0) {
        results = results.filter((p) =>
            filters.options!.some((option) => p.options.includes(option))
        );
    }

    return results;
}
