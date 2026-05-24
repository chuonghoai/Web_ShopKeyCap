import type { FilterState } from "./filterState.dto";

export interface ListProductRequest {
    page: number;
    pageSize: number;
    filter?: FilterState;
}