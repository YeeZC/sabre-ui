import React, {createContext, useState} from "react";
import classNames from "classnames";
import {Item, ItemProps} from "./item";
import {Direction, SizeType} from "../../data";

export interface FormProps {
    /**
     * Form的排列方式
     */
    layout?: Direction | 'inline';
    /**
     * Form的初始值
     */
    initialValues?: any;
    /**
     * Form大小
     */
    size?: SizeType;
    /**
     * Form提交回调
     * @param values
     */
    onFinish?: (values: any) => void;
    /**
     * label宽度
     */
    labelCol?: number;
    /**
     * wrapper宽度
     */
    wrapperCol?: number;
}

interface FormContextInf {
    /**
     * label宽度
     */
    labelCol?: number;
    /**
     * wrapper宽度
     */
    wrapperCol?: number;
    /**
     * Form的排列方式
     */
    layout: Direction | 'inline';
}

export const FormContext = createContext<FormContextInf>({
    layout: "vertical"
});

export type FormCompounded = React.FC<FormProps> & {
    Item: React.FC<ItemProps>
}

export const Form: FormCompounded = (props) => {
    const {layout, initialValues, size, onFinish, labelCol, wrapperCol, children} = props;
    const [value, setValue] = useState(initialValues);
    const classes = classNames('ui-form', {
        [`ui-form-${layout}`]: layout,
        [`ui-form-${size}`]: size,
    })
    return (<form className={classes} onSubmit={(event) => {
    }
    }>
        <FormContext.Provider value={{labelCol, wrapperCol, layout: layout || "vertical"}}>
            {children}
        </FormContext.Provider>
    </form>)
}

Form.displayName = "Form";
Form.Item = Item;

Form.defaultProps = {
    size: "default",
    layout: "vertical",
    initialValues: {},
    labelCol: 3,
    wrapperCol: 7
}