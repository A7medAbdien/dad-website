"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lang } from '@/app/data/types';

// Define the languages you support

interface LangContextProps {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextProps | undefined>(undefined);

export const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Lang>('ar');

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = (): LangContextProps => {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error('useLang must be used within a LangProvider');
    }
    return context;
};
