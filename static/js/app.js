/**
 * AuthenSight - AI Fake Identity & Document Screening System
 * Core Client-Side Logic & REST API Integration
 */

// Global state
let currentFile = null;
let currentPreset = null;
let currentScreeningResult = null;

// Clock initialization
function updateClock() {
    const clockEl = document.getElementById("systemClock");
    if (clockEl) {
        const now = new Date();
        clockEl.textContent = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
    }
}
setInterval(updateClock, 1000);
updateClock();

// Mobile sidebar toggle
const mobileMenuBtn = document.getElementById("mobileMenuToggle");
const appSidebar = document.getElementById("appSidebar");
if (mobileMenuBtn && appSidebar) {
    mobileMenuBtn.addEventListener("click", () => {
        appSidebar.classList.toggle("open");
    });
}

// Security & Privacy Modal
function showPrivacyModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById("privacyModal");
    if (modal) modal.style.display = "flex";
}

function closePrivacyModal() {
    const modal = document.getElementById("privacyModal");
    if (modal) modal.style.display = "none";
}

/* ==========================================================================
   Dashboard Page Logic
   ========================================================================== */

async function loadDashboardMetrics() {
    try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
        const stats = await res.json();

        const kpiTotal = document.getElementById("kpiTotal");
        const kpiGenuine = document.getElementById("kpiGenuine");
        const kpiSuspicious = document.getElementById("kpiSuspicious");
        const kpiHighRisk = document.getElementById("kpiHighRisk");

        if (kpiTotal) kpiTotal.textContent = stats.total || 0;
        if (kpiGenuine) kpiGenuine.textContent = stats.genuine || 0;
        if (kpiSuspicious) kpiSuspicious.textContent = stats.suspicious || 0;
        if (kpiHighRisk) kpiHighRisk.textContent = stats.high_risk || 0;

        const kpiGenPct = document.getElementById("kpiGenuinePct");
        const kpiSusPct = document.getElementById("kpiSuspiciousPct");
        const kpiRiskPct = document.getElementById("kpiHighRiskPct");

        if (kpiGenPct) kpiGenPct.textContent = `${stats.genuine_percentage}%`;
        if (kpiSusPct) kpiSusPct.textContent = `${stats.suspicious_percentage}%`;
        if (kpiRiskPct) kpiRiskPct.textContent = `${stats.high_risk_percentage}%`;
    } catch (err) {
        console.error("Error loading metrics:", err);
    }
}

async function loadRecentScreenings() {
    const tbody = document.getElementById("recentScreeningsBody");
    if (!tbody) return;

    try {
        const res = await fetch("/api/history?limit=10");
        if (!res.ok) throw new Error("Failed to fetch recent records");
        const records = await res.json();

        if (!records.length) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No screening records found.</td></tr>`;
            return;
        }

        tbody.innerHTML = records.map(rec => {
            const statusClass = rec.status === "GENUINE" ? "genuine" :
                                rec.status === "SUSPICIOUS" ? "suspicious" : "high-risk";
            const name = (rec.ocr && rec.ocr.name) ? rec.ocr.name : "N/A";
            return `
                <tr>
                    <td class="font-mono"><strong>${rec.screening_id}</strong></td>
                    <td>${rec.document_type || "Passport"}</td>
                    <td>${name}</td>
                    <td>${rec.date_time || rec.date || "Just now"}</td>
                    <td>
                        <strong class="${rec.risk_score >= 70 ? 'text-danger' : rec.risk_score >= 40 ? 'text-suspicious' : 'text-genuine'}">
                            ${rec.risk_score}%
                        </strong>
                    </td>
                    <td><span class="status-badge ${statusClass}">${rec.status}</span></td>
                    <td>
                        <a href="/report/${rec.screening_id}" class="btn btn-secondary btn-xs">View Dossier</a>
                    </td>
                </tr>
            `;
        }).join("");
    } catch (err) {
        console.error("Error loading recent records:", err);
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-danger">Failed to load recent screening records.</td></tr>`;
    }
}

function launchPresetScreening(presetKey) {
    sessionStorage.setItem("authensight_preset", presetKey);
    window.location.href = "/screening";
}

/* ==========================================================================
   Document Screening Page Logic
   ========================================================================== */

