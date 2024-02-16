import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { auth } from 'apis/firebase';
import { User } from "firebase/auth";


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
});

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };