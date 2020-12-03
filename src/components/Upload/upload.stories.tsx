import React from "react";
import Upload from '.';
import {Meta, Story} from '@storybook/react';
import {UploadProps} from "./upload";
import {Button} from "../../index";

const meta: Meta = {
    title: 'Upload',
    component: Upload
}

export default meta;

export const Template: Story<UploadProps> = (props) => {
    return (
        <div>
            拖拽上传
            <Upload.Drag {...props}
                         name={"file"}
                         action={"https://www.easy-mock.com/mock/5fc91aec4d953a64bd0fc173/sabre/upload"}
            />
            点击上传
            <br/>
            <Upload {...props}
                    action={"https://www.easy-mock.com/mock/5fc91aec4d953a64bd0fc173/sabre/upload"}>
                <Button>上传</Button>
            </Upload>
        </div>)
}

Template.storyName = "Upload";