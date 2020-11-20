import { createBrowserHistory } from 'history';
import React from 'react';
import Button from '../Button'
const history = createBrowserHistory();

export declare interface LinkConfig {
    href: string,
    query?: any
}

export declare interface LinkProps {
    to: string | LinkConfig;
    disabled?: boolean
}

const Link:React.FC<LinkProps> = (props) => {
    const {to, children, ...restProps} = props;

return (<Button type='link' 
    {...restProps}
    onClick={() => {
        if(typeof to === 'string') {
            history.push(to);
        } else {
            const location = to as LinkConfig;
            history.push(location.href, location.query)
        }
        }}>
            {children}
        </Button>)
}

Link.defaultProps = {
    disabled: false
}

export default Link;