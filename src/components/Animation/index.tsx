import React, {ReactElement, ReactNode} from "react";
import {CSSTransition} from "react-transition-group";

export type AnimationType = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';
export interface AnimationApi {
    animate: (node: ReactNode, props: AnimationProps) => ReactElement;
}

export interface AnimationProps {
    type?: AnimationType;
    show?: boolean;
    classNames?: string;
    timeout: number;
    appear?: boolean;
    unmountOnExit?: boolean;
    wrapper?: boolean
}

export const Animation: React.FC<AnimationProps> = ({
                                                        classNames,
                                                        show,
                                                        type,
                                                        children,
                                                        wrapper,
                                                        ...rest}) => {
    let element = children;
    if (wrapper) {
        element = <span>{children}</span>
    }
    return <CSSTransition classNames={classNames || type} in={show} {...rest}>
        {element}
    </CSSTransition>
}

Animation.defaultProps = {
    type: "zoom-in-top",
    appear: true,
    unmountOnExit: true,
    wrapper: false
}

const animation: AnimationApi = {
    animate: (node, props) => {
        return <Animation {...props}>
            {node}
        </Animation>
    }
}

export default animation;