import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../../services/staff.service";
import { staffKeys } from "../staff.keys";

export const useDeleteStaffMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => staffService.deleteStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
        },
    });
};
