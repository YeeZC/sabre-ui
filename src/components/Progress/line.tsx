import React from "react";
import classNames from "classnames";
import {colorMap, ProgressProps, ProgressStrokeColor} from "./common";
import Icon from "../Icon";


export const Line: React.FC<ProgressProps> = (props) => {
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

    const renderText = () => {
        if (format) {
            return format(percent);
        }
        if (percent === 100) {
            return <Icon type={'check-filled'} theme={"success"}/>
        }
        return `${percent}%`
    }

    let style: React.CSSProperties = {
        width: `${percent}%`
    };

    if (typeof strokeColor === "string") {
        style.backgroundColor = strokeColor;
    } else if(percent === 100) {
        style.backgroundColor = colorMap.get('success');
    }else {
        const color = strokeColor as ProgressStrokeColor;
        if (color) {
            style.backgroundImage = `linear-gradient(to right, ${color.from} , ${color.to})`
        } else {
            style.backgroundColor = '#1890ff';
        }
    }

    return (<div className={classNames("ui-progress", "ui-progress-line")} style={{width: size}}>
        <div className={classNames('ui-progress-outer', {
            'ui-progress-status-active': status === "active" && percent < 100
        })} style={{
            height: strokeSize || 10
        }}>
            <div className={classNames('ui-progress-bg', {
                'ui-progress-bg-round': strokeLinecap === "round" || percent === 100,
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