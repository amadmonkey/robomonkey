import React from 'react';
import { ReactComponent as MoveImg } from '../../img/move.svg';
import { ReactComponent as BoldImg } from '../../img/bold.svg';
import { ReactComponent as ItalicImg } from '../../img/italic.svg';
import { ReactComponent as UnderlineImg } from '../../img/underline.svg';
import { ReactComponent as AnchorImg } from '../../img/anchor.svg';
import './style.scss';

const TextEditor = () => {

    const moveToolbar = () => {

    }

    const tools = {
        move: {
            attr: {
                name: "move",
                className: "toolbar-button",
                onClick: moveToolbar,
            },
            icon: <MoveImg />
        },
        bold: {
            attr: {
                name: "bold",
                className: "toolbar-button",
                onClick: moveToolbar,
            },
            icon: <BoldImg />
        },
        italic: {
            attr: {
                name: "italic",
                className: "toolbar-button",
                onClick: moveToolbar,
            },
            icon: <ItalicImg />
        },
        underline: {
            attr: {
                name: "italic",
                className: "toolbar-button",
                onClick: moveToolbar,
            },
            icon: <UnderlineImg />
        },
        dock: {
            attr: {
                name: "reset",
                className: "toolbar-button",
                onClick: moveToolbar,
            },
            icon: <AnchorImg />
        }
    }

    return (
        <div className="text-editor-container">
            <div className="text-editor" contentEditable="true"></div>
            <div className="floating-toolbar">
                {
                    Object.keys(tools).map(key => <button key={tools[key].attr.name} {...tools[key].attr} >{tools[key].icon}</button>)
                }
            </div>
        </div>
    )
}

export default TextEditor
