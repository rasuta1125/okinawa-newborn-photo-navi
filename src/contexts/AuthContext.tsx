'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    UserCredential,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const auth = getFirebaseAuth();
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.warn('Firebase Auth is not configured:', error);
            setLoading(false);
            return () => { };
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        const auth = getFirebaseAuth();
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        const auth = getFirebaseAuth();
        return firebaseSignOut(auth);
    };

    // 管理者判定（実際のプロダクションではFirestore Custom Claimsを使用）
    const isAdmin = user?.email === 'yuto_sakaguchi@aimable00.com' || false;

    const value = {
        user,
        loading,
        signIn,
        signOut,
        isAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
