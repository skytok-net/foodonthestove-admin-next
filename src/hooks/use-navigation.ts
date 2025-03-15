
import { useNavigationStore } from "@/stores/navigation-store";
import { useEffect } from "react";

export const useNavigation = () => {
    const { fetchNavigation, ...store} = useNavigationStore();

    useEffect(() => {
        const fetch = async () => {
            await fetchNavigation();
        };
        fetch();
    }, [fetchNavigation]);
    
    return { ...store };
};  