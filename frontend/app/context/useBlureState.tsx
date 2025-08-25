import React, { createContext, useContext, useState } from 'react';

// Define a type for the blur state
type BlurState = {
    isBlurred: boolean;
    setBlurred: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create a context for the blur state
const BlurContext = createContext<BlurState | undefined>(undefined);

// Define a custom hook to access blur state
export const useBlurState = () => {
    const context = useContext(BlurContext);
    if (!context) {
        throw new Error('useBlurState must be used within a BlurProvider');
    }
    return context;
};

// Provider component to wrap your application and manage blur state
export const BlurProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isBlurred, setBlurred] = useState<boolean>(false);

    return (
        <BlurContext.Provider value={{ isBlurred, setBlurred }}>
            {children}
        </BlurContext.Provider >
    );
};