function triggerFileInput() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.click();
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById("dropzoneArea");
    if (dropzone) dropzone.classList.add("dragover");
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById("dropzoneArea");
    if (dropzone) dropzone.classList.remove("dragover");
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById("dropzoneArea");
    if (dropzone) dropzone.classList.remove("dragover");

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileChosen(e.dataTransfer.files);
    }
}

function handleFileChosen(files) {
    if (!files || !files.length) return;
    const file = files[0];

    // Client-side file validation
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
    const fileNameLower = file.name.toLowerCase();
    const isValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

    if (!isValidExt) {
        alert("Invalid file format. Please provide a JPG, PNG, WEBP, or PDF identity document scan.");
        return;
    }

    if (file.size > 25 * 1024 * 1024) {
        alert("File exceeds maximum allowed size of 25MB.");
        return;
    }

    currentFile = file;
    currentPreset = null;

    // Reset dropdown preset if custom file is selected
    const presetSelect = document.getElementById("samplePresetSelect");
    if (presetSelect) presetSelect.value = "";

    displayFilePreview(file);
}

function displayFilePreview(file) {
    const prompt = document.getElementById("dropzonePrompt");
    const preview = document.getElementById("dropzonePreview");
    const previewImage = document.getElementById("previewImage");
    const fileNameEl = document.getElementById("previewFileName");
    const fileSizeEl = document.getElementById("previewFileSize");
    const startBtn = document.getElementById("startScreeningBtn");

    if (prompt) prompt.style.display = "none";
    if (preview) preview.style.display = "block";

    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = (file.size / (1024 * 1024)).toFixed(2) + " MB";

    const reader = new FileReader();
    reader.onload = (e) => {
        if (previewImage) previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);

    if (startBtn) startBtn.disabled = false;
}

function onPresetSelectChange(presetValue) {
    if (!presetValue) return;
    currentPreset = presetValue;
    currentFile = null;

    const presetMap = {
        "genuine": { file: "sample_genuine_passport.jpg", name: "Genuine_Indian_Passport.jpg", size: "1.2 MB", type: "Passport" },
        "tampered_dob": { file: "sample_tampered_dob.jpg", name: "Tampered_DOB_Passport.jpg", size: "1.4 MB", type: "Passport" },
        "photo_tampering": { file: "sample_photo_tampered.jpg", name: "Spliced_Photo_Passport.jpg", size: "1.3 MB", type: "Passport" },
        "invalid_mrz": { file: "sample_invalid_mrz.jpg", name: "Invalid_MRZ_Passport.jpg", size: "1.1 MB", type: "Passport" }
    };

    const target = presetMap[presetValue] || presetMap["genuine"];

    const prompt = document.getElementById("dropzonePrompt");
    const preview = document.getElementById("dropzonePreview");
    const previewImage = document.getElementById("previewImage");
    const fileNameEl = document.getElementById("previewFileName");
    const fileSizeEl = document.getElementById("previewFileSize");
    const startBtn = document.getElementById("startScreeningBtn");
    const docTypeSelect = document.getElementById("documentType");

    if (prompt) prompt.style.display = "none";
    if (preview) preview.style.display = "block";

    if (previewImage) previewImage.src = `/static/images/presets/${target.file}`;
    if (fileNameEl) fileNameEl.textContent = target.name;
    if (fileSizeEl) fileSizeEl.textContent = target.size;
    if (docTypeSelect) docTypeSelect.value = target.type;

    if (startBtn) startBtn.disabled = false;
}

function resetUpload(e) {
    if (e) e.stopPropagation();
    currentFile = null;
    currentPreset = null;

    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";

    const presetSelect = document.getElementById("samplePresetSelect");
    if (presetSelect) presetSelect.value = "";

    const prompt = document.getElementById("dropzonePrompt");
    const preview = document.getElementById("dropzonePreview");
    const previewImage = document.getElementById("previewImage");
    const startBtn = document.getElementById("startScreeningBtn");
    const resultsContainer = document.getElementById("resultsContainer");

    if (prompt) prompt.style.display = "block";
    if (preview) preview.style.display = "none";
    if (previewImage) previewImage.src = "";
    if (startBtn) startBtn.disabled = true;
    if (resultsContainer) resultsContainer.style.display = "none";
}

