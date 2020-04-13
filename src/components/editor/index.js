import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import './styles.css';

import DefaultElement from './default-element';
import { ObjectElement, objectWords } from './object-element';

const SlateEditor = () => {
    const editor = useMemo(() => 
        withObjects(withReact(createEditor())), []
    );

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }]
        }
    ]);
    const [target, setTarget] = useState();

    const onChange = (value) => {
        setValue(value);

        const { selection } = editor;
        
        if (selection && Range.isCollapsed(selection)) { 
            const [start] = Range.edges(selection);
            const beforeText = Editor.before(editor, start, { unit: 'word' });
            const before = beforeText && Editor.before(editor, beforeText);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeWord = beforeRange && Editor.string(editor, beforeRange);

            if (beforeWord) {
                objectWords.find(object => {
                    if (beforeWord.match(object.regex)) {
                        beforeRange.anchor.offset++;

                        Transforms.select(editor, beforeRange);

                        const objectElement = { type: 'object', object: object, children: [{ text: object.word }] }
                    
                        setTarget(objectElement);

                        return true;
                    }

                    return false;
                });
            }
        }
	};

    const onKeyDown = (e) => {
        if (target) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();

                    Transforms.insertNodes(editor, target)
                    Transforms.move(editor);
                    
                    setTarget(null);
                    break;
                default:
                    return;
            }
        }
    };

    const renderElement = useCallback( props => {
        switch(props.element.type) {
            case 'object':
                return <ObjectElement {...props}/>
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    return (
        <Slate 
            editor={ editor } 
            value={ value } 
            onChange={ onChange }>
            <Editable 
                className="editor"
                onKeyDown={ onKeyDown }
                renderElement={ renderElement } />
        </Slate>
    )
};

const withObjects = editor => {
    const { isInline, isVoid } = editor;

    editor.isInline = element => {
        return element.type === 'object' ? true : isInline(element);  
    };

    editor.isVoid = element => {
        return element.type === 'object' ? true : isVoid(element);
    };

    return editor;
}

export default SlateEditor;