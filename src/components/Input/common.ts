import {ReactNode} from "react";
import {SizeType} from "../../data";

export interface InputPropsBase {
    name?: string;
    placeholder?: string;
    size?: SizeType;
    value?: string;
    defaultValue?: string;
    onChange?:(value: string) => void;
    prefix?: ReactNode
}