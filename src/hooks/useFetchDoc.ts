import {useEffect, useState} from "react";
import {doc, getDoc, getFirestore} from 'firebase/firestore';


interface FetchDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const useFetchDoc = <T>(table: string, docId: string): FetchDataResult<T> => {
    const firestore = getFirestore();
    const docRef = doc(firestore, table, docId);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setData(docSnapshot.data() as T);
                    setLoading(false);
                } else {
                    setError(`No document matching id ${docId}`);
                    setLoading(false);
                }
                // If you want to store data in state, update the state here
            } catch (error) {
                setError(`Error fetching from collection [${table}]: ${error}`);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}

export { useFetchDoc };