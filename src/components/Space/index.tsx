import React, {ReactElement} from "react";
import classNames from "classnames";
import {Direction, SizeType} from "../../data";

interface SpaceProps {
    direction?: Direction | 'around';
    size?: SizeType | number
}

const Space:React.FC<SpaceProps> = ({direction,size, children}) => {
    const classes = classNames('ui-space', {
        [`ui-space-${direction}`]: direction,
        [`ui-space-${size}`]: typeof size === "string"
    })
    let style:React.CSSProperties | undefined = undefined;
    if (typeof size === "number") {
        switch (direction) {
            case "around": {
                style = {
                    margin: size
                }
                break
            }
            case "horizontal": {
                style = {
                    marginLeft: size,
                    marginRight: size,
                    marginTop: 0,
                    marginBottom: 0
                }
                break
            }
            case "vertical": {
                style = {
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: size,
                    marginBottom: size
                }
                break
            }
        }
    }

    return <span className={classes}>
        {React.Children.map(children, child => {
            const element = child as ReactElement;
            if (element) {
                const {className} = element.props;
                return React.cloneElement(element, {
                    className: classNames(className, 'ui-space-item'),
                    style
                })
            }
        })}
    </span>
}

Space.displayName = 'Index';
Space.defaultProps = {
    direction: "horizontal",
    size: "default"
}

export default Space;