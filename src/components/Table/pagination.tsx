import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {Select} from "../../index";
import {OptionProps} from "../Select/option";
import {RequestParam} from "./data";

export interface PaginationProps {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (current: number, pageSize: number) => void;
    pages?: number[]
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const {onChange} = props;
    const total = props.total || 0;
    const [request, setRequest] = useState<RequestParam>({
        current: props.current || 1,
        pageSize: props.pageSize || 10
    });
    const [pages, setPages] = useState(props.pages || [])
    const [options, setOptions] = useState<OptionProps[]>([]);
    const pageCount: number = total / request.pageSize + (total % request.pageSize > 0 ? 1 : 0);
    const length = pageCount > 0 ? pageCount : 1;

    useEffect(() => {
        if (onChange) {
            onChange(request.current, request.pageSize)
        }
    }, [request]);

    useEffect(() => {
        if (pages) {
            setOptions(pages.map(page => ({
                label: `${page} 条/页`,
                value: page
            })))
        }
    }, [pages])

    useEffect(() => {
        if (request.pageSize) {
            if (!pages.includes(request.pageSize)) {
                setPages(prevState => {
                    const result = [...prevState, request.pageSize];
                    result.sort((a, b) => a - b)
                    return result;
                })
            }

        }
    }, [request.pageSize])

    const renderPageItem = () => {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(
                <li key={i}
                    onClick={() => {
                        if (request.current !== i + 1) {
                            setRequest({
                                ...request,
                                current: i + 1
                            })
                        }
                    }}
                    className={classNames('ui-pagination-btn', {
                        'active': request.current === i + 1
                    })}>{i + 1}</li>
            )
        }
        return result;
    }
    return (
        <div className={'ui-pagination-wrapper'}>
            <ul className={'ui-pagination'}>
                <li className={classNames('ui-pagination-btn', 'ui-pagination-prev', {
                    'disabled': request.current === 1
                })}/>
                {renderPageItem()}
                <li className={classNames('ui-pagination-btn', 'ui-pagination-next', {
                    'disabled': request.current === length
                })}/>
                <li className={'ui-pagination-select'}>
                    <Select multiSelect={false} defaultValue={request.pageSize} options={options} onChange={(value => {
                        if (value[0]) {
                            setRequest({
                                ...request,
                                pageSize: value[0]
                            })
                        }
                    })}/>
                </li>
            </ul>
        </div>
    )
}

Pagination.defaultProps = {
    pageSize: 10,
    current: 1,
    total: 0,
    pages: [10, 20, 30, 50, 100]
}