import React, {ReactElement} from "react";
import classnames from "classnames";

const Group: React.FC<{}> = ({children, ...rest}) => {

    const nodes = React.Children.toArray(children).filter(child => {
        return child as ReactElement;
    });

    const length = nodes.length;
    return (<span className={'ui-btn-gp'}>{nodes.map((child, idx) => {
        const element = child as ReactElement;
        const {className} = element.props;
        return React.cloneElement(element, {
            className: classnames(className, {
                'ui-btn-gp-first': idx === 0,
                'ui-btn-gp-last': idx === length-1,
                'ui-btn-gp-mid': idx >0 && idx < length - 1
            })
        })
    })}</span>)
}

export default Group;