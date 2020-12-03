import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {Select} from "../../index";

export interface PaginationProps {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (current: number, pageSize: number) => void
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const {onChange} = props;
    const total = props.total || 0;
    const [current, setCurrent] = useState(props.current || 1)
    const [pageSize, setPageSize] = useState(props.pageSize || 10)
    const pageCount: number = total / pageSize + (total % pageSize > 0 ? 1 : 0);
    const length = pageCount > 0 ? pageCount : 1;

    useEffect(() => {
        if (onChange) {
            onChange(current, pageSize)
        }
    }, [current, pageSize])

    const renderPageItem = () => {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(
                <li key={i}
                    onClick={() => {
                        if (current !== i + 1) {
                            setCurrent(i + 1)
                        }
                    }}
                    className={classNames('ui-pagination-btn', {
                        'active': current === i + 1
                    })}>{i + 1}</li>
            )
        }
        return result;
    }
    return (
        <ul className={'ui-pagination'}>
            <li className={classNames('ui-pagination-btn', 'ui-pagination-prev', {
                'disabled': current === 1
            })}/>
            {renderPageItem()}
            <li className={classNames('ui-pagination-btn', 'ui-pagination-next', {
                'disabled': current === length
            })}/>
            <li className={'ui-pagination-select'}>
                <Select multiSelect={false} defaultValue={pageSize} options={[
                    {
                        label: '10条/页',
                        value: 10
                    }, {
                        label: '20条/页',
                        value: 20
                    }, {
                        label: '30条/页',
                        value: 30
                    }, {
                        label: '50条/页',
                        value: 50
                    }, {
                        label: '100条/页',
                        value: 100
                    }
                ]} onChange={(value => {
                    setPageSize(value[0])
                })}/>
            </li>
        </ul>
    )
}

Pagination.defaultProps = {
    pageSize: 10,
    current: 1,
    total: 0
}