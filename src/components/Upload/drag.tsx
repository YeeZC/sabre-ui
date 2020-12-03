import React, {MouseEventHandler, ReactNode, useState} from "react";
import classNames from "classnames";
import {Upload, UploadContext, UploadContextInf, UploadProps} from "./upload";
import {Icon} from "../../index";

export interface DragProps extends UploadProps {
    icon?: ReactNode;
    description?: string
}

export const Drag: React.FC<DragProps> = (props) => {
    const {children, icon, description, ...rest} = props;
    const [drag, setDrag] = useState(false);
    const classes = classNames('ui-upload-drag', {
        'active': drag
    })

    const consumer = (context: UploadContextInf) => {
        const onClick: MouseEventHandler = (e) => {
            e.preventDefault()
            if (context.fileRef?.current) {
                context.fileRef.current?.click();
            }
            e.stopPropagation()
        }
        const renderDefault = () => (
            <>
                <span className={'ui-upload-drag-icon'} onClick={onClick}>
                    {icon}
                </span>
                <span className={'ui-upload-drag-description'} onClick={onClick}>{description}</span>
            </>
        )
        return (
            <div className={classes}
                 onClick={onClick}
                 onDragOver={e => {
                     e.preventDefault();
                     setDrag(true)
                 }}
                 onDragLeave={e => {
                     e.preventDefault();
                     setDrag(false)
                 }}
                 onDrop={e => {
                     e.preventDefault();
                     setDrag(false)
                     if (context.handleUpload) {
                         const {files} = e.dataTransfer;
                         if (rest.multiple) {
                             context.handleUpload(files)
                         } else {
                             const item = files.item(0);
                             if (item) {
                                 context.handleUpload(item)
                             }
                         }
                     }
                 }}
            >
                {children ? children : renderDefault()}
            </div>
        )
    }

    return (
        <Upload {...rest} style={rest.style || {width: '100%'}}>
            <UploadContext.Consumer children={consumer}/>
        </Upload>
    )
}

Drag.displayName = "Drag";
Drag.defaultProps = {
    icon: <Icon type={'cloud-upload'}/>,
    description: '拖拽文件到此处'
}