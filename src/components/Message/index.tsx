import React, {ReactNode} from 'react';
import Message, {render} from "./message";

interface MessageProvider {
    success: (msg: string, duration?: number) => void;
    warn: (msg: string, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
}

const message: MessageProvider = {
    success: (msg, duration) => {
        render(<Message text={msg} type={"success"}/>, duration);
    },
    warn: (msg, duration) => {
        render(<Message text={msg} type={"warn"}/>, duration);
    },
    info: (msg, duration) => {
        render(<Message text={msg} type={"info"}/>, duration);
    },
    error: (msg, duration) => {
        render(<Message text={msg} type={"error"}/>, duration);
    }
}

export default message;