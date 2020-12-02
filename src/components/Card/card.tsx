import React, {MouseEventHandler, ReactNode} from "react";
import classNames from "classnames";
import {SizeType} from "../../data";

export interface CardProps {
    className?: string;
    style?: React.CSSProperties;
    title?: ReactNode;
    cover?: ReactNode;
    loading?: boolean;
    border?: boolean;
    actions?: ReactNode[];
    size?: SizeType;
    extra?: ReactNode;
    hoverable?: boolean;
    onClick?: (e: React.MouseEvent) => void
}


export const Card: React.FC<CardProps> = (props) => {
    const {
        className,
        style,
        border,
        loading,
        title,
        extra,
        cover,
        children,
        size,
        hoverable,
        onClick,
        actions
    } = props;
    const classes = classNames('ui-card', className, {
        'ui-card-border': !!border,
        'ui-card-hoverable': !!hoverable,
        [`ui-card-${size}`]: size
    })

    const renderTitle = () => {
        if (title) {
            return (<div className={'ui-card-header'}>
                <div className="ui-card-title">{title}</div>
                {extra ? <div className={'ui-card-extra'}>
                    {extra}
                </div> : ''}
            </div>)
        }
    }

    const renderCover = () => {
        if (cover) {
            return (<div className='ui-card-cover'>{cover}</div>)
        }
    }

    const renderContent = () => {
        if (loading) {
            return <div/>
        }
        return <div className={'ui-card-body'}>{children}</div>;
    }

    const renderActions = () => {
        if (actions) {
            const liStyle = {
                width: `${100.0 / actions.length}%`
            }
            return (<ul className={'ui-card-actions'}>
                {actions.map(item => {
                    return <li style={liStyle}><span>{item}</span></li>
                })}
            </ul>)
        }
    }

    const handleClick: MouseEventHandler = (e) => {
        if (hoverable && onClick) {
            onClick(e);
        }
    }

    return (<div className={classes} style={style} onClick={handleClick}>
        {renderTitle()}
        {renderCover()}
        {renderContent()}
        {renderActions()}
    </div>)
}

Card.defaultProps = {
    border: true,
    hoverable: false
}