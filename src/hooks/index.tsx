import React, {MutableRefObject, ReactElement, ReactNode, RefObject, useEffect, useState} from "react";

export function useRenderChildren<T>(children: ReactNode, name?: string, propsHandle?: (props: T) => void): ReactNode {
    return React.Children.map(children, (child) => {
        let element = child as ReactElement<T, any>;
        if (element) {
            const {displayName} = element.type;
            if (name && displayName === name) {
                if (propsHandle) {
                    propsHandle(element.props);
                }
                return element;
            }
        }
    })
}

export function useClickOutSide<T extends HTMLElement>(ref: RefObject<T| undefined>
    | MutableRefObject<T| undefined>, handle: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current|| ref.current.contains(event.target as Node)) {
                return
            }
            handle(event);
        }
        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handle])
}

export function useDebounce<T>(value: T, delay = 300) {
    const [debounce, setDebounce] = useState<T>();
    useEffect(() => {
        const handler = setTimeout(()=> {
            setDebounce(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay]);
    return debounce
}