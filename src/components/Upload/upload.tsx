import React, {MouseEventHandler, ReactElement, useRef, useState} from "react";
import classNames from "classnames";
import {Drag, DragProps} from "./drag";

export type DataFunction = (file: File) => object | Promise<object>;

export interface UploadProps {
    accept?: string;
    className?: string;
    name?: string;
    action?: string;
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    customRequest?: Function,
    data?: object | DataFunction;
    disabled?: boolean;
    showUploadList?: boolean;
}

export type UploadCompounded = React.FC<UploadProps> & {
    Drag: React.FC<DragProps>
}

export const Upload: UploadCompounded = (props) => {
    const {name, children, accept, action, customRequest, disabled} = props;
    const {showUploadList} = props;
    const [percent, setPercent] = useState<number>(0);
    const [uploaded, setUploaded] = useState<File[]>([])
    const classes = classNames('ui-upload', {
        'disabled': !!disabled
    });
    const fileRef = useRef<HTMLInputElement>();
    const handleClick: MouseEventHandler = (e) => {
        if (!disabled && fileRef.current) {
            fileRef.current?.click();
        }
    }
    const length = React.Children.count(children);
    if (length > 1) {
        throw new Error('More than one element');
    }
    const element = React.Children.toArray(children)[0] as ReactElement;
    const innerClick = element && element.type;
    const uploadClick = innerClick ? {} : {
        onClick: handleClick
    }

    const renderUploadList = () => {
        if (!!showUploadList) {
            return (
                <ul className={'ui-upload-list'}>
                    <li>hhhh</li>
                </ul>
            )
        }
    }

    return (
        <div className={classes} {...uploadClick}>
            <input type={"file"} name={name} ref={ref => {
                if (ref) {
                    fileRef.current = ref;
                }
            }} accept={accept} onChange={(e) => {
                console.log('files', e.target.files)
            }}/>
            {innerClick ? React.cloneElement(element, {
                onClick: handleClick,
                disabled
            }) : element}
            {renderUploadList()}
        </div>
    )
}

Upload.displayName = "Upload";
Upload.defaultProps = {
    name: 'file',
    accept: "*",
    disabled: false,
    showUploadList: true
}
Upload.Drag = Drag;