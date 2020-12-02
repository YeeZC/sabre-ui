import {ReactNode} from "react";
import {BaseFormItemProps, SizeType} from "../../data";

export interface InputPropsBase extends BaseFormItemProps {
    placeholder?: string;
    size?: SizeType;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    prefix?: ReactNode;
    className?: string;
    disabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}