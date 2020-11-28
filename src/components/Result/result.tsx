import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { StatusType } from '../../data';
import Icon from '../Icon';

export type ResultStatus = StatusType | 404 | 403 | 500;

const defaultIcon = new Map<ResultStatus, ReactNode>()

defaultIcon.set("success", <Icon type='check-filled'/>);
defaultIcon.set("error", <Icon type="close-filled"/>);
defaultIcon.set("info", <Icon type="info-filled"/>);
defaultIcon.set("warn", <Icon type="caution-filled"/>)

export interface ResultProps {
    status?: ResultStatus;
    icon?: ReactNode;
    title?: ReactNode;
    subTitle?: ReactNode;
    extra?: ReactNode;
}

export const Result: React.FC<ResultProps> = (props) => {
    const {status, title, subTitle, extra, children} = props;
    const classes = classNames('ui-result', {
        [`ui-result-${status}`]: status
    });

    const findDefaultIcon = () => {
        return props.icon || defaultIcon.get(status || "info");
    }

    const renderContent = () => {
        const content = [];
        const icon = findDefaultIcon();
        if (icon) {
            content.push(
                <div className="ui-result-icon">
                    {icon}
                </div>
            )
        }
        if (title) {
            content.push(
            <div className="ui-result-title">{
                title
            }</div>
            )
        }
        if (subTitle) {
            content.push(
            <div className="ui-result-sub-title">{subTitle}</div>
            )
        }
        if (extra) {
            content.push(
            <div className="ui-result-extra">{
                extra
            }</div>
            )
        }
        if (children) {
            content.push(
            <div className="ui-result-content">{children}</div>
            )
        }
        return content;
    }

    return (
        <div className={classes}>
            {renderContent()}
        </div>
    )
}

Result.displayName = "Result";
Result.defaultProps = {
    status: "info"
}