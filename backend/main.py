"""
AuthenSight - AI Fake Identity & Document Screening System
FastAPI Backend Application Entrypoint
Decoupled backend engine serving static frontend and REST APIs.
"""

import os
import sys
import uuid
from datetime import datetime
from typing import Optional, List

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Ensure backend directory and services are in Python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Add parent directory if needed
PARENT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)

# Resolve FRONTEND_DIR reliably whether run from root or backend/
if os.path.exists(os.path.join(BASE_DIR, "frontend")):
    FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
elif os.path.exists(os.path.join(PARENT_DIR, "frontend")):
    FRONTEND_DIR = os.path.join(PARENT_DIR, "frontend")
else:
    FRONTEND_DIR = os.path.abspath("frontend")

# Resolve UPLOAD_DIR
if os.path.exists(os.path.join(BASE_DIR, "uploads")):
    UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
elif os.path.exists(os.path.join(PARENT_DIR, "backend", "uploads")):
    UPLOAD_DIR = os.path.join(PARENT_DIR, "backend", "uploads")
else:
    UPLOAD_DIR = os.path.abspath("uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

# Import services with resilient relative/package fallback
try:
    from backend.services.ocr import extract_ocr_data
    from backend.services.mrz import validate_mrz_data, parse_td3_mrz
    from backend.services.forensics import perform_forensic_analysis
    from backend.services.face_verification import verify_face_biometrics
    from backend.services.risk_engine import evaluate_risk
except ImportError:
    from services.ocr import extract_ocr_data
    from services.mrz import validate_mrz_data, parse_td3_mrz
    from services.forensics import perform_forensic_analysis
    from services.face_verification import verify_face_biometrics
    from services.risk_engine import evaluate_risk

app = FastAPI(
    title="AuthenSight | AI Fake Identity & Document Screening",
    description="Immigration & Border Security AI Document Verification Engine",
    version="2.0.0"
)

# Robust CORS Configuration: Allows API calls from file://, localhost:*, 127.0.0.1:*, etc.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=".*",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Assets from decoupled frontend/
css_dir = os.path.join(FRONTEND_DIR, "css")
js_dir = os.path.join(FRONTEND_DIR, "js")
images_dir = os.path.join(FRONTEND_DIR, "images")

if os.path.exists(css_dir):
    app.mount("/css", StaticFiles(directory=css_dir), name="css")
if os.path.exists(js_dir):
    app.mount("/js", StaticFiles(directory=js_dir), name="js")
if os.path.exists(images_dir):
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Mount both /frontend and /static for universal backwards compatibility
if os.path.exists(FRONTEND_DIR):
    app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

# Mount Uploads
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# In-memory Store for Screenings with seed data
SCREENINGS_STORE = {}

SEED_HISTORY = [
    {
        "screening_id": "SCR-2026-00891",
        "document_type": "Passport",
        "date_time": "2026-09-05 09:42:15",
        "date": "2026-09-05",
        "time": "09:42:15",
        "risk_score": 14,
        "risk_level": "LOW",
        "status": "GENUINE",
        "ocr": {
            "name": "RAJESH KUMAR PATEL",
            "date_of_birth": "1992-04-18",
            "document_number": "N7841926",
            "nationality": "IND",
            "gender": "Male",
            "issue_date": "2021-01-14",
            "expiry_date": "2031-01-13"
        },
        "mrz": {"detected": True, "checksum_valid": True, "data_match": True},
        "forensics": {"photo_manipulation": False, "text_manipulation": False, "copy_paste": False, "compression_anomaly": False},
        "face_verification": {"face_detected": True, "similarity": 97, "match": True},
        "reasons": [
            "All optical security micro-features and MRZ check digits verified successfully",
            "Continuous guilloche background and authentic UV response pattern confirmed"
        ],
        "image_url": "/images/presets/sample_genuine_passport.jpg"
    },
    {
        "screening_id": "SCR-2026-00892",
        "document_type": "Passport",
        "date_time": "2026-09-05 09:15:30",
        "date": "2026-09-05",
        "time": "09:15:30",
        "risk_score": 78,
        "risk_level": "HIGH",
        "status": "HIGH RISK",
        "ocr": {
            "name": "VIKRAM ARJUN SHARMA",
            "date_of_birth": "2004-05-12",
            "document_number": "M9283401",
            "nationality": "IND",
            "gender": "Male",
            "issue_date": "2018-06-10",
            "expiry_date": "2028-06-09"
        },
        "mrz": {"detected": True, "checksum_valid": True, "data_match": False},
        "forensics": {"photo_manipulation": False, "text_manipulation": True, "copy_paste": True, "compression_anomaly": True},
        "face_verification": {"face_detected": True, "similarity": 91, "match": True},
        "reasons": [
            "MRZ date of birth (1998-08-14) does not match visual zone date of birth (2004-05-12)",
            "Text manipulation detected: Date of birth field shows font kerning and luminance disparity",
            "Guilloche background pattern interrupted beneath date of birth numerals"
        ],
        "image_url": "/images/presets/sample_tampered_dob.jpg"
    },
    {
        "screening_id": "SCR-2026-00893",
        "document_type": "Passport",
        "date_time": "2026-09-05 08:30:12",
        "date": "2026-09-05",
        "time": "08:30:12",
        "risk_score": 88,
        "risk_level": "HIGH",
        "status": "HIGH RISK",
        "ocr": {
            "name": "SARAH EMILY JOHNSON",
            "date_of_birth": "1994-11-28",
            "document_number": "K4829104",
            "nationality": "GBR",
            "gender": "Female",
            "issue_date": "2020-03-15",
            "expiry_date": "2030-03-14"
        },
        "mrz": {"detected": True, "checksum_valid": True, "data_match": True},
        "forensics": {"photo_manipulation": True, "text_manipulation": False, "copy_paste": True, "compression_anomaly": True},
        "face_verification": {"face_detected": True, "similarity": 38, "match": False},
        "reasons": [
            "Face similarity (38%) is critically below the immigration threshold (75%)",
            "Error Level Analysis (ELA) detected compression disparity along photograph boundary",
            "Copy-paste splicing artifacts detected around the portrait frame"
        ],
        "image_url": "/images/presets/sample_photo_tampered.jpg"
    },
    {
        "screening_id": "SCR-2026-00894",
        "document_type": "Visa",
        "date_time": "2026-09-04 16:50:44",
        "date": "2026-09-04",
        "time": "16:50:44",
        "risk_score": 52,
        "risk_level": "MEDIUM",
        "status": "SUSPICIOUS",
        "ocr": {
            "name": "CARLOS EDUARDO SILVA",
            "date_of_birth": "1988-03-22",
            "document_number": "FZ839210",
            "nationality": "BRA",
            "gender": "Male",
            "issue_date": "2019-09-01",
            "expiry_date": "2029-08-31"
        },
        "mrz": {"detected": True, "checksum_valid": False, "data_match": False},
        "forensics": {"photo_manipulation": False, "text_manipulation": False, "copy_paste": False, "compression_anomaly": True},
        "face_verification": {"face_detected": True, "similarity": 84, "match": True},
        "reasons": [
            "MRZ composite and expiration check digits failed validation (checksum mismatch)",
            "Compression anomaly detected across lower MRZ band"
        ],
        "image_url": "/images/presets/sample_invalid_mrz.jpg"
    }
]

for item in SEED_HISTORY:
    SCREENINGS_STORE[item["screening_id"]] = item

# ----------------- PAGE ROUTES ----------------- #

@app.get("/")
@app.get("/index.html")
async def page_dashboard():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    return FileResponse(index_path)

@app.get("/screening")
@app.get("/screening.html")
async def page_screening():
    return FileResponse(os.path.join(FRONTEND_DIR, "screening.html"))

@app.get("/history")
@app.get("/history.html")
async def page_history():
    return FileResponse(os.path.join(FRONTEND_DIR, "history.html"))

@app.get("/reports")
@app.get("/report.html")
async def page_reports():
    return FileResponse(os.path.join(FRONTEND_DIR, "report.html"))

@app.get("/report/{screening_id}")
async def page_report_id(screening_id: str):
    return FileResponse(os.path.join(FRONTEND_DIR, "report.html"))

# Fallback routes for assets requested from /report/ sub-paths
@app.get("/report/css/{asset_name:path}")
async def report_css_fallback(asset_name: str):
    file_path = os.path.join(FRONTEND_DIR, "css", asset_name)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="CSS not found")

