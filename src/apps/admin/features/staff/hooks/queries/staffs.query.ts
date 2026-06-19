import { useQuery } from "@tanstack/react-query";
import { staffService } from "../../services/staff.service";
import { staffKeys } from "../staff.keys";

export const useStaffsQuery = (page: number, limit?: number, search?: string) => {
    return useQuery({
        queryKey: staffKeys.list({ page, limit, search }),
        queryFn: async () => {
            const response = await staffService.getStaffs(page, limit, search);
            return response;
        },
    });
};
