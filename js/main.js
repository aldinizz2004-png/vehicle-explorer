
import { fetchVehicles } from "./api.js";

import {
    filterVehicles,
    getUniqueBrands,
    hasInvalidPriceRange
} from "./vehicles.js";

import {
    showLoading,
    hideLoading,
    showError,
    renderVehicles,
    renderBrandOptions,
    renderVehicleDetails,
    hideVehicleDetails,
    setPriceRangeError
} from "./ui.js";

// Application State
let allVehicles = [];
let isDataReady = false;
let selectedVehicleId = null;

// DOM Elements
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");

const availabilityFilter =
    document.getElementById("availabilityFilter");

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

const resetFiltersButton =
    document.getElementById("resetFilters");

const retryButton = document.getElementById("retryButton");

const emptyResetButton =
    document.getElementById("emptyResetButton");

const closeDetailsButton =
    document.getElementById("closeDetails");

const vehicleList = document.getElementById("vehicleList");

// Load Application Data
async function initializeApp() {
    isDataReady = false;
    showLoading();

    try {
        allVehicles = await fetchVehicles();

        if (allVehicles.length === 0) {
            showError("No vehicles are available in the showroom right now.");
            return;
        }

        const selectedBrand = brandFilter.value;

        renderBrandOptions(getUniqueBrands(allVehicles));

        brandFilter.value = selectedBrand;

        if (brandFilter.selectedIndex === -1) {
            brandFilter.value = "";
        }

        isDataReady = true;

        hideLoading();

        applyFilters();

    } catch (error) {
        console.error("Application Initialization Error:", error);

        showError(
            "Unable to load showroom vehicles. Please check your connection and try again."
        );
    }
}

// Get Current Filter Values
function getCurrentFilters() {
    return {
        search: searchInput.value.trim(),
        brand: brandFilter.value,
        availability: availabilityFilter.value,
        minPrice: minPriceInput.value,
        maxPrice: maxPriceInput.value
    };
}

// Apply Filters
function applyFilters() {
    if (!isDataReady) {
        return;
    }

    const filters = getCurrentFilters();

    setPriceRangeError(hasInvalidPriceRange(filters));

    const filteredVehicles = filterVehicles(
        allVehicles,
        filters
    );

    renderVehicles(filteredVehicles);

    const selectionStillVisible = filteredVehicles.some(
        vehicle => vehicle.id === selectedVehicleId
    );

    if (selectedVehicleId !== null && !selectionStillVisible) {
        closeDetails();
    }
}

// Close Vehicle Details
function closeDetails() {
    selectedVehicleId = null;
    hideVehicleDetails();
}

// Reset All Filters
function resetFilters() {
    searchInput.value = "";
    brandFilter.value = "";
    availabilityFilter.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";

    applyFilters();
}

// Event Listeners

// Search
searchInput.addEventListener("input", applyFilters);

// Brand Filter
brandFilter.addEventListener("change", applyFilters);

// Availability Filter
availabilityFilter.addEventListener("change", applyFilters);

// Minimum Price
minPriceInput.addEventListener("input", applyFilters);

// Maximum Price
maxPriceInput.addEventListener("input", applyFilters);

// Reset Filters
resetFiltersButton.addEventListener("click", resetFilters);

// Empty State Reset
emptyResetButton.addEventListener("click", resetFilters);

// Retry Loading
retryButton.addEventListener("click", initializeApp);

// Close Details
closeDetailsButton.addEventListener("click", closeDetails);

// Event Delegation
vehicleList.addEventListener("click", event => {

    const vehicleCard = event.target.closest("[data-vehicle-id]");

    if (!vehicleCard) {
        return;
    }

    const vehicleId = Number(
        vehicleCard.dataset.vehicleId
    );

    const selectedVehicle = allVehicles.find(
        vehicle => vehicle.id === vehicleId
    );

    if (selectedVehicle) {
        selectedVehicleId = vehicleId;
        renderVehicleDetails(selectedVehicle);
    }
});

// Start Application
initializeApp();
