import React, {ReactElement} from "react";
import classNames from "classnames";

interface SpaceProps {
    direction?: Direction;
    size?: SizeType
}

const Space:React.FC<SpaceProps> = ({direction,size, children}) => {
    const classes = classNames('ui-space', {
        [`ui-space-${direction}`]: direction,
        [`ui-space-${size}`]: size
    })

    return <span className={classes}>
        {React.Children.map(children, child => {
            const element = child as ReactElement;
            if (element) {
                const {className} = element.props;
                return React.cloneElement(element, {
                    className: classNames(className, 'ui-space-item')
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