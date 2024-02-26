// SearchContext.js

// Import the necessary dependencies
import React from 'react';

// Define the type for the search context
interface SearchContextType {
    spots: any;
    setSpots: React.Dispatch<React.SetStateAction<any>>;
}

// Create a context for the search functionality
const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

// Export the search context
export default SearchContext;
