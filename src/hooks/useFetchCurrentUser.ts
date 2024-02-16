import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface UserData {
    firstname: string;
    lastname: string;
    profession: string;
    imageUrl: string;
}
const useFetchCurrentUser = (uid: string | null): { userData: UserData | null; loading: boolean } => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                if (!uid) {
                    throw new Error('UID is null or undefined.');
                }

                const firestore = getFirestore();
                const userDocRef = doc(firestore, 'users', uid);
                const docSnapshot = await getDoc(userDocRef);

                if (docSnapshot.exists()) {
                    setUserData(docSnapshot.data() as UserData);
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, [uid]);

    return { userData, loading };
};

export { useFetchCurrentUser }