import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../../services/staff.service";
import { staffKeys } from "../staff.keys";
import type { UpdateStaffRequest } from "../../models/update-staff.request";

export const useUpdateStaffMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateStaffRequest) => staffService.updateStaff(request),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
            queryClient.invalidateQueries({ queryKey: staffKeys.detail(variables.id) });
        },
    });
};
