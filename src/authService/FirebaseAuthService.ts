import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup, signOut
} from "firebase/auth";
import {UserData} from "../data/UserData";
import firebaseConfig from "./FirebaseConfig.ts";

// namespace FirebaseAuthService {
    export const serviceInit = () => {
        initializeApp(firebaseConfig);
    }

    export const handleSignInWithEmailAndPassword = async (email: string, password: string): Promise<boolean> => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            // Signed in
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    export const handleSignInWithGoogle = async (): Promise<boolean> => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            await signInWithPopup(auth, provider);
            // Signed in
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    export const handleOnAuthStateChanged = (callback: (user: UserData | null) => void) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            let loginUser: UserData | null;
            if (user) {
                loginUser = {
                    email: user.email || "Login User"
                }
            } else {
                loginUser = null;
            }
            callback(loginUser);
        });
    };

    export const getAccessToken = (): Promise<string> | null => {
        const currentUser = getAuth().currentUser;
        if (!currentUser) {
            return null;
        }
        return currentUser.getIdToken(false);
    }

    export const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }
// }
