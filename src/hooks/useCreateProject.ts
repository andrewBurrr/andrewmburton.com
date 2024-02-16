import {useState} from "react";
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "apis/firebase";
import {useAuth} from "contexts/AuthContext";
import {Project} from "types/api";

const useCreateProject = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFileAndGetURL = async (file: File | undefined): Promise<string | null> => {
        if (!file) return null;

        const fileRef = ref(storage, file.name);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
    };

    const publishProject = async ( project: Project ) => {
        if (!user) {
            setError('User is not authenticated.');
            return
        }

        try {
            setLoading(true);

            const thumbnailURL = await uploadFileAndGetURL(project.thumbnail);
            const reportURL = await uploadFileAndGetURL(project.report);

            const firestore = getFirestore();

            await addDoc(collection(firestore, 'projects'), {
                title: project.title,
                thumbnailURL: thumbnailURL,
                description: project.description,
                content: project.content,
                tags: project.tags,
                repository: project.repository,
                video: project.video,
                reportURL: reportURL,
                authorId: user.uid,
                createdAt: new Date(),
            });

            setError(null);
        } catch (error) {
            console.error('Error publishing project: ', error);
            setError('Error publishing project. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return { publishProject, loading, error };
}

export { useCreateProject };