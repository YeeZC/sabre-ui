import React from "react";
import classNames from "classnames";
import Col, {ColProps} from "./col";
import {useRenderChildren} from "../../hooks/useRenderChildren";

interface RowProps {
    style?: React.CSSProperties;
    className?: string
}

interface RowCompoundedComponent extends React.FC<RowProps> {
    Col: React.FC<ColProps>
}

const Row: RowCompoundedComponent = ({style, className, children}) => {
    const classes = classNames('ui-row', className);
    return (<div className={classes} style={style}>
        {useRenderChildren(children, 'Col')}
    </div>)
}

Row.Col = Col

export default Row;