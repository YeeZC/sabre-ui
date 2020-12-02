import React from "react";
import {UploadProps} from "./upload";

export interface DragProps extends UploadProps {

}

export const Drag: React.FC<DragProps> = (props) => {
    return <span/>
}

Drag.displayName = "Drag";