@app.get("/report/js/{asset_name:path}")
async def report_js_fallback(asset_name: str):
    file_path = os.path.join(FRONTEND_DIR, "js", asset_name)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="JS not found")

@app.get("/report/images/{asset_name:path}")
async def report_images_fallback(asset_name: str):
    file_path = os.path.join(FRONTEND_DIR, "images", asset_name)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")

# ----------------- REST API ENDPOINTS ----------------- #

ALLOWED_MIME_TYPES = {
    "image/jpeg", "image/png", "image/webp", "image/tiff", "application/pdf"
}

@app.post("/api/screen-document")
async def api_screen_document(
    file: Optional[UploadFile] = File(None),
    document_type: str = Form("Passport"),
    preset: Optional[str] = Form(None)
):
    """
    Main Document Screening Endpoint.
    Runs OCR, MRZ validation, image forensics, face verification, and risk engine.
    """
    file_bytes = None
    filename = None
    image_rel_url = None

    if file and file.filename:
        filename = file.filename
        if file.content_type and file.content_type not in ALLOWED_MIME_TYPES and not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.pdf')):
            raise HTTPException(status_code=400, detail="Invalid file format. Please upload JPG, PNG, WEBP, or PDF.")

        file_bytes = await file.read()
        if len(file_bytes) > 25 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large. Maximum supported size is 25MB.")
        if len(file_bytes) < 100:
            raise HTTPException(status_code=400, detail="Uploaded file is empty or corrupted.")

        file_ext = os.path.splitext(filename)[1].lower() or ".jpg"
        save_name = f"doc_{uuid.uuid4().hex[:10]}{file_ext}"
        save_path = os.path.join(UPLOAD_DIR, save_name)
        with open(save_path, "wb") as f:
            f.write(file_bytes)
        image_rel_url = f"/uploads/{save_name}"

    elif preset:
        preset_map = {
            "genuine": "sample_genuine_passport.jpg",
            "tampered_dob": "sample_tampered_dob.jpg",
            "photo_tampering": "sample_photo_tampered.jpg",
            "invalid_mrz": "sample_invalid_mrz.jpg"
        }
        preset_file = preset_map.get(preset, "sample_genuine_passport.jpg")
        image_rel_url = f"/images/presets/{preset_file}"
        preset_abs = os.path.join(FRONTEND_DIR, "images", "presets", preset_file)
        if os.path.exists(preset_abs):
            with open(preset_abs, "rb") as pf:
                file_bytes = pf.read()
            filename = preset_file
        else:
            # Fallback to static
            alt_preset = os.path.join(PARENT_DIR, "static", "images", "presets", preset_file)
            if os.path.exists(alt_preset):
                with open(alt_preset, "rb") as pf:
                    file_bytes = pf.read()
                filename = preset_file
    else:
        raise HTTPException(status_code=400, detail="No document file or preset selected.")

    # Execute Service Pipelines
    ocr_result = extract_ocr_data(file_bytes=file_bytes, filename=filename, preset=preset, document_type=document_type)
    mrz_result = validate_mrz_data(visual_data=ocr_result, document_type=document_type, is_tampered_preset=preset)
    forensics_result = perform_forensic_analysis(file_bytes=file_bytes, filename=filename, preset=preset)
    face_result = verify_face_biometrics(file_bytes=file_bytes, filename=filename, preset=preset)

    # Compute Risk and Explanations
    screening_payload = evaluate_risk(
        ocr_result=ocr_result,
        mrz_result=mrz_result,
        forensics_result=forensics_result,
        face_result=face_result,
        document_type=document_type
    )

    screening_payload["image_url"] = image_rel_url
    screening_payload["filename"] = filename or "screened_document.jpg"

    # Store result in memory
    SCREENINGS_STORE[screening_payload["screening_id"]] = screening_payload

    return JSONResponse(content=screening_payload)


