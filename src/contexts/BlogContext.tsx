import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {Post} from "../types/api";
import {collection, getFirestore, onSnapshot} from "firebase/firestore";

interface BlogContextProps {
    data: Record<string, Post> | null;
    // tagCounts: { [tag: string]: number };
}

const BlogContext = createContext<BlogContextProps>({
    data: null,
});

const useBlog = () => {
    return useContext(BlogContext);
};

interface BlogProviderProps {
    children: ReactNode;
}

const BlogProvider: FC<BlogProviderProps> = ({ children }) => {
    const firestore = getFirestore();
    const collectionRef = collection(firestore, "blog");
    const [data, setData] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const updatedPosts: { [key: string]: any } = {};
            snapshot.docs.forEach((doc) => {
                updatedPosts[doc.id] = doc.data();
            });
            setData(updatedPosts);
        })
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BlogContext.Provider value={{ data }}>
            {children}
        </BlogContext.Provider>
    );
}

export { BlogProvider, useBlog };