// Auto-check for stored preset on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedPreset = sessionStorage.getItem("authensight_preset");
    if (savedPreset) {
        sessionStorage.removeItem("authensight_preset");
        const presetSelect = document.getElementById("samplePresetSelect");
        if (presetSelect) {
            presetSelect.value = savedPreset;
            onPresetSelectChange(savedPreset);
        }
    }
});

/* ==========================================================================
   REST API Document Screening Execution
   ========================================================================== */

async function handleScreeningSubmit(e) {
    e.preventDefault();
    if (!currentFile && !currentPreset) {
        alert("Please upload a document file or select a test preset.");
        return;
    }

    const docType = document.getElementById("documentType")?.value || "Passport";
    const laser = document.getElementById("scanningLaser");
    const loadingOverlay = document.getElementById("screeningLoading");
    const startBtn = document.getElementById("startScreeningBtn");
    const btnText = document.getElementById("screeningBtnText");

    // UI Loading States
    if (laser) laser.style.display = "block";
    if (loadingOverlay) loadingOverlay.style.display = "flex";
    if (startBtn) startBtn.disabled = true;
    if (btnText) btnText.textContent = "Screening in Progress...";

    // Animate stage progress text
    const stepEl = document.getElementById("loadingProgressStep");
    const barFill = document.getElementById("loadingProgressBarFill");
    const chkMrz = document.getElementById("chkMrz");
    const chkForensics = document.getElementById("chkForensics");
    const chkFace = document.getElementById("chkFace");

    let progress = 15;
    if (barFill) barFill.style.width = `${progress}%`;

    const progressTimer = setInterval(() => {
        progress += 25;
        if (barFill) barFill.style.width = `${Math.min(90, progress)}%`;

        if (progress >= 35 && chkMrz) {
            chkMrz.classList.add("active");
            chkMrz.textContent = "● ICAO 9303 MRZ Modulus Checksum";
            if (stepEl) stepEl.textContent = "Stage 2/4: Verifying ICAO 9303 Modulus 10 Checksums...";
        }
        if (progress >= 60 && chkForensics) {
            chkForensics.classList.add("active");
            chkForensics.textContent = "● Error Level Analysis (ELA) Active";
            if (stepEl) stepEl.textContent = "Stage 3/4: Scanning JPEG Quantization Disparities...";
        }
        if (progress >= 85 && chkFace) {
            chkFace.classList.add("active");
            chkFace.textContent = "● Biometric Face Likeness Match";
            if (stepEl) stepEl.textContent = "Stage 4/4: Cross-referencing Facial Biometrics...";
        }
    }, 350);

    try {
        const formData = new FormData();
        if (currentFile) {
            formData.append("file", currentFile);
        }
        if (currentPreset) {
            formData.append("preset", currentPreset);
        }
        formData.append("document_type", docType);

        // Fetch to FastAPI Backend
        const response = await fetch("/api/screen-document", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({ detail: "Document screening failed" }));
            throw new Error(errData.detail || "Document screening failed");
        }

        const screeningResult = await response.json();
        currentScreeningResult = screeningResult;

        // Complete progress animation
        clearInterval(progressTimer);
        if (barFill) barFill.style.width = "100%";

        setTimeout(() => {
            if (loadingOverlay) loadingOverlay.style.display = "none";
            if (laser) laser.style.display = "none";
            if (startBtn) startBtn.disabled = false;
            if (btnText) btnText.textContent = "Start AI Screening";

            // Render the complete results
            renderScreeningResults(screeningResult);
        }, 500);

    } catch (err) {
        clearInterval(progressTimer);
        if (loadingOverlay) loadingOverlay.style.display = "none";
        if (laser) laser.style.display = "none";
        if (startBtn) startBtn.disabled = false;
        if (btnText) btnText.textContent = "Start AI Screening";

        console.error("Screening error:", err);
        alert(`Screening Error: ${err.message}`);
    }
}

/* ==========================================================================
   Dynamic Analysis & Heatmap Rendering
   ========================================================================== */

