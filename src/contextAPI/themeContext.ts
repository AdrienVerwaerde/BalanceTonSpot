// Importing necessary dependencies from React
import React, { Dispatch, SetStateAction } from 'react';

// Defining the type for the theme context
interface ThemeContextType {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

// Creating the theme context using React's createContext function
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// Exporting the theme context as the default export
export default ThemeContext;
