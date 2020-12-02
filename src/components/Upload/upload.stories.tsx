import React from "react";
import Upload from '.';
import {Meta, Story} from '@storybook/react';
import {UploadProps} from "./upload";
import {Button, Icon} from "../../index";

const meta: Meta = {
    title: 'Upload',
    component: Upload
}

export default meta;

export const Template: Story<UploadProps> = (props) => {
    return (<Upload {...props} name={"file"}>
        <Button icon={<Icon type={'upload'}/>}>上传</Button>
    </Upload>)
}

Template.storyName = "Upload";