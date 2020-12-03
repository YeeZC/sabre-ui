import React from "react";
import Upload from '.';
import {Meta, Story} from '@storybook/react';
import {UploadFile, UploadProps} from "./upload";
import {Button} from "../../index";

const meta: Meta = {
    title: 'Upload',
    component: Upload
}

export default meta;

export const Template: Story<UploadProps> = (props) => {
    const customRequest = (file: UploadFile, handle?: (progress: number) => void) => {
        return new Promise(resolve => {
            let percent = 0;
            const timeout = setInterval(() => {
                if (handle) {
                    handle(percent);
                }
                if (percent >= 100) {
                    clearInterval(timeout);
                    resolve(true);
                }
                percent += 1;
            }, 100)
        })
    }
    return (
        <div>
            拖拽上传
            <Upload.Drag {...props} name={"file"} action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}/>
            点击上传
            <br/>
            <Upload {...props} customRequest={customRequest} defaultUploadedList={[{
                key: 'a',
                name: 'a.txt',
                size: 1024,
                type: '',
                status: 'error'
            }, {
                key: 'b',
                name: 'b.txt',
                size: 1024,
                type: '',
                status: 'progress',
                percent: 30
            }]}>
                <Button>上传</Button>
            </Upload>
        </div>)
}

Template.storyName = "Upload";