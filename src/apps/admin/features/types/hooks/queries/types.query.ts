import { useQuery } from "@tanstack/react-query";
import { typeService } from "../../services/type.service";

export const typeKeys = {
    all: ['types'] as const,
    lists: () => [...typeKeys.all, 'list'] as const,
};

export const useTypesQuery = () => {
    return useQuery({
        queryKey: typeKeys.lists(),
        queryFn: () => typeService.getTypes(),
    });
};
