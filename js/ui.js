
const vehicleList = document.getElementById("vehicleList");
const vehicleCount = document.getElementById("vehicleCount");

const loadingIndicator = document.getElementById("loadingIndicator");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

const emptyMessage = document.getElementById("emptyMessage");

const vehicleDetails = document.getElementById("vehicleDetails");
const detailsContent = document.getElementById("detailsContent");

const brandFilter = document.getElementById("brandFilter");
const priceRangeError = document.getElementById("priceRangeError");

// Escape HTML to prevent HTML injection
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// Format vehicle price
function formatPrice(price) {
    if (!Number.isFinite(price)) {
        return "N/A";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price);
}

// Format vehicle mileage
function formatMileage(mileage) {
    if (!Number.isFinite(mileage)) {
        return "N/A";
    }

    return `${new Intl.NumberFormat("en-US").format(mileage)} km`;
}

// Show a fallback for missing vehicle fields
function displayValue(value) {
    if (value === undefined || value === null || value === "") {
        return "N/A";
    }

    return escapeHTML(value);
}

function getStatusClass(availability) {
    if (availability === "Available") {
        return "status-available";
    }

    if (availability === "Reserved") {
        return "status-reserved";
    }

    return "status-sold";
}

// Show Loading Indicator
export function showLoading() {
    loadingIndicator.classList.remove("d-none");
    errorMessage.classList.add("d-none");
    emptyMessage.classList.add("d-none");
    vehicleList.classList.add("d-none");
    vehicleDetails.classList.add("d-none");
}

// Hide Loading Indicator
export function hideLoading() {
    loadingIndicator.classList.add("d-none");
}

// Show Error Message
export function showError(message) {
    hideLoading();

    vehicleList.classList.add("d-none");
    emptyMessage.classList.add("d-none");

    errorText.textContent = message;
    errorMessage.classList.remove("d-none");
}

// Populate Brand Filter
export function renderBrandOptions(brands) {
    brandFilter.innerHTML = `
        <option value="">All Brands</option>

        ${brands.map(brand => `
            <option value="${escapeHTML(brand)}">
                ${escapeHTML(brand)}
            </option>
        `).join("")}
    `;
}

// Render Vehicle Cards
export function renderVehicles(vehicles) {
    vehicleCount.textContent = vehicles.length;

    vehicleList.innerHTML = "";

    if (vehicles.length === 0) {
        vehicleList.classList.add("d-none");
        emptyMessage.classList.remove("d-none");
        return;
    }

    emptyMessage.classList.add("d-none");
    vehicleList.classList.remove("d-none");

    const fragment = document.createDocumentFragment();

    vehicles.forEach(vehicle => {
        const column = document.createElement("div");

        column.className = "col-xl-4 col-md-6";

        const statusClass = getStatusClass(vehicle.availability);

        column.innerHTML = `
            <article class="vehicle-card" data-vehicle-id="${vehicle.id}">

                <img
                    src="${escapeHTML(vehicle.image ?? "")}"
                    class="vehicle-image"
                    alt="${displayValue(vehicle.brand)} ${displayValue(vehicle.model)}"
                    loading="lazy"
                >

                <div class="vehicle-card-body">

                    <span class="vehicle-brand">
                        ${displayValue(vehicle.brand)}
                    </span>

                    <h3 class="vehicle-title">
                        ${displayValue(vehicle.model)}
                    </h3>

                    <div class="vehicle-specs">

                        <span>
                            <i class="bi bi-calendar3"></i>
                            ${displayValue(vehicle.year)}
                        </span>

                        <span>
                            <i class="bi bi-speedometer2"></i>
                            ${formatMileage(vehicle.mileage)}
                        </span>

                    </div>

                    <div class="vehicle-card-footer">

                        <span class="vehicle-price">
                            ${formatPrice(vehicle.price)}
                        </span>

                        <span class="availability-badge ${statusClass}">
                            ${displayValue(vehicle.availability)}
                        </span>

                    </div>

                    <button
                        class="details-btn"
                        data-vehicle-id="${vehicle.id}"
                        type="button"
                    >
                        View Details
                        <i class="bi bi-arrow-right ms-1"></i>
                    </button>

                </div>

            </article>
        `;

        fragment.appendChild(column);
    });

    vehicleList.appendChild(fragment);
}

// Render Selected Vehicle Details
export function renderVehicleDetails(vehicle) {
    const statusClass = getStatusClass(vehicle.availability);

    detailsContent.innerHTML = `
        <div class="row g-4">

            <div class="col-lg-6">

                <img
                    src="${escapeHTML(vehicle.image ?? "")}"
                    alt="${displayValue(vehicle.brand)} ${displayValue(vehicle.model)}"
                    class="details-image"
                >

            </div>

            <div class="col-lg-6 details-info">

                <span class="section-label">
                    VEHICLE INFORMATION
                </span>

                <h2>
                    ${displayValue(vehicle.brand)}
                    ${displayValue(vehicle.model)}
                </h2>

                <div class="details-price mb-3">
                    ${formatPrice(vehicle.price)}
                </div>

                <p>
                    Complete information about this showroom vehicle.
                </p>

                <div class="row g-2">

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Year</span>
                            <strong>
                                ${displayValue(vehicle.year)}
                            </strong>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Mileage</span>
                            <strong>
                                ${formatMileage(vehicle.mileage)}
                            </strong>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Transmission</span>
                            <strong>
                                ${displayValue(vehicle.transmission)}
                            </strong>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Fuel Type</span>
                            <strong>
                                ${displayValue(vehicle.fuelType)}
                            </strong>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Color</span>
                            <strong>
                                ${displayValue(vehicle.color)}
                            </strong>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="detail-item">
                            <span>Availability</span>
                            <strong>
                                <span class="availability-badge ${statusClass}">
                                    ${displayValue(vehicle.availability)}
                                </span>
                            </strong>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    `;

    vehicleDetails.classList.remove("d-none");
    vehicleDetails.focus({ preventScroll: true });

    vehicleDetails.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Hide Vehicle Details
export function hideVehicleDetails() {
    vehicleDetails.classList.add("d-none");
}

// Show or hide the invalid price range message
export function setPriceRangeError(isInvalid) {
    priceRangeError.classList.toggle("d-none", !isInvalid);
}
