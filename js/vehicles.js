const normalize = text =>
    String(text ?? "")
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();

function toPrice(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const price = Number(value);

    return Number.isFinite(price) ? Math.max(0, price) : null;
}

export function getUniqueBrands(vehicles) {
    const brands = vehicles.map(vehicle => vehicle.brand);

    return [...new Set(brands)].sort();
}

export function hasInvalidPriceRange(filters) {
    const min = toPrice(filters.minPrice);
    const max = toPrice(filters.maxPrice);

    return min !== null && max !== null && min > max;
}

export function filterVehicles(vehicles, filters) {
    const searchTerms = normalize(filters.search).split(" ").filter(Boolean);
    const min = toPrice(filters.minPrice);
    const max = toPrice(filters.maxPrice);

    return vehicles.filter(vehicle => {

        const searchableText = normalize(
            `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`
        );

        const hasPrice = Number.isFinite(vehicle.price);

        const matchesSearch = searchTerms.every(term =>
            searchableText.includes(term)
        );

        const matchesBrand =
            !filters.brand ||
            vehicle.brand === filters.brand;

        const matchesAvailability =
            !filters.availability ||
            vehicle.availability === filters.availability;

        const matchesMinPrice =
            min === null ||
            (hasPrice && vehicle.price >= min);

        const matchesMaxPrice =
            max === null ||
            (hasPrice && vehicle.price <= max);

        return (
            matchesSearch &&
            matchesBrand &&
            matchesAvailability &&
            matchesMinPrice &&
            matchesMaxPrice
        );
    });
}
