import React, {ReactNode, useContext} from "react";
import classNames from "classnames";
import {StepsContext, StepStatus} from "./steps";
import Icon from "../Icon";

export interface StepProps {
    title: ReactNode;
    subTitle?: ReactNode;
    status?: StepStatus;
    icon?: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
}

export const Step: React.FC<StepProps> = (props) => {
    const {title, subTitle, status, icon, description, disabled} = props;
    const context = useContext(StepsContext);
    const classes = classNames('ui-step', {
        [`ui-step-${status}`]: status,
        'ui-step-disabled': !!disabled,
        'ui-step-clickable': !disabled && context.clickable && status !== "error"
    });


    const renderIcon = () => {
        switch (status) {
            case "error":
                return <Icon type={"cross"}/>
            case "finish":
                return <Icon type={'correct'}/>;
        }
        return icon || <span className={'ui-step-num'}>{context.current}</span>
    }

    const renderContent = () => {
        const result = [<div className={'ui-step-icon'}>{renderIcon()}</div>];
        result.push(<div className={'ui-step-content'}>
            <span className={'ui-step-title'}>
                {title}
                {!!subTitle ? <span className={'ui-step-sub-title'}>{subTitle}</span> : ''}
            </span>
            <span className={'ui-step-description'}>{description}</span>
        </div>);
        return result;
    }

    return (
        <div className={classes} onClick={(e) => {
            if (!disabled) {
                e.preventDefault();
                context.onChange(context.current || 0);
            }
        }}>
            {renderContent()}
        </div>
    )
}

Step.displayName = "Step";
Step.defaultProps = {
    status: 'default',
}