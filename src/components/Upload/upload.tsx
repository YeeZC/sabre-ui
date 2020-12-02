import React, {MouseEventHandler, ReactElement, useRef, useState} from "react";
import classNames from "classnames";
import {Drag, DragProps} from "./drag";
import axios from 'axios';
import {List} from "./list";

export type UploadStatus = 'ready' | 'progress' | 'success' | 'error';

export interface UploadFile {
    readonly key: React.Key;
    name: string;
    size: number;
    type: string;
    raw?: File;
    percent?: number;
    status?: UploadStatus;
    response?: any;
    error?: any;
    cancel?: () => void
}

export type DataFunction = (file: UploadFile) => { [key: string]: any };

export interface UploadProps {
    accept?: string;
    multiple?: boolean;
    className?: string;
    name?: string;
    action?: string;
    beforeUpload?: (file: UploadFile) => boolean | Promise<boolean | UploadFile>;
    customRequest?: (file: UploadFile, handle?: (progress: number) => void) => Promise<any>;
    data?: { [key: string]: any } | DataFunction;
    disabled?: boolean;
    defaultUploadedList?: UploadFile[];
    showUploadList?: boolean;
    onSuccess?: (file: UploadFile) => void;
    onError?: (file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    withCredentials?: boolean;
    onRemove?: (file: UploadFile) => void;
}

export type UploadCompounded = React.FC<UploadProps> & {
    Drag: React.FC<DragProps>
}

export const Upload: UploadCompounded = (props) => {
    const {name, children, accept, action, customRequest, disabled} = props;
    const {beforeUpload, multiple, showUploadList, data, headers, withCredentials} = props;
    const {onSuccess, onError, onChange, onRemove, defaultUploadedList} = props;

    const [files, setFiles] = useState<UploadFile[]>(defaultUploadedList || []);

    const classes = classNames('ui-upload', {
        'disabled': !!disabled
    });

    const updateFiles = (file: UploadFile, obj: Partial<UploadFile>) => {
        console.log('updateFiles', obj)
        setFiles(prevState => {
            return prevState.map(item => {
                if (item.key === file.key) {
                    return {
                        ...item,
                        ...obj
                    }
                }
                return item;
            })
        })
    }

    const doUpload: (file: UploadFile) => Promise<any> = (file) => {
        if (customRequest) {
            const handle = (progress: number) => handleProgress(file, progress);
            return customRequest(file, handle);
        }
        if (action && file.raw) {
            const formData = new FormData();
            formData.append(name || file.name, file.raw, file.name);
            if (data) {
                if (typeof data === "function") {
                    const result = data(file);
                    Object.keys(result).forEach(key => formData.append(key, result[key]))
                } else {
                    Object.keys(data).forEach(key => formData.append(key, data[key]))
                }
            }
            const source = axios.CancelToken.source();
            const cancel = () => source.cancel();
            return axios.post(action, formData, {
                cancelToken: source.token,
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: event => {
                    const percent = Math.round(event.loaded * 100 / event.total) || 0;
                    updateFiles(file, {percent, status: "progress", cancel})
                },
                withCredentials
            }).then(resp => resp.data)
        }
        return Promise.reject('action not set');
    }

    const handleProgress = (file: UploadFile, progress: number) => {
        updateFiles(file, {percent: progress, status: "progress"})
    }

    const handleUpload = (file: File) => {
        const _file: UploadFile = {
            key: new Date().getTime(),
            name: file.name,
            size: file.size,
            type: file.type,
            raw: file,
            status: "ready"
        }
        setFiles(prevState => {
            return [...prevState, _file]
        })
        if (onChange) {
            onChange(_file);
        }
        let promise;
        if (beforeUpload) {
            const result = beforeUpload(_file);
            if (typeof result === "boolean" && result) {
                promise = doUpload(_file)
            } else if (result instanceof Promise) {
                result.then(resp => {
                    if (typeof resp === "boolean" && resp) {
                        promise = doUpload(_file);
                    } else {
                        promise = doUpload(resp as UploadFile);
                    }
                })
            }
        } else {
            promise = doUpload(_file);
        }
        if (promise) {
            promise.then(resp => {
                updateFiles(_file, {status: "success", response: resp})
                _file.status = 'success';
                _file.response = resp;
                if (onChange) {
                    onChange(_file);
                }
                if (onSuccess) {
                    onSuccess(_file);
                }
            }).catch(err => {
                updateFiles(_file, {status: "error", error: err})
                _file.status = 'error';
                _file.error = err;
                if (onChange) {
                    onChange(_file);
                }
                if (onError) {
                    onError(_file);
                }
            })
        }
    }

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

    const handleRemove = (file: UploadFile) => {
        setFiles(prevState => prevState.filter(item => item.key !== file.key));
        if (onRemove) {
            onRemove(file);
        }
    }

    const renderUploadList = () => {
        if (!!showUploadList) {
            return <List files={files} onRemove={handleRemove}/>
        }
    }

    return (
        <div className={classes} {...uploadClick}>
            <input type={"file"} name={name} ref={ref => {
                if (ref) {
                    fileRef.current = ref;
                }
            }} accept={accept} multiple={multiple} onChange={(e) => {
                const {files} = e.target;
                Array.from(files || []).forEach(file => handleUpload(file));
                if (fileRef.current) {
                    fileRef.current.value = '';
                }
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