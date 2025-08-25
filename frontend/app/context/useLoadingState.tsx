import React, { createContext, useContext, useState } from 'react';

// Define a type for the Loading state
type LoadingState = {
    isGLoading: boolean;
    setGLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create a context for the Loading state
const LoadingContext = createContext<LoadingState | undefined>(undefined);

// Define a custom hook to access Loading state
export const useLoadingState = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoadingState must be used within a LoadingProvider');
    }
    return context;
};

// Provider component to wrap your application and manage Loading state
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isGLoading, setGLoading] = useState<boolean>(true);

    return (
        <LoadingContext.Provider value={{ isGLoading, setGLoading }}>
            {children}
        </LoadingContext.Provider >
    );
};
