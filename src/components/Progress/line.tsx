import React from "react";
import classNames from "classnames";
import {colorMap, ProgressProps, ProgressStrokeColor} from "./common";
import Icon from "../Icon";


export const Line: React.FC<ProgressProps> = (props) => {
    const {
        className,
        strokeColor,
        strokeLinecap,
        strokeSize,
        showInfo,
        percent,
        size,
        format,
        status
    } = props;

    const handlePercent = () => {
        if (!percent || percent < 0) {
            return 0;
        }
        if (percent > 100) {
            return 100;
        }
        return percent;
    }

    const value = handlePercent();

    const renderText = () => {
        if (format) {
            return format(value);
        }
        if (value === 100) {
            return <Icon type={'check-filled'} theme={"success"}/>
        }
        return `${value}%`
    }

    let style: React.CSSProperties = {
        width: `${value}%`,
    };

    if (typeof strokeColor === "string") {
        style.backgroundColor = strokeColor;
    } else if (value === 100) {
        style.backgroundColor = colorMap.get('success');
    } else {
        const color = strokeColor as ProgressStrokeColor;
        if (color) {
            style.backgroundImage = `linear-gradient(to right, ${color.from} , ${color.to})`
        } else {
            style.backgroundColor = '#1890ff';
        }
    }

    return (<div className={classNames("ui-progress", "ui-progress-line", className)} style={{width: size}}>
        <div className={classNames('ui-progress-outer', {
            'ui-progress-status-active': status === "active" && value < 100
        })} style={{
            height: strokeSize || 10
        }}>
            <div className={classNames('ui-progress-bg', {
                'ui-progress-bg-round': strokeLinecap === "round" || value === 100,
            })} style={style}/>
        </div>
        {showInfo ? <div className={'ui-progress-text'}>{renderText()}</div> : ''}
    </div>)
}

Line.defaultProps = {
    size: 100,
    showInfo: true,
    strokeSize: 8
}