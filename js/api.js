
const VEHICLES_API_URL = "./data/vehicles.json";

export async function fetchVehicles() {
    try {
        const response = await fetch(VEHICLES_API_URL);

        if (!response.ok) {
            throw new Error(
                `Failed to load vehicles. HTTP Status: ${response.status}`
            );
        }

        const vehicles = await response.json();

        if (!Array.isArray(vehicles)) {
            throw new Error("Invalid vehicle data format.");
        }

        return vehicles;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
