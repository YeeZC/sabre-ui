import {ReactNode} from "react";

export interface InputPropsBase {
    name?: string;
    placeholder?: string;
    size?: SizeType;
    value?: string;
    defaultValue?: string;
    onChange?:(value: string) => void;
    prefix?: ReactNode
}