class FaceVerifyRequest(BaseModel):
    similarity_threshold: Optional[int] = 75
    preset: Optional[str] = None

@app.post("/api/verify-face")
async def api_verify_face(
    file: Optional[UploadFile] = File(None),
    preset: Optional[str] = Form(None)
):
    file_bytes = None
    filename = None
    if file:
        filename = file.filename
        file_bytes = await file.read()
    res = verify_face_biometrics(file_bytes=file_bytes, filename=filename, preset=preset)
    return JSONResponse(content=res)


class MRZValidateRequest(BaseModel):
    line1: Optional[str] = None
    line2: Optional[str] = None
    preset: Optional[str] = None

@app.post("/api/validate-mrz")
async def api_validate_mrz(req: MRZValidateRequest):
    mrz_lines = []
    if req.line1 and req.line2:
        mrz_lines = [req.line1, req.line2]
    res = validate_mrz_data(mrz_lines=mrz_lines, is_tampered_preset=req.preset)
    return JSONResponse(content=res)


@app.get("/api/screening-result/{screening_id}")
async def api_get_screening_result(screening_id: str):
    if screening_id not in SCREENINGS_STORE:
        raise HTTPException(status_code=404, detail="Screening ID not found")
    return JSONResponse(content=SCREENINGS_STORE[screening_id])


