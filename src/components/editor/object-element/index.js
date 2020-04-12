import React, { Component } from 'react';
import { FaCoins, FaUserAlt } from 'react-icons/fa';

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

const ObjectElement = (props) => {
    const { object, children } = props.element;
    
    console.log(props);

    return (
        <span { ...props.attributes }>
            <FaCoins />
            { props.children }
        </span>
    );
};

export { ObjectElement, objectWords };