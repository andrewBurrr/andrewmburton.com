import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore, limit, orderBy, query, where} from 'firebase/firestore';

interface Options {
    filterField?: string;
    filterValue?: any;
    order?: string;
    limit?: number;
}

interface FetchDataResult<T> {
    data: Record<string, T> | null;
    loading: boolean;
    error: string | null;
}

const useFetchCollection = <T>(table: string, options: Options): FetchDataResult<T> => {
    const firestore = getFirestore();
    const tableRef = collection(firestore, table);
    const [data, setData] = useState<Record<string, T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let queryCollection = query(tableRef);
                if (options.filterField && options.filterValue) queryCollection = query(queryCollection, where(options.filterField, '==', options.filterValue));
                if (options.limit) queryCollection = query(queryCollection, limit(options.limit));
                if (options.order) queryCollection = query(queryCollection, orderBy(options.order));

                const querySnapshot = await getDocs(queryCollection);
                const queryData: Record<string, T> = {};

                querySnapshot.forEach((doc) => {
                    queryData[doc.id] = doc.data() as T;
                });
                setData(queryData);
                setLoading(false);
                // If you want to store data in state, update the state here
            } catch (error) {
                setError(`Error Fetching from collection [${table}]: ${error}`);
                setLoading(false);
            }
        };
        console.log("fetching");
        fetchData();
    }, []);

    return { data, loading, error };
}

export { useFetchCollection };