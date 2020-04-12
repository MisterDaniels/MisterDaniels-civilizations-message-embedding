import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Range, Text } from 'slate';
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
    const [run, setRun] = useState(true);

    const onChange = (value) => {
        setValue(value);

        const { selection } = editor;
        
        if (selection && Range.isCollapsed(selection) && run) { 
            const [start] = Range.edges(selection);
            const beforeText = Editor.before(editor, start, { unit: 'word' });
            const before = beforeText && Editor.before(editor, beforeText);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeWord = beforeRange && Editor.string(editor, beforeRange);

            console.log(beforeRange);

            if (beforeWord && run) {
                objectWords.find(object => {
                    if (beforeWord.match(object.regex)) {
                        console.log('hey!');
                        beforeRange.anchor.offset++;
                        Transforms.select(editor, beforeRange);
                        const objectElement = { type: 'object', children: [{ text: object.word }], object: object }
                        setTimeout(() => { 
                            Transforms.insertNodes(editor, objectElement);
                            Transforms.move(editor);
                            Transforms.deselect(editor);
                        }, 2000);
                        // Transforms.move(editor);
                        // Transforms.insertNodes(editor, objectElement);
                        setRun(false);
                        return;
                        // Transforms.setNodes(editor, )
                    }
                });
            }
        }
	};

    const onKeyDown = (e) => {
        
    };

    const renderElement = useCallback( props => {
        console.log(props);

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