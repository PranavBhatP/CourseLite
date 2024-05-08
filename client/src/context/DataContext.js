import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [status, setStatus] = useState('Pending');

    
}



