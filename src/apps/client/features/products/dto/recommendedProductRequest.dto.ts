import type { FilterState } from "./filterState.dto";

export interface RecommendedProductRequest extends FilterState {
    excludeTypes?: string[];
    limit?: number;
}