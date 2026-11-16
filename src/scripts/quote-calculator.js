/**
 * QUOTE ESTIMATOR & FORM VALIDATION
 * 
 * Provides live instant quote estimation based on home parameters
 * and accessible client-side form validation with a clear success state.
 */

const BASE_RATES = {
  standard: { base: 129, baseHours: 2.5, name: "Standard Cleaning" },
  deep: { base: 219, baseHours: 4.5, name: "Deep Cleaning" },
  move: { base: 289, baseHours: 6.0, name: "Move-In / Move-Out" }
};

const FREQUENCY_DISCOUNTS = {
  "one-time": { discount: 0, label: "One-Time Service" },
  "monthly": { discount: 0.05, label: "Monthly (5% off)" },
  "biweekly": { discount: 0.10, label: "Bi-Weekly (10% off)" },
  "weekly": { discount: 0.15, label: "Weekly (15% off)" }
};

export function initQuoteCalculator() {
  const form = document.getElementById("quote-form");
  const formCard = document.getElementById("quote-form-card");
  const successState = document.getElementById("quote-success-state");
  const resetBtn = document.getElementById("quote-reset-btn");

  if (!form) return;

  // Form Fields
  const nameInput = document.getElementById("quote-name");
  const emailInput = document.getElementById("quote-email");
  const phoneInput = document.getElementById("quote-phone");
  const serviceSelect = document.getElementById("quote-service");
  const bedroomsSelect = document.getElementById("quote-bedrooms");
  const bathroomsSelect = document.getElementById("quote-bathrooms");
  const frequencySelect = document.getElementById("quote-frequency");
  const messageInput = document.getElementById("quote-message");

  // Estimate Preview Elements
  const previewServiceEl = document.getElementById("preview-service-name");
  const previewRoomsEl = document.getElementById("preview-rooms");
  const previewDiscountRow = document.getElementById("preview-discount-row");
  const previewDiscountEl = document.getElementById("preview-discount-amount");
  const previewTotalEl = document.getElementById("preview-total-price");
  const previewHoursEl = document.getElementById("preview-hours");

  function calculateEstimate() {
    const serviceType = serviceSelect.value || "standard";
    const bedrooms = parseInt(bedroomsSelect.value || "2", 10);
    const bathrooms = parseInt(bathroomsSelect.value || "1", 10);
    const frequency = frequencySelect.value || "biweekly";

    const serviceData = BASE_RATES[serviceType] || BASE_RATES.standard;
    const freqData = FREQUENCY_DISCOUNTS[frequency] || FREQUENCY_DISCOUNTS["biweekly"];

    // Base price covers 1 bed, 1 bath
    const extraBedrooms = Math.max(0, bedrooms - 1);
    const extraBathrooms = Math.max(0, bathrooms - 1);

    const bedroomAddonRate = serviceType === "deep" ? 30 : serviceType === "move" ? 35 : 20;
    const bathroomAddonRate = serviceType === "deep" ? 35 : serviceType === "move" ? 40 : 25;

    const subtotal = serviceData.base + (extraBedrooms * bedroomAddonRate) + (extraBathrooms * bathroomAddonRate);
    const discountAmount = Math.round(subtotal * freqData.discount);
    const finalTotal = subtotal - discountAmount;

    // Estimate duration
    const estHours = serviceData.baseHours + (extraBedrooms * 0.4) + (extraBathrooms * 0.5);
    const roundedHoursMin = (estHours - 0.5).toFixed(1);
    const roundedHoursMax = (estHours + 0.5).toFixed(1);

    // Update Live Preview UI
    if (previewServiceEl) previewServiceEl.textContent = serviceData.name;
    if (previewRoomsEl) previewRoomsEl.textContent = `${bedrooms} Bed, ${bathrooms} Bath`;
    
    if (previewDiscountRow && previewDiscountEl) {
      if (discountAmount > 0) {
        previewDiscountRow.style.display = "flex";
        previewDiscountEl.textContent = `-$${discountAmount} (${Math.round(freqData.discount * 100)}%)`;
      } else {
        previewDiscountRow.style.display = "none";
      }
    }

    if (previewTotalEl) previewTotalEl.textContent = `$${finalTotal}`;
    if (previewHoursEl) previewHoursEl.textContent = `Approx. ${roundedHoursMin} – ${roundedHoursMax} hours`;

    return {
      serviceName: serviceData.name,
      rooms: `${bedrooms} Bed, ${bathrooms} Bath`,
      frequencyLabel: freqData.label,
      total: finalTotal,
      hours: `${roundedHoursMin} – ${roundedHoursMax} hrs`
    };
  }

  // Recalculate on any parameter change
  [serviceSelect, bedroomsSelect, bathroomsSelect, frequencySelect].forEach(input => {
    if (input) {
      input.addEventListener("change", calculateEstimate);
    }
  });

  // Run initial calculation
  calculateEstimate();

  // Handle "Book This Service" quick buttons from Services section
  document.querySelectorAll("[data-book-service]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetService = btn.getAttribute("data-book-service");
      if (serviceSelect && BASE_RATES[targetService]) {
        serviceSelect.value = targetService;
        calculateEstimate();
      }
      
      const quoteSection = document.getElementById("quote");
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" });
        nameInput.focus();
      }
    });
  });

  // Client-Side Validation Helpers
  function validateField(input, testFn, errorMsg) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const isValid = testFn(input.value.trim());

    if (!isValid) {
      input.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add("visible");
      }
      return false;
    } else {
      input.removeAttribute("aria-invalid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
      return true;
    }
  }

  // Real-time validation on blur
  nameInput.addEventListener("blur", () => {
    validateField(nameInput, val => val.length >= 2, "Please enter your full name.");
  });

  emailInput.addEventListener("blur", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, val => emailRegex.test(val), "Please enter a valid email address.");
  });

  phoneInput.addEventListener("blur", () => {
    const digits = phoneInput.value.replace(/\D/g, "");
    validateField(phoneInput, () => digits.length >= 7, "Please provide a valid phone number (at least 7 digits).");
  });

  // Form Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phoneInput.value.replace(/\D/g, "");

    const isNameValid = validateField(nameInput, val => val.length >= 2, "Please enter your full name.");
    const isEmailValid = validateField(emailInput, val => emailRegex.test(val), "Please enter a valid email address.");
    const isPhoneValid = validateField(phoneInput, () => phoneDigits.length >= 7, "Please provide a valid phone number.");
    const isServiceValid = validateField(serviceSelect, val => !!val, "Please select a service type.");

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid) {
      // Focus first invalid element
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Success State
    const estimate = calculateEstimate();
    const submissionData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: estimate.serviceName,
      rooms: estimate.rooms,
      frequency: estimate.frequencyLabel,
      estimatedPrice: `$${estimate.total}`,
      estimatedHours: estimate.hours,
      message: messageInput.value.trim() || "None specified"
    };

    // Update confirmation summary in success card
    const summaryContainer = document.getElementById("success-summary-details");
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <li><strong>Client:</strong> ${escapeHtml(submissionData.name)} (${escapeHtml(submissionData.email)})</li>
        <li><strong>Phone:</strong> ${escapeHtml(submissionData.phone)}</li>
        <li><strong>Service Requested:</strong> ${escapeHtml(submissionData.service)}</li>
        <li><strong>Home Configuration:</strong> ${escapeHtml(submissionData.rooms)}</li>
        <li><strong>Frequency:</strong> ${escapeHtml(submissionData.frequency)}</li>
        <li><strong>Estimated Total:</strong> ${escapeHtml(submissionData.estimatedPrice)} (${escapeHtml(submissionData.estimatedHours)})</li>
        <li><strong>Notes:</strong> ${escapeHtml(submissionData.message)}</li>
      `;
    }

    // Hide form, show success message
    form.style.display = "none";
    if (successState) {
      successState.classList.add("visible");
      successState.focus();
      successState.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Reset form handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      calculateEstimate();
      if (successState) successState.classList.remove("visible");
      form.style.display = "block";
      nameInput.focus();
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
