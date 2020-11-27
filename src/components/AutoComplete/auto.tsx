import React, {ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import {Input} from "../Input/input";
import {InputPropsBase} from "../Input/common";
import animation from "../Animation";

export type Data<T = {}> = T & {
    label: string;
    value: any
}

export interface AutoCompleteProps extends Omit<InputPropsBase, 'onChange'>{
    fetch: (keyword: string) => Promise<Data<any>[]>;
    renderItem?: (item:Data<any>) => ReactNode;
    onChange?: (item:Data<any>) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const classes = classNames('ui-autocomplete');
    const {fetch, renderItem, onChange} = props;
    const [value, setValue] = useState<string>();
    const [keyword, setKeyword] = useState<string>();
    const [data, setData] = useState<Data<any>[]>([]);
    const [show, setShow] = useState(true)

    const handleItem = (item:Data<any>) => {
        if (renderItem) {
            return renderItem(item);
        }

        return item.label;
    }

    useEffect(() => {
        if (keyword && keyword.length > 0) {
            if (!show) {
                setShow(!show)
            }
            fetch(keyword).then(res => setData(res))
        }
    }, [keyword])

    return (<div className={classes}>
        <Input.Text {...props} value={value} onChange={v => {
            setKeyword(v);
        }}/>
        {animation.animate(
            <ul>
                {data.map(item => (
                    <li onClick={() => {
                        setValue(item.label);
                        setShow(false)
                    if (onChange) {
                        onChange(item)
                    }}}>
                        {handleItem(item)}
                    </li>
                ))}
            </ul>, {
            show: data?.length > 0 && show,
            timeout: 300,
        })}
    </div>)
}

AutoComplete.displayName = "AutoComplete";