function renderScreeningResults(data) {
    const resultsContainer = document.getElementById("resultsContainer");
    if (!resultsContainer) return;

    resultsContainer.style.display = "flex";
    resultsContainer.scrollIntoView({ behavior: "smooth" });

    // 1. Dossier Banner
    const resId = document.getElementById("resScreeningId");
    const resDocType = document.getElementById("resDocType");
    const resTimestamp = document.getElementById("resTimestamp");
    const resSubjectName = document.getElementById("resSubjectName");
    const resStatusBadge = document.getElementById("resStatusBadge");

    if (resId) resId.textContent = data.screening_id;
    if (resDocType) resDocType.textContent = data.document_type || "Passport";
    if (resTimestamp) resTimestamp.textContent = data.date_time || data.date || "2026-09-05";
    if (resSubjectName) resSubjectName.textContent = data.ocr?.name || "Subject";

    if (resStatusBadge) {
        resStatusBadge.textContent = data.status;
        resStatusBadge.className = `status-badge-lg ${data.status}`;
        resStatusBadge.setAttribute("data-status", data.status);
    }

    // 2. Risk Score & Circular Gauge
    const scoreVal = document.getElementById("riskScoreValue");
    const levelTag = document.getElementById("riskLevelTag");
    const circleFill = document.getElementById("riskCircleFill");

    const score = Number(data.risk_score) || 0;
    if (scoreVal) scoreVal.textContent = score;
    if (levelTag) {
        levelTag.textContent = `${data.risk_level || "RISK"} RISK`;
        levelTag.style.color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981";
    }

    // Animate Circular Gauge
    // Circumference for r=70 is 2 * PI * 70 ≈ 440
    const circumference = 440;
    const offset = circumference - (score / 100) * circumference;
    if (circleFill) {
        circleFill.style.stroke = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981";
        circleFill.style.strokeDashoffset = offset;
    }

    // Highlight active risk level badge
    const badgeLow = document.getElementById("badgeLowRisk");
    const badgeMed = document.getElementById("badgeMedRisk");
    const badgeHigh = document.getElementById("badgeHighRisk");

    if (badgeLow) badgeLow.classList.toggle("active", score < 40);
    if (badgeMed) badgeMed.classList.toggle("active", score >= 40 && score < 70);
    if (badgeHigh) badgeHigh.classList.toggle("active", score >= 70);

    // 3. Explainability "WHY WAS THIS DOCUMENT FLAGGED?" (Dynamically from FastAPI)
    const evidenceList = document.getElementById("evidenceList");
    if (evidenceList) {
        const reasons = data.reasons || [];
        if (reasons.length === 0) {
            evidenceList.innerHTML = `
                <div class="evidence-item genuine-evidence">
                    <span class="evidence-bullet">✓</span>
                    <span>No physical, cryptographic, or biometric tampering indicators detected.</span>
                </div>
            `;
        } else {
            const isGenuine = data.status === "GENUINE";
            evidenceList.innerHTML = reasons.map(r => `
                <div class="evidence-item ${isGenuine ? 'genuine-evidence' : score >= 70 ? 'danger-evidence' : 'suspicious-evidence'}">
                    <span class="evidence-bullet">${isGenuine ? '✓' : score >= 70 ? '❌' : '⚠️'}</span>
                    <span>${r}</span>
                </div>
            `).join("");
        }
    }

    // 4. Update Document Heatmap Image Source
    const heatmapImg = document.getElementById("heatmapSourceImage");
    if (heatmapImg) {
        const previewImg = document.getElementById("previewImage");
        if (data.image_url) {
            heatmapImg.src = data.image_url;
        } else if (previewImg && previewImg.src) {
            heatmapImg.src = previewImg.src;
        }
    }

    // 5. OCR Demographics Table
    const ocr = data.ocr || {};
    setElText("ocrName", ocr.name || "--");
    setElText("ocrDob", ocr.date_of_birth || "--");
    setElText("ocrDocNum", ocr.document_number || "--");
    setElText("ocrNat", ocr.nationality || "--");
    setElText("ocrGender", ocr.gender || "--");
    setElText("ocrIssueDate", ocr.issue_date || "--");
    setElText("ocrExpiryDate", ocr.expiry_date || "--");

    // 6. MRZ Validation Checklist
    const mrz = data.mrz || {};
    const detailedMrz = data.detailed_mrz || {};
    setStatusTag("mrzStatusDetected", mrz.detected ? "PASS" : "FAIL");
    setStatusTag("mrzStatusChecksum", mrz.checksum_valid ? "PASS" : "FAIL");
    setStatusTag("mrzStatusName", detailedMrz.name_consistency_status || (mrz.data_match ? "PASS" : "FAIL"));
    setStatusTag("mrzStatusDate", detailedMrz.date_consistency_status || (mrz.data_match ? "PASS" : "FAIL"));
    setStatusTag("mrzStatusDocNum", detailedMrz.doc_number_consistency_status || (mrz.data_match ? "PASS" : "FAIL"));

    // 7. Document Forensics Checklist
    const forensics = data.forensics || {};
    const detailedForensics = data.detailed_forensics || {};
    setStatusTag("forensicStatusText", detailedForensics.text_manipulation || (forensics.text_manipulation ? "FAIL" : "PASS"));
    setStatusTag("forensicStatusPhoto", detailedForensics.photo_manipulation || (forensics.photo_manipulation ? "SUSPICIOUS" : "PASS"));
    setStatusTag("forensicStatusCopy", detailedForensics.copy_paste_detection || (forensics.copy_paste ? "FAIL" : "PASS"));
    setStatusTag("forensicStatusImage", detailedForensics.image_inconsistencies || "PASS");
    setStatusTag("forensicStatusCompression", detailedForensics.compression_anomalies || (forensics.compression_anomaly ? "SUSPICIOUS" : "PASS"));
    setStatusTag("forensicStatusSecurity", detailedForensics.security_feature_analysis || "PASS");

    // 8. Face Verification Metrics
    const face = data.face_verification || {};
    const faceSim = Number(face.similarity) || 0;
    setElText("faceSimVal", `${faceSim}%`);
    setElText("faceScoreVal", `${faceSim}%`);
    setElText("faceDetectedVal", face.face_detected ? "YES" : "NO");

    const faceFill = document.getElementById("faceCircleFill");
    if (faceFill) {
        const faceCircumference = 264; // 2 * PI * 42
        faceFill.style.strokeDashoffset = faceCircumference - (faceSim / 100) * faceCircumference;
        faceFill.style.stroke = faceSim >= 75 ? "#10b981" : faceSim >= 50 ? "#f59e0b" : "#ef4444";
    }

    const faceWarningContainer = document.getElementById("faceWarningContainer");
    if (faceWarningContainer) {
        if (!face.match || faceSim < 75) {
            faceWarningContainer.innerHTML = `
                <div class="status-pill status-pill-danger">
                    ⚠️ Face similarity (${faceSim}%) is below 75% immigration threshold. Possible morphing or impersonation!
                </div>
            `;
        } else {
            faceWarningContainer.innerHTML = `
                <div class="status-pill status-pill-success">
                    ✓ Biometric face likeness verified against passport photo
                </div>
            `;
        }
    }

    // 9. Summary in Report Bar
    setElText("repSummarySubject", ocr.name || "Subject");
}

