import { NavigationFragment, NavigationItemFragment } from "@/types/graphql";

export interface NavigationStore {
    navigation: NavigationFragment[];
    topNavigation: NavigationItemFragment[];
    adminNavigation: NavigationItemFragment[];
    loading: boolean;
    error: string | null;
    currentNavigationItem: NavigationItemFragment | null;
    setCurrentNavigationItem: (navigationItem: NavigationItemFragment | null) => void;
    fetchNavigation: () => Promise<void>;
}