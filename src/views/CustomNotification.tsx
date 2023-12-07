import React from "react";
import { Notification, NotificationPosition } from '@hilla/react-components/Notification.js';
import { useEffect } from 'react';
interface NotificationProps {
    message: string;
    position: NotificationPosition;
    duration: string;
    theme: string;
}
export default function CustomNotification(props: NotificationProps) {

    useEffect(() => {
        const notification = Notification.show(props.message, {
            position: props.position,
            duration: parseInt(props.duration),
            theme: props.theme,
        });

        return () => {
            notification.close();
        };
    }, [props.message, props.position, props.duration, props.theme]);

    return (<></>);
}