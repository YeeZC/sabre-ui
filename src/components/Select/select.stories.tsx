import React from "react";
import {Meta, Story} from "@storybook/react";
import Select from "./index";
import {SelectProps} from "./select";
import {action} from "@storybook/addon-actions";
import Icon from "../Icon";

const meta: Meta = {
    title: 'Select',
    component: Select,
}

export default meta;

export const DefaultInput: Story<SelectProps> = (props) => {
    return (
        <div style={{width: 300}}>
            <Select onChange={action('onChange')}
                    multiSelect={props.multiSelect}
                    disabled={props.disabled}
                    prefix={<Icon type={"user"}/>}
            >
                <Select.Option label={'hello'} value={'hello'}/>
                <Select.Option label={'child'} value={'child'}/>
            </Select>
        </div>
    )
}

DefaultInput.storyName = "Select"