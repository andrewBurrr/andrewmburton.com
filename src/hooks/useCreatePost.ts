import {useState} from "react";
import {useAuth} from "contexts/AuthContext";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../apis/firebase";
import {Post} from "../types/api";
import {addDoc, collection, getFirestore} from "firebase/firestore";

const useCreatePost = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const uploadFileAndGetURL = async (file: File | undefined): Promise<string | null> => {
        if (!file) return null;

        const fileRef = ref(storage, file.name);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
    };

    const publishPost = async ( post: Post) => {
        if (!user) {
            setError('User is not authenticated.');
            return
        }

        try {
            setLoading(true);

            const thumbnailURL = await uploadFileAndGetURL(post.thumbnail);
            const firestore = getFirestore();

            await addDoc(collection(firestore, 'blog'), {
                title: post.title,
                thumbnailURL: thumbnailURL,
                description: post.description,
                content: post.content,
                tags: post.tags,
                authorId: user.uid,
                createdAt: new Date(),
            });

            setError(null);
        } catch (error) {
            setError('Error publishing post. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return { publishPost, loading, error };
}

export { useCreatePost };