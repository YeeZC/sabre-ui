import React, {FunctionComponentElement} from "react";
import classNames from "classnames";
import Col, {ColProps} from "./col";
import {useRenderChildren} from "../../hooks/useRenderChildren";

interface RowProps {
    style?: React.CSSProperties;
    className?: string;
    flexWrap?: boolean;
}

interface RowCompoundedComponent extends React.FC<RowProps> {
    Col: React.FC<ColProps>
}

const Row: RowCompoundedComponent = ({style, className, children, ...rest}) => {
    const classes = classNames('ui-row', className, {
        'ui-row-flex-wrap': rest.flexWrap
    });
    const cols = useRenderChildren(children, 'Col');
    const colCount = React.Children.count(cols);
    let free = 24;

    return (<div className={classes} style={style}>
        {React.Children.map(cols, (child, index) => {
            const element = child as FunctionComponentElement<ColProps>;
            const {span} = element.props;
            if (span) {
                free = free - span;
                return element;
            }
            if (index === colCount - 1) {
                return React.cloneElement(element, {
                    ...element.props,
                    span: free
                })
            } else {
                free = free - 1;
                return React.cloneElement(element, {
                    ...element.props,
                    span: 1
                })
            }
        })}
    </div>)
}

Row.defaultProps = {
    flexWrap: true
}

Row.Col = Col

export default Row;