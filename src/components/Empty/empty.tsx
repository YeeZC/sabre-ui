import React, {ReactElement, ReactNode} from "react";
import Icon from "../Icon";
import classNames from "classnames";

export interface EmptyProps {
    image?: ReactNode;
    description?: ReactNode;
    imageStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
}

export const Empty: React.FC<EmptyProps> = (props) => {
    const {style, className, image, description, imageStyle, children} = props;
    const classes = classNames('ui-empty', className)
    return (
        <div className={classes} style={style}>
            {imageStyle && image ? React.cloneElement(image as ReactElement, {
                style: imageStyle
            }) : image}
            <span className={'ui-description'}>{description}</span>
            {children}
        </div>
    )
}

Empty.defaultProps = {
    image: <Icon type={'empty'} style={{fontSize: '3rem'}}/>,
    description: "暂无数据"
}

Empty.displayName = "Empty";