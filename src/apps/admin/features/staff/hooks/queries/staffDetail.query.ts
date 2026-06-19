import { useQuery } from "@tanstack/react-query";
import { staffService } from "../../services/staff.service";
import { staffKeys } from "../staff.keys";

export const useStaffDetailQuery = (id: number) => {
    return useQuery({
        queryKey: staffKeys.detail(id),
        queryFn: async () => {
            const response = await staffService.getStaffById(id);
            return response;
        },
        enabled: !!id,
    });
};
