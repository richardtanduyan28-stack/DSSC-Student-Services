/**
 * ==========================================================================
 * DSSC STUDENT SERVICES DASHBOARD - JAVASCRIPT
 * Davao del Sur State College (Educational Laboratory Prototype)
 * Features:
 *  1. DSSC Portal Login Screen Gateway (Student & Admin Entrance)
 *  2. Mobile Navigation Drawer Controls
 *  3. Real-Time Table Search / Filtering
 *  4. Character Counter & File Upload Label Handler
 *  5. Form Validation & Dynamic Request Submission
 *  6. View Request Details Modal Dialog
 *  7. Role Switcher & Profile Adaptation
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. DSSC Portal Login Screen Gateway & Logout Handler
  // ------------------------------------------------------------------------
  const loginScreen = document.getElementById("loginScreen");
  const appLayout = document.getElementById("appLayout");
  const loginForm = document.getElementById("loginForm");
  const tabStudent = document.getElementById("tabStudent");
  const tabAdmin = document.getElementById("tabAdmin");
  const loginIdLabel = document.getElementById("loginIdLabel");
  const loginIdInput = document.getElementById("loginId");
  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  const quickStudentBtn = document.getElementById("quickStudentBtn");
  const quickAdminBtn = document.getElementById("quickAdminBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  let selectedRole = "student";

  function setLoginRole(role) {
    selectedRole = role;
    if (role === "admin") {
      if (tabStudent) tabStudent.classList.remove("active");
      if (tabAdmin) tabAdmin.classList.add("active");
      if (loginIdLabel) loginIdLabel.textContent = "Employee / Staff ID";
      if (loginIdInput) loginIdInput.value = "ADMIN-2026-001";
      if (loginSubmitBtn) loginSubmitBtn.innerHTML = `<span>Sign In as Administrator</span> &rarr;`;
    } else {
      if (tabAdmin) tabAdmin.classList.remove("active");
      if (tabStudent) tabStudent.classList.add("active");
      if (loginIdLabel) loginIdLabel.textContent = "Student ID";
      if (loginIdInput) loginIdInput.value = "2024-00124";
      if (loginSubmitBtn) loginSubmitBtn.innerHTML = `<span>Sign In as Student</span> &rarr;`;
    }
  }

  if (tabStudent) {
    tabStudent.addEventListener("click", () => setLoginRole("student"));
  }

  if (tabAdmin) {
    tabAdmin.addEventListener("click", () => setLoginRole("admin"));
  }

  function enterDashboard(role) {
    applyRole(role);
    if (loginScreen) {
      loginScreen.hidden = true;
      loginScreen.style.display = "none";
    }
    if (appLayout) {
      appLayout.style.display = "flex";
    }
  }

  function exitToLogin() {
    if (appLayout) {
      appLayout.style.display = "none";
    }
    if (loginScreen) {
      loginScreen.hidden = false;
      loginScreen.style.display = "flex";
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      enterDashboard(selectedRole);
    });
  }

  if (quickStudentBtn) {
    quickStudentBtn.addEventListener("click", () => {
      setLoginRole("student");
      enterDashboard("student");
    });
  }

  if (quickAdminBtn) {
    quickAdminBtn.addEventListener("click", () => {
      setLoginRole("admin");
      enterDashboard("admin");
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", exitToLogin);
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Sidebar Navigation Drawer Controls
  // ------------------------------------------------------------------------
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const navLinks = document.querySelectorAll(".nav-link");

  function openSidebar() {
    if (sidebar) sidebar.classList.add("is-open");
    if (sidebarOverlay) sidebarOverlay.classList.add("is-active");
    if (sidebarToggleBtn) sidebarToggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("is-open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("is-active");
    if (sidebarToggleBtn) sidebarToggleBtn.setAttribute("aria-expanded", "false");
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", () => {
      const isOpen = sidebar && sidebar.classList.contains("is-open");
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // ------------------------------------------------------------------------
  // 2b. Sidebar Navigation Links & Interactive Routing
  // ------------------------------------------------------------------------
  const navDashboard = document.getElementById("navDashboard");
  const navRequests = document.getElementById("navRequests");
  const navRequestService = document.getElementById("navRequestService");
  const navAcademic = document.getElementById("navAcademic");
  const navClearance = document.getElementById("navClearance");
  const navSettings = document.getElementById("navSettings");

  function setActiveNavLink(activeLink) {
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    if (activeLink) {
      activeLink.classList.add("active");
      activeLink.setAttribute("aria-current", "page");
    }
    if (window.innerWidth < 1100) {
      closeSidebar();
    }
  }

  function highlightCard(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.classList.remove("card-highlight-active");
    void element.offsetWidth; // Trigger reflow for animation restart
    element.classList.add("card-highlight-active");
    setTimeout(() => element.classList.remove("card-highlight-active"), 1600);
  }

  if (navDashboard) {
    navDashboard.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navDashboard);
      const mainContent = document.getElementById("mainContent");
      if (mainContent) mainContent.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (navRequests) {
    navRequests.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navRequests);
      const reqCard = document.getElementById("recent-requests-card");
      highlightCard(reqCard);
    });
  }

  if (navRequestService) {
    navRequestService.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navRequestService);
      const formCard = document.getElementById("service-form-card");
      highlightCard(formCard);
      setTimeout(() => {
        const catSelect = document.getElementById("serviceCategory");
        if (catSelect) catSelect.focus();
      }, 400);
    });
  }

  if (navAcademic) {
    navAcademic.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navAcademic);
      openModalById("academicStatusModal");
    });
  }

  if (navClearance) {
    navClearance.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navClearance);
      openModalById("clearanceModal");
    });
  }

  if (navSettings) {
    navSettings.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavLink(navSettings);
      openModalById("settingsModal");
    });
  }

  // ------------------------------------------------------------------------
  // 3. Real-Time Table Search Filter
  // ------------------------------------------------------------------------
  const tableSearchInput = document.getElementById("tableSearchInput");
  const requestsTableBody = document.getElementById("requestsTableBody");
  const showingRowsCount = document.getElementById("showingRowsCount");
  const totalRowsCount = document.getElementById("totalRowsCount");

  function updateTableCounts() {
    if (!requestsTableBody) return;
    const allRows = requestsTableBody.querySelectorAll("tr");
    let visibleCount = 0;
    allRows.forEach((row) => {
      if (row.style.display !== "none") visibleCount++;
    });

    if (showingRowsCount) showingRowsCount.textContent = visibleCount;
    if (totalRowsCount) totalRowsCount.textContent = allRows.length;
  }

  if (tableSearchInput && requestsTableBody) {
    tableSearchInput.addEventListener("input", () => {
      const query = tableSearchInput.value.toLowerCase().trim();
      const rows = requestsTableBody.querySelectorAll("tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
      updateTableCounts();
    });
  }

  // ------------------------------------------------------------------------
  // 4. Form Input Handlers (Character Counter & File Upload)
  // ------------------------------------------------------------------------
  const requestDetailsTextarea = document.getElementById("requestDetails");
  const charCounter = document.getElementById("charCounter");
  const supportingDocInput = document.getElementById("supportingDoc");
  const chosenFileName = document.getElementById("chosenFileName");

  if (requestDetailsTextarea && charCounter) {
    requestDetailsTextarea.addEventListener("input", () => {
      const len = requestDetailsTextarea.value.length;
      charCounter.textContent = `${len}/500`;
      if (len >= 10) {
        clearError(requestDetailsTextarea, document.getElementById("detailsError"));
      }
    });
  }

  if (supportingDocInput && chosenFileName) {
    supportingDocInput.addEventListener("change", () => {
      if (supportingDocInput.files && supportingDocInput.files.length > 0) {
        chosenFileName.textContent = supportingDocInput.files[0].name;
      } else {
        chosenFileName.textContent = "No file chosen";
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Form Validation & Dynamic Submission
  // ------------------------------------------------------------------------
  const serviceForm = document.getElementById("serviceRequestForm");
  const serviceCategorySelect = document.getElementById("serviceCategory");
  const categoryError = document.getElementById("categoryError");
  const detailsError = document.getElementById("detailsError");
  const formSuccessMessage = document.getElementById("formSuccessMessage");
  const successDetailText = document.getElementById("successDetailText");
  const resetBtn = document.getElementById("resetBtn");
  const metricPendingCount = document.getElementById("metricPendingCount");

  let nextRequestSeq = 105;

  function showError(field, errorEl, msg) {
    field.classList.add("is-invalid");
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.hidden = false;
    }
  }

  function clearError(field, errorEl) {
    field.classList.remove("is-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.hidden = true;
    }
  }

  if (serviceCategorySelect) {
    serviceCategorySelect.addEventListener("change", () => {
      if (serviceCategorySelect.value.trim() !== "") {
        clearError(serviceCategorySelect, categoryError);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearError(serviceCategorySelect, categoryError);
      clearError(requestDetailsTextarea, detailsError);
      if (charCounter) charCounter.textContent = "0/500";
      if (chosenFileName) chosenFileName.textContent = "No file chosen";
      if (formSuccessMessage) formSuccessMessage.hidden = true;
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formSuccessMessage) formSuccessMessage.hidden = true;

      let isValid = true;
      const catVal = serviceCategorySelect ? serviceCategorySelect.value.trim() : "";
      const detailsVal = requestDetailsTextarea ? requestDetailsTextarea.value.trim() : "";

      if (catVal === "") {
        showError(serviceCategorySelect, categoryError, "Please select a service category.");
        isValid = false;
      } else {
        clearError(serviceCategorySelect, categoryError);
      }

      if (detailsVal === "") {
        showError(requestDetailsTextarea, detailsError, "Please provide brief details of your request.");
        isValid = false;
      } else if (detailsVal.length < 10) {
        showError(requestDetailsTextarea, detailsError, `Please enter at least 10 characters (current: ${detailsVal.length}).`);
        isValid = false;
      } else {
        clearError(requestDetailsTextarea, detailsError);
      }

      if (!isValid) {
        if (catVal === "") {
          serviceCategorySelect.focus();
        } else {
          requestDetailsTextarea.focus();
        }
        return;
      }

      // Generate new Tracking ID & Formatted Date
      const generatedId = `DSSC-2026-0${nextRequestSeq++}`;
      const dateOpts = { month: "short", day: "2-digit", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", dateOpts).format(new Date());

      // Create new table row matching screenshot styling
      const newRow = document.createElement("tr");
      newRow.setAttribute("data-id", generatedId);
      newRow.setAttribute("data-type", catVal);
      newRow.setAttribute("data-date", formattedDate);
      newRow.setAttribute("data-status", "Pending");
      newRow.setAttribute("data-notes", detailsVal);

      newRow.innerHTML = `
        <td data-label="Request ID">
          <div class="req-id-cell">
            <span class="row-type-icon" aria-hidden="true">📄</span>
            <span class="id-code">${generatedId}</span>
          </div>
        </td>
        <td class="service-name" data-label="Service Type">${escapeHtml(catVal)}</td>
        <td class="date-cell" data-label="Date Filed">${formattedDate}</td>
        <td data-label="Status">
          <span class="status-pill pill-pending">
            <span class="status-dot"></span> Pending
          </span>
        </td>
        <td data-label="Actions">
          <div class="row-action-cell">
            <button type="button" class="btn-row-view" aria-label="View request ${generatedId}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>View</span>
              <span class="chevron" aria-hidden="true">&rsaquo;</span>
            </button>
            <div class="admin-inline-actions" hidden>
              <button type="button" class="btn-adm-approve" title="Approve this request">Approve</button>
              <button type="button" class="btn-adm-process" title="Mark as processing">Process</button>
            </div>
          </div>
        </td>
      `;

      if (requestsTableBody) {
        requestsTableBody.insertBefore(newRow, requestsTableBody.firstChild);
      }

      // Increment Pending metric counter
      if (metricPendingCount) {
        const count = parseInt(metricPendingCount.textContent, 10) || 0;
        metricPendingCount.textContent = `${count + 1} Pending`;
      }

      // Display success alert
      if (successDetailText) {
        successDetailText.innerHTML = `Your <strong>${escapeHtml(catVal)}</strong> has been recorded with ID <strong>${generatedId}</strong>.`;
      }
      if (formSuccessMessage) {
        formSuccessMessage.hidden = false;
        formSuccessMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Reset form
      serviceForm.reset();
      if (charCounter) charCounter.textContent = "0/500";
      if (chosenFileName) chosenFileName.textContent = "No file chosen";
      updateTableCounts();
    });
  }

  // ------------------------------------------------------------------------
  // 6. View Request Details Modal Handler (Guaranteed Hidden by Default)
  // ------------------------------------------------------------------------
  const viewModal = document.getElementById("viewRequestModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalReqId = document.getElementById("modalReqId");
  const modalServiceType = document.getElementById("modalServiceType");
  const modalDateFiled = document.getElementById("modalDateFiled");
  const modalStatusBadge = document.getElementById("modalStatusBadge");
  const modalNotes = document.getElementById("modalNotes");

  let previousActiveElement = null;

  function openModal(row) {
    if (!viewModal || !row) return;
    previousActiveElement = document.activeElement;

    const reqId = row.getAttribute("data-id") || row.querySelector(".id-code")?.textContent.trim();
    const sType = row.getAttribute("data-type") || row.querySelector(".service-name")?.textContent.trim();
    const dDate = row.getAttribute("data-date") || row.querySelector(".date-cell")?.textContent.trim();
    const status = row.getAttribute("data-status") || "Pending";
    const notes = row.getAttribute("data-notes") || "Submitted for student records verification and administrative processing.";

    if (modalReqId) modalReqId.textContent = reqId;
    if (modalServiceType) modalServiceType.textContent = sType;
    if (modalDateFiled) modalDateFiled.textContent = dDate;
    if (modalNotes) modalNotes.textContent = notes;

    let badgeClass = "pill-pending";
    if (status.toLowerCase().includes("approved")) badgeClass = "pill-approved";
    if (status.toLowerCase().includes("processing")) badgeClass = "pill-processing";

    if (modalStatusBadge) {
      modalStatusBadge.innerHTML = `
        <span class="status-pill ${badgeClass}">
          <span class="status-dot"></span> ${escapeHtml(status)}
        </span>
      `;
    }

    viewModal.style.display = "flex";
    viewModal.classList.add("is-open");
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (viewModal) {
      viewModal.style.display = "none";
      viewModal.classList.remove("is-open");
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener("click", closeModal);

  if (viewModal) {
    viewModal.addEventListener("click", (e) => {
      if (e.target === viewModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && viewModal && viewModal.style.display !== "none") {
      closeModal();
    }
  });

  // Table row click listener for "View" button & Admin inline actions
  if (requestsTableBody) {
    requestsTableBody.addEventListener("click", (e) => {
      const viewBtn = e.target.closest(".btn-row-view");
      if (viewBtn) {
        const row = viewBtn.closest("tr");
        openModal(row);
        return;
      }

      // Admin Approve Action
      const approveBtn = e.target.closest(".btn-adm-approve");
      if (approveBtn) {
        const row = approveBtn.closest("tr");
        const statusCell = row.querySelector(".status-pill");
        if (statusCell) {
          statusCell.className = "status-pill pill-approved";
          statusCell.innerHTML = `<span class="status-dot"></span> Approved`;
          row.setAttribute("data-status", "Approved");
        }
        approveBtn.disabled = true;
        approveBtn.textContent = "Approved";

        if (metricPendingCount) {
          const c = parseInt(metricPendingCount.textContent, 10) || 0;
          if (c > 0) metricPendingCount.textContent = c - 1;
        }
        return;
      }

      // Admin Process Action
      const processBtn = e.target.closest(".btn-adm-process");
      if (processBtn) {
        const row = processBtn.closest("tr");
        const statusCell = row.querySelector(".status-pill");
        if (statusCell) {
          statusCell.className = "status-pill pill-processing";
          statusCell.innerHTML = `<span class="status-dot"></span> Processing`;
          row.setAttribute("data-status", "Processing");
        }
        processBtn.disabled = true;
        processBtn.textContent = "In Process";
        return;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. Role Switcher & Profile Adaptation
  // ------------------------------------------------------------------------
  const profileAvatar = document.getElementById("profileAvatar");
  const profileName = document.getElementById("profileName");
  const profileMeta = document.getElementById("profileMeta");
  const serviceFormCard = document.getElementById("service-form-card");
  const adminNoticeBanner = document.getElementById("adminNoticeBanner");
  const navItemRequestService = document.getElementById("navItemRequestService");
  const navLabelRequests = document.getElementById("navLabelRequests");

  const cardTitle1 = document.getElementById("cardTitle1");
  const cardMetric1 = document.getElementById("cardMetric1");
  const cardDesc1 = document.getElementById("cardDesc1");

  const cardTitle2 = document.getElementById("cardTitle2");
  const cardDesc2 = document.getElementById("cardDesc2");

  const cardTitle3 = document.getElementById("cardTitle3");
  const cardMetric3 = document.getElementById("cardMetric3");
  const cardDesc3 = document.getElementById("cardDesc3");

  function applyRole(role) {
    if (role === "admin") {
      document.body.classList.add("admin-mode");

      // 1. Profile details for Admin
      if (profileAvatar) profileAvatar.textContent = "RG";
      if (profileName) profileName.textContent = "Office of Registrar";
      if (profileMeta) profileMeta.textContent = "DSSC Staff - Registrar";

      // 2. Hide student form from Admin view
      if (serviceFormCard) serviceFormCard.hidden = true;
      if (navItemRequestService) navItemRequestService.hidden = true;
      if (navLabelRequests) navLabelRequests.textContent = "Manage Requests";

      // 3. Switch summary metrics for Admin
      if (cardTitle1) cardTitle1.textContent = "Total Enrolled";
      if (cardMetric1) cardMetric1.textContent = "1,420";
      if (cardDesc1) cardDesc1.textContent = "Officially enrolled college students";

      if (cardTitle2) cardTitle2.textContent = "Pending Requests";
      if (metricPendingCount) metricPendingCount.textContent = "3";
      if (cardDesc2) cardDesc2.textContent = "Awaiting approval or review";

      if (cardTitle3) cardTitle3.textContent = "Processed Today";
      if (cardMetric3) cardMetric3.textContent = "18";
      if (cardDesc3) cardDesc3.textContent = "Requests approved today";
    } else {
      document.body.classList.remove("admin-mode");

      // 1. Revert to Student Profile (Juan Dela Cruz Santos)
      if (profileAvatar) profileAvatar.textContent = "JS";
      if (profileName) profileName.textContent = "Juan Dela Cruz Santos";
      if (profileMeta) profileMeta.textContent = "BSIT - 3rd Year";

      // 2. Restore student form
      if (serviceFormCard) serviceFormCard.hidden = false;
      if (navItemRequestService) navItemRequestService.hidden = false;
      if (navLabelRequests) navLabelRequests.textContent = "My Requests";

      // 3. Student Summary Cards: Shows their Account, Request & Clearance Status!
      if (cardTitle1) cardTitle1.textContent = "Active Units";
      if (cardMetric1) cardMetric1.textContent = "21 Units";
      if (cardDesc1) cardDesc1.textContent = "Enrollment: Approved (1st Sem)";

      if (cardTitle2) cardTitle2.textContent = "Pending Requests";
      if (metricPendingCount) metricPendingCount.textContent = "3 Pending";
      if (cardDesc2) cardDesc2.textContent = "3 Requests awaiting review";

      if (cardTitle3) cardTitle3.textContent = "Clearance Deficiencies";
      if (cardMetric3) cardMetric3.textContent = "2 Deficiencies";
      if (cardDesc3) cardDesc3.textContent = "Library & Dept requirements pending";
    }
  }

  // Helper function to safely escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ------------------------------------------------------------------------
  // 8. Generic Modal Open / Close Helpers (for named modals)
  // ------------------------------------------------------------------------
  function openModalById(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    previousActiveElement = document.activeElement;
    modal.style.display = "flex";
    modal.classList.add("is-open");
    const closeBtn = modal.querySelector(".modal-close-btn, [data-close-modal]");
    if (closeBtn) closeBtn.focus();
  }

  function closeModalById(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "none";
    modal.classList.remove("is-open");
    if (previousActiveElement && typeof previousActiveElement.focus === "function") {
      previousActiveElement.focus();
    }
  }

  // Delegated click handler: data-close-modal buttons & backdrop clicks
  document.addEventListener("click", (e) => {
    // Close via data-close-modal attribute
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModalById(closeBtn.getAttribute("data-close-modal"));
      return;
    }
    // Close by clicking the backdrop element directly (excluding viewRequestModal which has its own handler)
    if (
      e.target.classList.contains("modal-backdrop") &&
      e.target.id !== "viewRequestModal"
    ) {
      closeModalById(e.target.id);
    }
    // Close notification popover if clicking outside it
    const notifPopover = document.getElementById("notificationPopover");
    const notifBtn = document.getElementById("notificationBtn");
    if (
      notifPopover &&
      notifPopover.style.display !== "none" &&
      !notifPopover.contains(e.target) &&
      e.target !== notifBtn &&
      !notifBtn?.contains(e.target)
    ) {
      notifPopover.style.display = "none";
      if (notifBtn) notifBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Extended Escape key handler: closes any open named modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const modalIds = [
      "academicStatusModal",
      "clearanceModal",
      "settingsModal",
      "userProfileModal",
      "helpModal",
    ];
    for (const id of modalIds) {
      const modal = document.getElementById(id);
      if (modal && modal.style.display !== "none") {
        closeModalById(id);
        return;
      }
    }
    // Close notification popover on Escape
    const notifPopover = document.getElementById("notificationPopover");
    if (notifPopover && notifPopover.style.display !== "none") {
      notifPopover.style.display = "none";
      const nb = document.getElementById("notificationBtn");
      if (nb) {
        nb.setAttribute("aria-expanded", "false");
        nb.focus();
      }
    }
  });

  // ------------------------------------------------------------------------
  // 9. Toast Notification Helper
  // ------------------------------------------------------------------------
  function showToast(message, type) {
    const toastType = type || "success";
    const toast = document.createElement("div");
    toast.className = `portal-toast portal-toast--${toastType}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${toastType === "success" ? "✔" : toastType === "error" ? "✖" : "ℹ"}</span>
      <span class="toast-msg">${escapeHtml(message)}</span>
    `;
    document.body.appendChild(toast);
    // Trigger slide-in animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add("toast-visible");
      });
    });
    // Auto-remove after 3.5 s
    setTimeout(() => {
      toast.classList.remove("toast-visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3500);
  }

  // ------------------------------------------------------------------------
  // 10. Notification Bell Popover
  // ------------------------------------------------------------------------
  const notificationBtn = document.getElementById("notificationBtn");
  const notificationPopover = document.getElementById("notificationPopover");
  const markAllReadBtn = document.getElementById("markAllReadBtn");
  const clearNotifsBtn = document.getElementById("clearNotifsBtn");
  const notifBadge = document.getElementById("notifBadge");
  const notifUnreadCount = document.getElementById("notifUnreadCount");

  if (notificationBtn && notificationPopover) {
    notificationBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = notificationPopover.style.display !== "none";
      if (isOpen) {
        notificationPopover.style.display = "none";
        notificationBtn.setAttribute("aria-expanded", "false");
      } else {
        notificationPopover.style.display = "block";
        notificationBtn.setAttribute("aria-expanded", "true");
        notificationPopover.focus?.();
      }
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const unreadItems = document.querySelectorAll(".notif-item.unread");
      unreadItems.forEach((item) => item.classList.remove("unread"));
      if (notifBadge) {
        notifBadge.textContent = "0";
        notifBadge.hidden = true;
      }
      if (notifUnreadCount) notifUnreadCount.textContent = "0";
      if (notificationBtn) notificationBtn.setAttribute("aria-label", "Notifications, 0 new alerts");
      showToast("All notifications marked as read.", "success");
    });
  }

  if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener("click", () => {
      const notifList = document.getElementById("notifList");
      if (notifList) {
        notifList.innerHTML = `
          <li class="notif-item notif-empty" style="padding:1rem;color:var(--text-muted);text-align:center;font-size:.85rem;">
            No notifications at this time.
          </li>`;
      }
      if (notifBadge) {
        notifBadge.textContent = "0";
        notifBadge.hidden = true;
      }
      if (notifUnreadCount) notifUnreadCount.textContent = "0";
      if (notificationPopover) notificationPopover.style.display = "none";
      if (notificationBtn) {
        notificationBtn.setAttribute("aria-expanded", "false");
        notificationBtn.setAttribute("aria-label", "Notifications, 0 new alerts");
      }
      showToast("All notifications cleared.", "success");
    });
  }

  // ------------------------------------------------------------------------
  // 11. Summary / Metric Card Click Handlers
  // ------------------------------------------------------------------------
  const summaryCard1 = document.getElementById("summaryCard1");
  const summaryCard2 = document.getElementById("summaryCard2");
  const summaryCard3 = document.getElementById("summaryCard3");

  function activateCard(cardEl, handler) {
    if (!cardEl) return;
    cardEl.addEventListener("click", handler);
    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    });
  }

  activateCard(summaryCard1, () => {
    openModalById("academicStatusModal");
  });

  activateCard(summaryCard2, () => {
    // Filter the table to show Pending rows
    const searchInput = document.getElementById("tableSearchInput");
    if (searchInput) {
      searchInput.value = "pending";
      searchInput.dispatchEvent(new Event("input"));
    }
    const reqCard = document.getElementById("recent-requests-card");
    if (reqCard) {
      reqCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    showToast("Showing pending requests.", "info");
  });

  activateCard(summaryCard3, () => {
    openModalById("clearanceModal");
  });

  // ------------------------------------------------------------------------
  // 12. View All Button
  // ------------------------------------------------------------------------
  const viewAllBtn = document.getElementById("viewAllBtn");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      // Clear any active filter and show all rows
      const searchInput = document.getElementById("tableSearchInput");
      if (searchInput && searchInput.value !== "") {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
      }
      const reqCard = document.getElementById("recent-requests-card");
      highlightCard(reqCard);
      setActiveNavLink(navRequests);
    });
  }

  // ------------------------------------------------------------------------
  // 13. Simple Pagination (3 rows per page)
  // ------------------------------------------------------------------------
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const page1Btn = document.getElementById("page1Btn");
  const page2Btn = document.getElementById("page2Btn");
  const ROWS_PER_PAGE = 3;
  let currentPage = 1;

  function getPaginatedRows() {
    if (!requestsTableBody) return [];
    return Array.from(requestsTableBody.querySelectorAll("tr"));
  }

  function renderPage(page) {
    currentPage = page;
    const rows = getPaginatedRows();
    const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
    const start = (page - 1) * ROWS_PER_PAGE;

    rows.forEach((row, idx) => {
      row.style.display = idx >= start && idx < start + ROWS_PER_PAGE ? "" : "none";
    });

    // Update page button active states
    if (page1Btn) {
      page1Btn.classList.toggle("active", page === 1);
      page1Btn.setAttribute("aria-current", page === 1 ? "page" : "false");
    }
    if (page2Btn) {
      page2Btn.classList.toggle("active", page === 2);
      page2Btn.setAttribute("aria-current", page === 2 ? "page" : "false");
      page2Btn.disabled = totalPages < 2;
    }
    if (prevPageBtn) prevPageBtn.disabled = page <= 1;
    if (nextPageBtn) nextPageBtn.disabled = page >= totalPages;

    // Update showing count
    const visibleCount = rows.filter((r) => r.style.display !== "none").length;
    if (showingRowsCount) showingRowsCount.textContent = visibleCount;
  }

  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) renderPage(currentPage - 1);
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", () => {
      const total = Math.ceil(getPaginatedRows().length / ROWS_PER_PAGE);
      if (currentPage < total) renderPage(currentPage + 1);
    });
  }
  if (page1Btn) {
    page1Btn.addEventListener("click", () => renderPage(1));
  }
  if (page2Btn) {
    page2Btn.addEventListener("click", () => renderPage(2));
  }

  // ------------------------------------------------------------------------
  // 14. User Profile Widget → Open Profile Modal
  // ------------------------------------------------------------------------
  const userProfileWidget = document.getElementById("userProfile");
  if (userProfileWidget) {
    userProfileWidget.addEventListener("click", () => {
      openModalById("userProfileModal");
    });
    userProfileWidget.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModalById("userProfileModal");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 15. Help / FAQ Modal Trigger
  // ------------------------------------------------------------------------
  const helpModalBtn = document.getElementById("helpModalBtn");
  if (helpModalBtn) {
    helpModalBtn.addEventListener("click", () => {
      openModalById("helpModal");
    });
  }

  // ------------------------------------------------------------------------
  // 16. Modal Action Buttons (Print Slip, Print COR, Request Recheck, Save Settings, Profile Academic)
  // ------------------------------------------------------------------------
  const modalPrintBtn = document.getElementById("modalPrintBtn");
  if (modalPrintBtn) {
    modalPrintBtn.addEventListener("click", () => {
      closeModalById("academicStatusModal");
      showToast("Preparing Academic Record for printing…", "info");
      setTimeout(() => window.print(), 600);
    });
  }

  const printCorBtn = document.getElementById("printCorBtn");
  if (printCorBtn) {
    printCorBtn.addEventListener("click", () => {
      closeModalById("clearanceModal");
      showToast("Preparing Certificate of Registration for printing…", "info");
      setTimeout(() => window.print(), 600);
    });
  }

  const requestRecheckBtn = document.getElementById("requestRecheckBtn");
  if (requestRecheckBtn) {
    requestRecheckBtn.addEventListener("click", () => {
      closeModalById("clearanceModal");
      showToast("Clearance re-check request submitted successfully.", "success");
    });
  }

  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      closeModalById("settingsModal");
      showToast("Settings saved successfully.", "success");
    });
  }

  const profileAcademicBtn = document.getElementById("profileAcademicBtn");
  if (profileAcademicBtn) {
    profileAcademicBtn.addEventListener("click", () => {
      closeModalById("userProfileModal");
      openModalById("academicStatusModal");
    });
  }

  // ------------------------------------------------------------------------
  // Initial setup: ensure student role metrics and modal closed
  // ------------------------------------------------------------------------
  applyRole("student");
  closeModal();
  updateTableCounts();
  renderPage(1);
});
