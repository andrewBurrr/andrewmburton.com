import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {Project} from "../types/api";
import {collection, getFirestore, onSnapshot} from "firebase/firestore";

interface ProjectsContextProps {
    data: Record<string, Project> | null;
}

const ProjectsContext = createContext<ProjectsContextProps>({
    data: null,
});

const useProjects = () => {
    return useContext(ProjectsContext);
};

interface ProjectsProviderProps {
    children: ReactNode;
}

const ProjectsProvider: FC<ProjectsProviderProps> = ({ children }) => {
    const firestore = getFirestore();
    const collectionRef = collection(firestore, "projects");
    const [data, setData] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const updatedPosts: { [key: string]: any } = {};
            snapshot.docs.forEach((doc) => {
                updatedPosts[doc.id] = doc.data();
            });
            setData(updatedPosts);
        })
        return () => unsubscribe();
    }, []);

    return (
        <ProjectsContext.Provider value={{ data }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export { ProjectsProvider, useProjects };

