import { useProfileQuery } from "../../../features/profile/hooks/queries/useProfile.query";

export const useProfileController = () => {
    const { data: profile, isLoading, error } = useProfileQuery();

    return {
        profile,
        isLoading,
        error
    };
};
