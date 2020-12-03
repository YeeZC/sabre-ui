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
    }, [request.pageSize]);

    const click = (e: React.MouseEvent, current: number) => {
        e.preventDefault();
        const fix = current <= 0 ? 1 : current > length ? length : current;
        if (request.current !== fix) {
            setRequest({
                ...request,
                current: fix
            })
        }
    }

    const renderPageItem = (page: number) => {
        return <li key={page}
                   onClick={(e) => click(e, page)}
                   className={classNames('ui-pagination-btn', {
                       'active': request.current === page
                   })}>{page}</li>
    }

    const renderNext5 = () => {
        return <li key={-2} className={'ui-pagination-next5'} onClick={e => click(e, request.current + 5)}/>
    }

    const renderPrev5 = () => {
        return <li key={-2} className={'ui-pagination-prev5'} onClick={e => click(e, request.current - 5)}/>
    }

    const left = () => {
        const result = [];
        const {current} = request;
        if (current - 5 >= 0) {
            result.push(renderPageItem(1));
            result.push(renderPrev5());
            for (let i = current - 3; i < current && current <= length - 5; i++) {
                result.push(renderPageItem(i + 1))
            }
        } else {
            for (let i = 0; i < Math.min(length, 5); i++) {
                result.push(renderPageItem(i + 1))
            }
        }
        return result;
    }

    const right = () => {
        const result = [];
        const {current} = request;
        if (current + 5 <= length) {
            for (let i = current; i < current + 2 && current >= 5; i++) {
                result.push(renderPageItem(i + 1));
            }
            result.push(renderNext5());
            result.push(renderPageItem(length));
        } else {
            for (let i = length - 5; i < length; i++) {
                result.push(renderPageItem(i + 1))
            }
        }
        return result;
    }

    const renderPageBtn = () => {
        return [...left(), ...right()]
    }

    return (
        <div className={'ui-pagination-wrapper'}>
            <ul className={'ui-pagination'}>
                <li className={classNames('ui-pagination-btn', 'ui-pagination-prev', {
                    'disabled': request.current === 1
                })} onClick={e => click(e, request.current - 1)}/>
                {left()}
                {right()}
                <li className={classNames('ui-pagination-btn', 'ui-pagination-next', {
                    'disabled': request.current === length
                })} onClick={e => click(e, request.current + 1)}/>
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