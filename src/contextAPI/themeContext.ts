// ThemeContext.js
import React, { Dispatch, SetStateAction } from 'react';

interface ThemeContextType {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
