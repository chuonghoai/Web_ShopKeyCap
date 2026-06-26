export const useDashboardController = () => {
    
    const handleRefresh = () => {
        window.location.reload();
    };

    return {
        handleRefresh
    };
};
