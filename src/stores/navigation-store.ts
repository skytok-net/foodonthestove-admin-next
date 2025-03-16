import { NavigationStore } from "@/types/navigation";
import { create } from "zustand";
import { NavigationDocument, NavigationFragment, NavigationItemFragment, NavigationQuery } from "@/types/graphql";
import { getClient } from "@/lib/apollo-client";

interface NavigationState extends NavigationStore {
    setCurrentNavigationItem: (navigationItem: NavigationItemFragment | null) => void;
    setNavigation: (navigation: NavigationFragment[]) => void;
    setTopNavigation: (navigation: NavigationItemFragment[]) => void;
    setAdminNavigation: (navigation: NavigationItemFragment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchNavigation: () => Promise<void>;
    isReady: boolean;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
    navigation: [],
    topNavigation: [],
    adminNavigation: [],
    loading: false,
    error: null,
    isReady: false,
    currentNavigationItem: null,
    setCurrentNavigationItem: (navigationItem: NavigationItemFragment | null) => set({ currentNavigationItem: navigationItem }),
    setNavigation: (navigation: NavigationFragment[]) => set({ navigation }),
    setTopNavigation: (navigation: NavigationItemFragment[]) => set({ topNavigation: navigation }),
    setAdminNavigation: (navigation: NavigationItemFragment[]) => set({ adminNavigation: navigation }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    fetchNavigation: async () => {
        try {
            // Don't fetch if we're already loading or have data
            if (get().loading || (get().isReady && get().topNavigation.length > 0)) {
                return;
            }
            
            set({ loading: true, error: null });
            
            const client = getClient();
            const { data, error } = await client.query<NavigationQuery>({
                query: NavigationDocument,
                fetchPolicy: "network-only",
            });
            
            if (error) {
                console.error("Navigation fetch error:", error);
                set({ 
                    error: error.message, 
                    loading: false,
                    isReady: false
                });
                return;
            }
            
            const topNavigation: NavigationItemFragment[] = [];
            const adminNavigation: NavigationItemFragment[] = [];
            const navigation: NavigationFragment[] = [];
            
            data.navigationCollection?.edges?.forEach((edge: { node: NavigationFragment }) => {
                if (edge) {
                    navigation.push(edge.node);
                    if (edge.node.key === "top") {
                        edge.node.navigationItemsCollection?.edges?.forEach((itemEdge: { node: NavigationItemFragment }) => {
                            if (itemEdge) {
                                topNavigation.push(itemEdge.node);
                            }
                        });
                    } else if (edge.node.key === "admin") {
                        edge.node.navigationItemsCollection?.edges?.forEach((itemEdge: { node: NavigationItemFragment }) => {
                            if (itemEdge) {
                                adminNavigation.push(itemEdge.node);
                            }
                        });
                    }
                }
            });
            
            set({ 
                topNavigation, 
                adminNavigation, 
                navigation, 
                loading: false,
                isReady: true
            });
        } catch (err) {
            console.error("Unexpected navigation error:", err);
            set({ 
                error: err instanceof Error ? err.message : "Unknown navigation error", 
                loading: false,
                isReady: false
            });
        }
    },
}));
