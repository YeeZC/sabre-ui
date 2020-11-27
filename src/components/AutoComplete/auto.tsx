import React, {ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import {Input} from "../Input/input";
import {InputPropsBase} from "../Input/common";
import animation from "../Animation";
import {useDebounce} from "../../hooks";
import Icon from "../Icon";
import {Empty} from "../Empty/empty";

export type Data<T = {}> = T & {
    label: string;
    value: any
}

export interface AutoCompleteProps extends Omit<InputPropsBase, 'onChange' | 'prefix' | 'defaultValue' | 'value' | 'name'>{
    fetch: (keyword: string) => Promise<Data<any>[]>;
    renderItem?: (item:Data<any>) => ReactNode;
    onChange?: (item:Data<any>) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const classes = classNames('ui-autocomplete');
    const {fetch, renderItem, onChange} = props;
    const [value, setValue] = useState<Data<any>>({});
    const [keyword, setKeyword] = useState<string>();
    const [data, setData] = useState<Data<any>[]>([]);
    const [show, setShow] = useState(true)
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(keyword, 200);

    const handleItem = (item:Data<any>) => {
        if (renderItem) {
            return renderItem(item);
        }

        return item.label;
    }

    useEffect(() => {
        if (debounce && debounce.length > 0) {
            if (!show) {
                setShow(!show)
            }
            fetch(debounce).then(res => {
                setData(res)
                setLoading(false)
            })
        } else {
            setShow(false)
        }
    }, [debounce])

    return (<div className={classes}>
        <Input.Text {...props} name={undefined} value={value.label} onChange={v => {
            if (v.length > 0) {
                setShow(true)
                setLoading(true)
            }
            setKeyword(v);
        }} onFocus={() => {
            if (!show && (keyword && keyword?.length > 0)) {
                setShow(true)
            }
        }} onBlur={() => setShow(false)}/>
        {animation.animate(
            <ul>
                {loading ?
                    <li className={'loading'}><Icon type={'sync'} spinning/></li>
                    : data.length > 0 ? data.map((item, index) => (
                    <li key={index} onClick={() => {
                        setValue(item);
                        setShow(false)
                    if (onChange) {
                        onChange(item)
                    }}}>
                        {handleItem(item)}
                    </li>
                )) :
                <li className={'empty'}><Empty style={{padding: '1rem 2rem'}}/></li>
                }
            </ul>, {
            show,
            timeout: 300,
        })}
    </div>)
}

AutoComplete.displayName = "AutoComplete";