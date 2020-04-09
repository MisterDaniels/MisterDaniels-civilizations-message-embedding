import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import AutoReplace from 'slate-auto-replace';
import { withGallery } from '@mercuriya/slate-gallery';

import './styles.css';

const plugins = [
    AutoReplace({
        trigger: 'space',
        before: /^(>)$/,
        change: (change, e, matches) => {
            return change.insertText('@');
        }
    })
];

const Editor = () => {
    const editor = useMemo(() => 
        withReact(createEditor()), []
    );

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in paragraph.' }]
        }
    ]);

    return (
        <Slate 
            editor={ editor } 
            value={ value } 
            onChange={ value => setValue(value) }
            plugins={ plugins }>
            <Editable className="editor"/>
        </Slate>
    )
};

export default Editor;