import React, {ReactElement, ReactNode} from "react";

export function useRenderChildren<T>(children: ReactNode, name?: string): ReactNode {
    return React.Children.map(children, (child) => {
        let element = child as ReactElement<T, any>;
        if (element) {
            const {displayName} = element.type;
            if (name && displayName === name) {
                return element;
            }
        }
    })
}