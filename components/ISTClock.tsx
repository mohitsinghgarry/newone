'use client';

import { useState, useEffect } from 'react';
import { getCurrentISTTime } from '@/lib/dateUtils';

interface ISTClockProps {
    format?: 'time' | 'datetime' | 'date';
    className?: string;
}

export default function ISTClock({ format = 'time', className = '' }: ISTClockProps) {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            switch (format) {
                case 'time':
                    setCurrentTime(now.toLocaleTimeString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }));
                    break;
                case 'date':
                    setCurrentTime(now.toLocaleDateString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }));
                    break;
                case 'datetime':
                default:
                    setCurrentTime(now.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }));
                    break;
            }
        };

        // Update immediately
        updateTime();

        // Update every second
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [format]);

    return (
        <span className={className} title="Indian Standard Time (IST)">
            {currentTime}
        </span>
    );
}