import React, {useState} from "react";
import {Meta, Story} from "@storybook/react";
import Steps from "./index";
import {StepsProps} from "./steps";

const meta: Meta = {
    title: "Steps",
    component: Steps
}

export default meta;

export const Template: Story<StepsProps> = (props) => {
    const [current, setCurrent] = useState<number>(0)
    return (
        <Steps {...props} current={current} onChange={c => setCurrent(c)}>
            <Steps.Step title={"Step1"} subTitle={"sunTitle 1"} description={"description"}/>
            <Steps.Step title={"Step2"}/>
            <Steps.Step title={"Step3"}/>
        </Steps>
    )
}

Template.storyName = "Steps";