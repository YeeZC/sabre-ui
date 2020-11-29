import React, {createContext, FunctionComponentElement, useRef} from "react";
import classNames from "classnames";
import {Step, StepProps} from './step'
import {Direction} from "../../data";
import {useRenderChildren} from "../../hooks";

export type StepStatus = 'default' | 'process' | 'finish' | 'error';
export type StepSize = 'default' | 'small';
export type StepsType = 'default' | 'dot' | 'nav';

export interface StepsProps {
    className?: string;
    current?: number;
    direction?: Direction;
    initial?: number;
    size?: StepSize;
    status?: StepStatus;
    onChange?: (current: number) => void;
    type?: StepsType;
}

type StepsCompoundedComponent = React.FC<StepsProps> & {
    Step: React.FC<StepProps>
}

interface StepsContextInf {
    onChange: (current?: number) => void;
    current?: number;
    clickable: boolean
}

export const StepsContext = createContext<StepsContextInf>({
    clickable: false,
    onChange: () => {}
})

const {Provider} = StepsContext;

export const Steps: StepsCompoundedComponent = (props) => {
    const {className, onChange} = props;
    const lastError = useRef<boolean>(false)

    const initial = props.initial || 0;
    const current = props.current || 0;
    const direction: Direction = props.direction === "vertical" ? props.direction : "horizontal";
    const size = props.size === "small" ? props.size : 'default';

    const selectType = (): StepsType => {
        const {type} = props;
        if (direction === "vertical") {
            if (type !== "dot") {
                return "default";
            }
            return "dot";
        }
        if (type === "dot" || type === 'nav') {
            return type;
        }
        return "default";
    }

    const type = selectType();


    const handleChange = (current?: number) => {
        if (onChange) {
            onChange((current || 1) + initial - 1)
        }
    }

    const context: StepsContextInf = {
        onChange: handleChange,
        clickable: !!onChange
    }


    const classes = classNames('ui-steps', className, {
        [`ui-steps-${direction}`]: direction,
        [`ui-steps-${size}`]: size,
        [`ui-steps-type-${type}`]: type
    });

    const children = useRenderChildren<StepProps>(props.children, 'Step');

    return (
        <div className={classes}>
                {React.Children.map(children, (child, index) => {
                    const element = child as FunctionComponentElement<StepProps>;
                    const {status} = element.props;
                    const key = initial + index;
                    const newProps = {
                        ...element.props,
                        key
                    }
                    if (lastError.current) {
                        newProps.disabled = true
                    }
                    lastError.current = status === "error";
                    if (key < current) {
                        if (status !== 'error') {
                            newProps.status = 'finish';
                        }
                    } else if (key === current && status === "default") {
                        newProps.status = props.status;
                    } else if (key > current) {
                        newProps.status = 'default'
                    }
                    const item = React.cloneElement(element, newProps);
                    return (
                        <Provider value={{...context, current: index + 1}}>
                            {item}
                        </Provider>
                    )
                })}
        </div>
    )
}

Steps.defaultProps = {
    direction: "horizontal",
    status: "process",
    size: "default",
    type: "default",
    current: 0,
    initial: 0
}

Steps.Step = Step;

Steps.displayName = "Steps";