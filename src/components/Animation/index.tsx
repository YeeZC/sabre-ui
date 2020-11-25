import React, {ReactElement, ReactNode} from "react";
import {CSSTransition} from "react-transition-group";

export type AnimationType = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';
export interface AnimationApi {
    animate: (node: ReactNode, props: AnimationProps) => ReactElement;
}

export interface AnimationProps {
    type?: AnimationType;
    in?: boolean;
    classNames?: string;
    timeout: number;
    appear?: boolean;
    unmountOnExit?: boolean;
}

export const Animation: React.FC<AnimationProps> = ({classNames, type, children, ...rest}) => {
    return <CSSTransition classNames={classNames || type} {...rest}>
        {children}
    </CSSTransition>
}

Animation.defaultProps = {
    type: "zoom-in-top",
    appear: true,
    unmountOnExit: true
}

const animation: AnimationApi = {
    animate: (node, props) => {
        return <Animation {...props}>
            {node}
        </Animation>
    }
}

export default animation;