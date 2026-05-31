import type { ProductOption, ProductVariant } from "../model/variant.model";

export type OptionValueStatus = "selected" | "available" | "disabled";

export interface OptionValueWithStatus {
    value: string;
    status: OptionValueStatus;
}

export interface OptionWithStatus {
    name: string;
    values: OptionValueWithStatus[];
}

export function getAvailableOptionsWithStatus(
    variants: ProductVariant[],
    selectedAttributes: Record<string, string>,
    allOptions: ProductOption[]
): OptionWithStatus[] {
    return allOptions.map((option) => {
        const values: OptionValueWithStatus[] = option.values.map((value) => {
            const hypothetical: Record<string, string> = {
                ...selectedAttributes,
                [option.name]: value,
            };

            const hasValidVariant = variants.some((variant) => {
                const allHypotheticalKeysMatch = Object.entries(hypothetical).every(
                    ([key, val]) => variant.attributes[key] === val
                );
                return allHypotheticalKeysMatch && variant.stockQuantity > 0;
            });

            let status: OptionValueStatus;
            if (selectedAttributes[option.name] === value) {
                status = "selected";
            } else if (hasValidVariant) {
                status = "available";
            } else {
                status = "disabled";
            }

            return { value, status };
        });

        return { name: option.name, values };
    });
}

export function findMatchingVariant(
    variants: ProductVariant[],
    selectedAttributes: Record<string, string>,
    allOptions: ProductOption[]
): ProductVariant | null {
    const isFullySelected = allOptions.every((opt) => selectedAttributes[opt.name] !== undefined);
    if (!isFullySelected) return null;

    return (
        variants.find((variant) => {
            const variantKeys = Object.keys(variant.attributes);
            const selectedKeys = Object.keys(selectedAttributes);

            if (variantKeys.length !== selectedKeys.length) return false;

            return variantKeys.every(
                (key) => variant.attributes[key] === selectedAttributes[key]
            );
        }) ?? null
    );
}

export function getAttributesFromSku(
    variants: ProductVariant[],
    sku: string
): Record<string, string> | null {
    const matched = variants.find((v) => v.sku === sku);
    return matched ? { ...matched.attributes } : null;
}

export function sanitizeSelectedAttributes(
    variants: ProductVariant[],
    updatedAttributes: Record<string, string>,
    allOptions: ProductOption[]
): Record<string, string> {
    let sanitized: Record<string, string> = {};

    for (const option of allOptions) {
        const selectedValue = updatedAttributes[option.name];
        if (selectedValue === undefined) continue;

        const hypothetical = { ...sanitized, [option.name]: selectedValue };
        const hasValidVariant = variants.some((variant) => {
            const allMatch = Object.entries(hypothetical).every(
                ([key, val]) => variant.attributes[key] === val
            );
            return allMatch && variant.stockQuantity > 0;
        });

        if (hasValidVariant) {
            sanitized[option.name] = selectedValue;
        }
    }

    return sanitized;
}
