// Date utility functions with Indian Standard Time (IST)

export const formatDateIST = (dateString: string | null, options: {
    includeTime?: boolean;
    format?: 'short' | 'long' | 'medium';
} = {}) => {
    if (!dateString) return 'Never';

    const { includeTime = true, format = 'medium' } = options;

    const baseOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata'
    };

    switch (format) {
        case 'short':
            return new Date(dateString).toLocaleDateString('en-IN', {
                ...baseOptions,
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                ...(includeTime && {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            });

        case 'long':
            return new Date(dateString).toLocaleDateString('en-IN', {
                ...baseOptions,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                ...(includeTime && {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            });

        case 'medium':
        default:
            return new Date(dateString).toLocaleDateString('en-IN', {
                ...baseOptions,
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                ...(includeTime && {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            });
    }
};

export const formatTimeIST = (dateString: string | null) => {
    if (!dateString) return 'Never';

    return new Date(dateString).toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

export const getCurrentISTTime = () => {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

export const getRelativeTimeIST = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);

    // Convert both dates to IST for comparison
    const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const dateIST = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    const diffInSeconds = Math.floor((nowIST.getTime() - dateIST.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return formatDateIST(dateString, { includeTime: false, format: 'short' });
    }
};