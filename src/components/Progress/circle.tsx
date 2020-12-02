import React from "react";
import {colorMap, ProgressProps, ProgressStrokeColor} from "./common";
import {Circle} from "rc-progress";
import classNames from "classnames";
import Icon from "../Icon";
import {Theme} from "../../data";

export const CircleProgress: React.FC<ProgressProps> = (props) => {
    const {
        strokeColor,
        strokeLinecap,
        strokeSize,
        showInfo,
        percent,
        size,
        format,
        status
    } = props;

    let color: any = strokeColor;

    if (!color) {
        if (status as Theme) {
            color = colorMap.get(status as Theme);
        } else {
            color = colorMap.get("primary");
        }
    } else if (percent === 100) {
        color = colorMap.get('success')
    } else {
        const convert = strokeColor as ProgressStrokeColor;
        if (convert) {
            color = {
                '0%': convert.from,
                '100%': convert.to
            }
        }
    }

    const renderText = () => {
        if (format) {
            return format(percent);
        }
        if (percent === 100) {
            return <Icon type={'correct'} theme={"success"}/>
        }
        return `${percent}%`
    }

    const classes = classNames('ui-progress')

    return (
        <div style={{width: size, height: size}} className={classes}>
            <Circle
                style={{width: size, height: size}}
                prefixCls={'ui-progress'}
                percent={percent}
                strokeColor={color}
                strokeWidth={strokeSize}
                trailWidth={strokeSize}
                strokeLinecap={strokeLinecap}
            />
            {showInfo ? <span className={classNames('ui-progress-circle-text', {
                    'ui-progress-circle-text-sm': size <= 100,
                    'ui-progress-circle-text-lg': size > 200,
                    [`ui-progress-text-${status}`]: status && status !== "active"
                })}>
                {renderText()}
            </span>
                :
                ''
            }
        </div>)
}

CircleProgress.defaultProps = {
    strokeSize: 4,
    status: "primary"
}