import React from "react";
import {Line} from "./line";
import {CircleProgress} from "./circle";
import {ProgressProps} from "./common";

export type ProgressType = 'line' | 'circle';

type ProgressCompoundedComponent = React.FC<ProgressProps & { type?: ProgressType }> & {
    Line: React.FC<ProgressProps>;
    Circle: React.FC<ProgressProps>;
}

type ProgressCC = ProgressCompoundedComponent;

export const Progress: ProgressCC = (props) => {
    const {type} = props;
    if (type === "line") {
        return <Line {...props}/>
    }
    return <CircleProgress {...props}/>
}

Progress.defaultProps = {
    type: "line"
}

Progress.Line = Line;
Progress.Circle = CircleProgress;