@app.get("/api/history")
async def api_get_history(
    status: Optional[str] = Query(None),
    doc_type: Optional[str] = Query(None),
    limit: int = Query(50)
):
    items = list(SCREENINGS_STORE.values())
    if status:
        items = [x for x in items if x.get("status", "").upper() == status.upper()]
    if doc_type:
        items = [x for x in items if x.get("document_type", "").upper() == doc_type.upper()]

    items = sorted(items, key=lambda x: x.get("date_time", ""), reverse=True)
    return JSONResponse(content=items[:limit])


@app.get("/api/stats")
async def api_get_stats():
    total = len(SCREENINGS_STORE)
    genuine = sum(1 for x in SCREENINGS_STORE.values() if x.get("status") == "GENUINE")
    suspicious = sum(1 for x in SCREENINGS_STORE.values() if x.get("status") == "SUSPICIOUS")
    high_risk = sum(1 for x in SCREENINGS_STORE.values() if x.get("status") == "HIGH RISK")

    return JSONResponse(content={
        "total": total,
        "genuine": genuine,
        "suspicious": suspicious,
        "high_risk": high_risk,
        "genuine_percentage": round((genuine / total * 100) if total else 0, 1),
        "suspicious_percentage": round((suspicious / total * 100) if total else 0, 1),
        "high_risk_percentage": round((high_risk / total * 100) if total else 0, 1)
    })


if __name__ == "__main__":
    import uvicorn
    print("======================================================================")
    print("  AuthenSight — AI Fake Identity & Document Screening System")
    print("======================================================================")
    print("  Local Server       : http://127.0.0.1:8000")
    print("  Screening Engine   : http://127.0.0.1:8000/screening.html")
    print("  History Audit Log  : http://127.0.0.1:8000/history.html")
    print("  Swagger API Docs   : http://127.0.0.1:8000/docs")
    print("======================================================================")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

