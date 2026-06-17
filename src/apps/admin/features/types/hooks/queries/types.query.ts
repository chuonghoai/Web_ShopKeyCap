import { useQuery } from "@tanstack/react-query";
import { typeService } from "../../services/type.service";
import { typeKeys } from "../type.keys";

export const useTypesQuery = () => {
    return useQuery({
        queryKey: typeKeys.lists(),
        queryFn: () => typeService.getTypes(),
    });
};
