import React from "react";
import Upload from '.';
import {Meta, Story} from '@storybook/react';
import {UploadProps} from "./upload";

const meta: Meta = {
    title: 'Upload',
    component: Upload
}

export default meta;

export const Template: Story<UploadProps> = (props) => {
    return (<Upload {...props} name={"file"} customRequest={(file, handle) => {

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
    }} defaultUploadedList={[{
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
        {/*<Button icon={<Icon type={'upload'}/>}>上传</Button>*/}
        上传
    </Upload>)
}

Template.storyName = "Upload";