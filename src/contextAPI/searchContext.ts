// SearchContext.js
import React from 'react';

interface SearchContextType {
    spots: any;
    setSpots: React.Dispatch<React.SetStateAction<any>>;
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);


export default SearchContext;
