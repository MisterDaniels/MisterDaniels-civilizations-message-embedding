import React from 'react';
import { FaCoins, FaUserAlt, FaDrumstickBite, FaExchangeAlt } from 'react-icons/fa';

const objectWords = [
    {
        regex: /(moeda)/,
        word: 'moeda',
        icon: FaCoins
    }, 
    {
        regex: /(população)/,
        word: 'população',
        icon: FaUserAlt
    },
    {
        regex: /(comida)/,
        word: 'comida',
        icon: FaDrumstickBite
    },
    {
        regex: /(comércio)/,
        word: 'comércio',
        icon: FaExchangeAlt
    }
];

const ObjectElement = ({ attributes, children, element }) => {    
    const Icon = element.object.icon;

    return (
        <span 
            style={ {
                color: "#999"
            } }
            { ...attributes }
            contentEditable={ false }>
            <Icon
                style={ {
                    marginRight: '4px'
                } }
                size={ 12 } />
            { element.object.word }
            { children }
        </span>
    );
};

export { ObjectElement, objectWords };