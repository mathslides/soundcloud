import React, { useEffect } from 'react';
import { Notification } from '@/components/ui';
import { CloseButton } from '..';

const CustomNotification = ({ type, message, mediaContent, onClose }) => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         onClose(); // Call the onClose callback after 10 seconds
    //     }, 10000);

    //     // Clear the timer when the component unmounts or when onClose is called manually
    //     return () => clearTimeout(timer);
    // }, [onClose]);

    return (
        <Notification className="mb-4" type={type}>
            <div className="flex items-center">
                {mediaContent && (
                    <div className="mr-2">
                        {mediaContent.type === 'image' && (
                            <img
                                src={mediaContent.url}
                                alt="Notification Image"
                                className="rounded-circle"
                                style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                        )}
                        {mediaContent.type === 'video' && (
                            <video
                                src={mediaContent.url}
                                controls
                                className="rounded-circle"
                                style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                        )}
                        {mediaContent.type === 'gif' && (
                            <img
                                src={mediaContent.url}
                                alt="Notification GIF"
                                className="rounded-circle"
                                style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                        )}
                    </div>
                )}
                <div>{message}</div>
                <CloseButton
                    type="button"
                    onClick={onClose}
                    className="notification-close" defaultStyle={false} absolute={true}
                >
                    &times;
                </CloseButton>
            </div>
        </Notification>
    );
};

export default CustomNotification;