function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setStatusTag(id, status) {
    const el = document.getElementById(id);
    if (!el) return;
    const st = String(status).toUpperCase();
    el.textContent = st;
    el.className = `status-indicator-tag ${st.toLowerCase()}`;
}

/* ==========================================================================
   Section 5: Dynamic Heatmap Bounding Box Rendering
   ========================================================================== */

function renderHeatmapOverlays() {
    const img = document.getElementById("heatmapSourceImage");
    const container = document.getElementById("boundingBoxesLayer");
    if (!img || !container || !currentScreeningResult) return;

    container.innerHTML = "";

    const regions = currentScreeningResult.regions || [];
    if (!regions.length) return;

    const displayedWidth = img.clientWidth;
    const displayedHeight = img.clientHeight;
    const naturalWidth = img.naturalWidth || 700;
    const naturalHeight = img.naturalHeight || 480;

    const scaleX = displayedWidth / naturalWidth;
    const scaleY = displayedHeight / naturalHeight;

    regions.forEach((r, idx) => {
        const box = document.createElement("div");
        box.className = `bbox-overlay ${r.status.toLowerCase()}`;
        
        const left = Math.round(r.x * scaleX);
        const top = Math.round(r.y * scaleY);
        const width = Math.round(r.width * scaleX);
        const height = Math.round(r.height * scaleY);

        box.style.left = `${left}px`;
        box.style.top = `${top}px`;
        box.style.width = `${width}px`;
        box.style.height = `${height}px`;

        // Badge icon
        const icon = r.status.toLowerCase() === "pass" ? "✅" :
                     r.status.toLowerCase() === "suspicious" ? "⚠️" : "❌";
        
        const tag = document.createElement("span");
        tag.className = "bbox-tag";
        tag.textContent = `${r.label || r.name.toUpperCase()} ${icon}`;
        box.appendChild(tag);

        // Interaction
        box.addEventListener("mouseenter", () => showInspectorDetails(r));
        box.addEventListener("click", () => showInspectorDetails(r));

        container.appendChild(box);
    });
}

