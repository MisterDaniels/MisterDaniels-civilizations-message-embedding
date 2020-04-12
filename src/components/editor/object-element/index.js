import React, { Component } from 'react';
import { FaCoins, FaUserAlt } from 'react-icons/fa';
import { useSelected, useFocused } from 'slate-react';

const objectWords = [
    {
        regex: /(moeda)/,
        word: 'moeda',
        icon: <FaCoins />
    }, 
    {
        regex: /(população)/,
        word: 'população',
        icon: <FaUserAlt />
    }
]

const ObjectElement = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();
    
    return (
        <span 
            { ...attributes }
            contentEditable={ false }>
            <FaCoins />
            { element.object.word }
            { children }
        </span>
    );
};

export { ObjectElement, objectWords };