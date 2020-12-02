import React from "react";
import classNames from "classnames";
import {UploadFile} from "./upload";
import {Progress} from "../../index";

export interface UploadListProps {
    files: UploadFile[];
    onRemove: (file: UploadFile) => void;
}

export const List: React.FC<UploadListProps> = (props) => {
    const {files, onRemove} = props;
    const classes = classNames('ui-upload-list');

    return (
        <ul className={classes}>
            {files.map(item => {
                    const spinning = item.status === "progress" || item.status === 'ready'
                    return (
                        <li key={item.key}
                            className={`ui-upload-list-item ui-upload-list-${item.status}`}>
                        <span className={'ui-upload-list-item-title'}>
                            <span className={classNames(
                                'ui-upload-list-item-prefix',
                                'ui-icon', {
                                    'ui-icon-attachment': !spinning,
                                    'ui-icon-spinner': spinning,
                                    'ui-icon-spin': spinning
                                })}/>
                            <span className={'ui-upload-list-item-text'}>{item.name}</span>
                            <span
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (item.cancel && item.status === "progress") {
                                        item.cancel()
                                    }
                                    onRemove(item);
                                    e.stopPropagation();
                                }}
                                className={'ui-upload-list-item-close ui-icon ui-icon-delete-fill'}/>
                        </span>
                            {spinning ? <span className={'progress'}>
                                <Progress status={"success"}
                                          size={'100%'}
                                          strokeLinecap={"round"}
                                          strokeSize={1}
                                          showInfo={false}
                                          percent={item.percent || 0}/>
                            </span> : ''}
                        </li>
                    )
                }
            )}
        </ul>
    )
}