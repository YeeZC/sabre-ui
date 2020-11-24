import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";
import Icon from "../Icon";

const regExp = new RegExp('^[+|-]?[0-9]+.{0,1}[0-9]{0,2}$');

export interface NumberProps extends Omit<InputPropsBase, 'value'|'defaultValue'|'onChange' > {
    value?: number;
    defaultValue?: number;
    onChange?:(value: number) => void
    min?: number;
    max?: number;
    steps?: number;
}

export const Num:React.FC<NumberProps> = (props) =>  {
    const {name, value, placeholder, size, defaultValue, onChange} = props;
    const {min, max, steps} = props;
    const [inputValue, setValue] = useState<number>(value || defaultValue || 0);
    const [dig, setDig] = useState<number>(1)
    const [step, setStep] = useState<number>(1)
    const [focus, setFocus] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (steps) {
            const fix = steps.toString().split('.');
            let dig = 1;
            if (fix.length === 2) {
                dig = Math.pow(10, fix[1].length)
                setDig(dig);
            }
            setStep(steps * dig);
            setValue(inputValue * dig)
        }
    }, [steps])

    useEffect(() => {
        if (inputRef.current) {
            const {value} = inputRef.current;
            const prop = Math.floor(Number(value) * dig);
            if (prop !== inputValue) {
                inputRef.current.value = (inputValue / dig).toFixed(Math.log10(dig));
            }
        }
        if (onChange) {
            onChange(Number((inputValue / dig).toFixed(Math.log10(dig))))
        }
    }, [inputValue])

    const checkRange = (v: number) => {
        if (isNaN(v)) {
            return false;
        }
        let result = true;
        if (min) {
            result = result && v >= min * dig;
        }
        if (max && result) {
            result = result && v <= max * dig;
        }
        return result;
    }
    return (
        <div className={classNames('ui-input', 'ui-input-number', {
            [`ui-input-${size}`]: size,
            'focus': focus
        })}>
            <input type={'text'}
                   name={name}
                   ref={(r) => {
                       if (r) {
                           inputRef.current = r;
                       }
                   }}
                   placeholder={placeholder}
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}
                   onChange={event => {
                       const {value} = event.target;
                        const number = Number(value) * dig;
                        if (number && checkRange(number)) {
                            setValue(number);
                        }
                   }}/>
                   <span className={'ui-input-number-picker'}>
                       <span onClick={() => {
                           const b = checkRange(inputValue + step);
                           if (b) {
                               setValue(inputValue + step)
                           }
                       }}><Icon type={'arrow-up'}/></span>
                       <span onClick={() => {
                           const b = checkRange(inputValue - step);
                           if (b) {
                               setValue(inputValue - step)
                           }
                       }}><Icon type={'arrow-down'}/></span>
                   </span>
        </div>)
}

Num.displayName = 'Input.Number';
Num.defaultProps = {
    size: "default",
    steps: 1
}