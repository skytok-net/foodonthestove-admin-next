
import { useNavigationStore } from "@/stores/navigation-store";
import { useEffect } from "react";

export const useNavigation = () => {
    const { fetchNavigation, ...store} = useNavigationStore();
    const { topNavigation } = store;

    useEffect(() => {
        const fetch = async () => {
            await fetchNavigation();
        };
        fetch();
    }, [fetchNavigation]);
    
    // Provide a fallback for topNavItems if it doesn't exist
    const topNavItems = topNavigation || [];
    
    // Determine if the current path is in the admin section
    const isAdminSection = typeof window !== 'undefined' && 
        window.location.pathname.startsWith('/admin') && 
        window.location.pathname !== '/admin/dashboard';
    
    return { 
        ...store,
        topNavItems,
        isAdminSection
    };
};
