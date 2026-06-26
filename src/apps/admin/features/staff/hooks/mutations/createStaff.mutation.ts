import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../../services/staff.service";
import { staffKeys } from "../staff.keys";
import type { CreateStaffRequest } from "../../models/create-staff.request";

export const useCreateStaffMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateStaffRequest) => staffService.createStaff(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
        },
    });
};