// Re-render bounding boxes on window resize
window.addEventListener("resize", () => {
    if (currentScreeningResult) {
        renderHeatmapOverlays();
    }
});

function showInspectorDetails(region) {
    const details = document.getElementById("inspectorDetails");
    const badge = document.getElementById("inspBadge");
    const name = document.getElementById("inspName");
    const desc = document.getElementById("inspDesc");
    const coords = document.getElementById("inspCoords");

    if (!details) return;

    details.style.display = "block";
    const st = region.status.toUpperCase();
    if (badge) {
        badge.textContent = st;
        badge.className = `inspector-badge ${st === 'PASS' ? 'trend-positive' : st === 'SUSPICIOUS' ? 'trend-warning' : 'trend-danger'}`;
    }
    if (name) name.textContent = region.label || region.name.toUpperCase();
    if (desc) desc.textContent = region.description || "Forensic telemetry registered.";
    if (coords) coords.textContent = `Coordinates: X:${region.x}, Y:${region.y} | Dim: ${region.width}×${region.height} px`;
}

/* ==========================================================================
   Report & History Operations
   ========================================================================== */

function openPrintableReport() {
    if (currentScreeningResult && currentScreeningResult.screening_id) {
        window.open(`/report/${currentScreeningResult.screening_id}`, "_blank");
    } else {
        window.print();
    }
}

