import {useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../apis/firebase";
import {Lead, Post} from "../types/api";
import {addDoc, collection, getFirestore} from "firebase/firestore";

const useCreateLead = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendLead = async ( lead: Lead ) => {
        try {
            setLoading(true);

            const firestore = getFirestore();

            await addDoc(collection(firestore, "leads"), {
                name: lead.name,
                inquiry: lead.inquiry,
                email: lead.email,
                createdAt: new Date(),
            });

            setError(null);
        } catch (error) {
            setError('Error creating lead. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return { sendLead, loading, error }
};

export { useCreateLead };