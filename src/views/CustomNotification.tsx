import React from "react";
import { Notification, NotificationPosition } from '@hilla/react-components/Notification.js';
import { useEffect } from 'react';

/**
 * Parameter input interface for CustomNotification.  Fields required in object creation.
 */
interface NotificationProps {
    message: string;
    position: NotificationPosition;
    duration: string;
    theme: string;
}

/**
 * Objcect that creates a custom notification to reduce repetive code.
 * @param props parameters (message, position, duration, theme)
 */
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