function downloadReportJSON() {
    const data = currentScreeningResult || { message: "No active screening" };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AuthenSight_${data.screening_id || "Dossier"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function startNewScreeningAction() {
    window.location.href = "/screening";
}

/* ==========================================================================
   History Page Functions
   ========================================================================== */

let cachedHistory = [];

async function loadFullHistory() {
    const tbody = document.getElementById("fullHistoryBody");
    if (!tbody) return;

    try {
        const res = await fetch("/api/history?limit=100");
        if (!res.ok) throw new Error("Failed to load history");
        cachedHistory = await res.json();
        renderHistoryTable(cachedHistory);
    } catch (err) {
        console.error("Error loading history:", err);
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-danger">Failed to load verification logs.</td></tr>`;
    }
}

function filterHistoryTable() {
    const search = document.getElementById("historySearchInput")?.value.toLowerCase().trim() || "";
    const statusFilter = document.getElementById("historyStatusFilter")?.value || "ALL";
    const docFilter = document.getElementById("historyDocFilter")?.value || "ALL";

    let filtered = cachedHistory.filter(item => {
        const name = (item.ocr?.name || "").toLowerCase();
        const docNum = (item.ocr?.document_number || "").toLowerCase();
        const scrId = (item.screening_id || "").toLowerCase();

        const matchesSearch = !search || name.includes(search) || docNum.includes(search) || scrId.includes(search);
        const matchesStatus = statusFilter === "ALL" || (item.status || "").toUpperCase() === statusFilter;
        const matchesDoc = docFilter === "ALL" || (item.document_type || "").toUpperCase() === docFilter.toUpperCase();

        return matchesSearch && matchesStatus && matchesDoc;
    });

    renderHistoryTable(filtered);
}

function renderHistoryTable(records) {
    const tbody = document.getElementById("fullHistoryBody");
    if (!tbody) return;

    if (!records.length) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No records match the filter criteria.</td></tr>`;
        return;
    }

    tbody.innerHTML = records.map(rec => {
        const statusClass = rec.status === "GENUINE" ? "genuine" :
                            rec.status === "SUSPICIOUS" ? "suspicious" : "high-risk";
        const name = rec.ocr?.name || "N/A";
        const docNo = rec.ocr?.document_number || "N/A";
        return `
            <tr>
                <td class="font-mono"><strong>${rec.screening_id}</strong></td>
                <td>${rec.document_type || "Passport"}</td>
                <td>${name}</td>
                <td class="font-mono">${docNo}</td>
                <td>${rec.date_time || rec.date || "2026-09-05"}</td>
                <td>
                    <strong class="${rec.risk_score >= 70 ? 'text-danger' : rec.risk_score >= 40 ? 'text-suspicious' : 'text-genuine'}">
                        ${rec.risk_score}%
                    </strong>
                </td>
                <td><span class="status-badge ${statusClass}">${rec.status}</span></td>
                <td>
                    <a href="/report/${rec.screening_id}" class="btn btn-secondary btn-xs">Dossier</a>
                </td>
            </tr>
        `;
    }).join("");
}

function exportHistoryCSV() {
    if (!cachedHistory.length) {
        alert("No history records to export.");
        return;
    }

    const headers = ["Screening ID", "Document Type", "Subject Name", "Document Number", "Timestamp", "Risk Score", "Status"];
    const rows = cachedHistory.map(r => [
        r.screening_id,
        r.document_type,
        `"${(r.ocr?.name || '').replace(/"/g, '""')}"`,
        r.ocr?.document_number || '',
        r.date_time || r.date || '',
        r.risk_score,
        r.status
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AuthenSight_Audit_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ==========================================================================
   Report Page Loader
   ========================================================================== */

async function loadReportDossier(screeningId) {
    if (!screeningId) return;

    try {
        const res = await fetch(`/api/screening-result/${screeningId}`);
        if (!res.ok) {
            // If not found in memory, try seed history
            const histRes = await fetch("/api/history?limit=100");
            const history = await histRes.json();
            const found = history.find(h => h.screening_id === screeningId);
            if (found) {
                renderDossierData(found);
                return;
            }
            throw new Error("Screening ID not found");
        }
        const data = await res.json();
        renderDossierData(data);
    } catch (err) {
        console.error("Error loading dossier:", err);
    }
}

function renderDossierData(data) {
    currentScreeningResult = data;

    setElText("repScreeningId", data.screening_id);
    setElText("topReportId", data.screening_id);
    setElText("repDateTime", data.date_time || data.date || "2026-09-05");
    setElText("repDocType", data.document_type || "Passport");
    setElText("repRiskScore", `${data.risk_score}% (${data.risk_level || 'RISK'})`);

    const badge = document.getElementById("repStatusBadge");
    if (badge) {
        badge.textContent = data.status;
        badge.className = `status-badge ${data.status.toLowerCase()}`;
    }

    // Graphic
    const img = document.getElementById("repDocumentImage");
    if (img && data.image_url) {
        img.src = data.image_url;
    }

    // Reasons
    const reasonsList = document.getElementById("repReasonsList");
    if (reasonsList) {
        const reasons = data.reasons || ["Authentic physical and machine-readable credentials."];
        reasonsList.innerHTML = reasons.map(r => `<li>${r}</li>`).join("");
    }

    // Face
    const faceText = document.getElementById("repFaceText");
    if (faceText) {
        const sim = data.face_verification?.similarity || 95;
        const match = data.face_verification?.match;
        faceText.textContent = match ?
            `Biometric facial geometry verified with ${sim}% likeness confidence (passed 75% threshold).` :
            `WARNING: Facial similarity is ${sim}%, failing the statutory 75% likeness threshold.`;
    }

    // Tables
    const ocr = data.ocr || {};
    setElText("repOcrName", ocr.name || "--");
    setElText("repOcrDob", ocr.date_of_birth || "--");
    setElText("repOcrDocNum", ocr.document_number || "--");
    setElText("repOcrNat", ocr.nationality || "--");
    setElText("repOcrGender", ocr.gender || "--");
    setElText("repOcrIssue", ocr.issue_date || "--");
    setElText("repOcrExpiry", ocr.expiry_date || "--");

    const mrz = data.mrz || {};
    setElText("repMrzDetected", mrz.detected ? "PASS" : "FAIL");
    setElText("repMrzChecksum", mrz.checksum_valid ? "PASS" : "FAIL");
    setElText("repMrzDataMatch", mrz.data_match ? "PASS" : "FAIL");

    const fore = data.forensics || {};
    setElText("repForensicText", fore.text_manipulation ? "FAIL (Tampered)" : "PASS");
    setElText("repForensicPhoto", fore.photo_manipulation ? "SUSPICIOUS (Disparity)" : "PASS");
    setElText("repForensicCopy", fore.copy_paste ? "FAIL (Spliced)" : "PASS");
    setElText("repForensicCompression", fore.compression_anomaly ? "SUSPICIOUS (ELA Disparity)" : "PASS");
}
