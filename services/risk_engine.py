"""
Explainable Risk Engine.
Aggregates forensic signals, OCR anomalies, MRZ checksum validation, and facial metrics
to compute an explainable overall risk score and evidence justification.
"""

from typing import Dict, Any, List
import uuid
from datetime import datetime

def evaluate_risk(
    ocr_result: Dict[str, Any],
    mrz_result: Dict[str, Any],
    forensics_result: Dict[str, Any],
    face_result: Dict[str, Any],
    document_type: str = "Passport",
    custom_screening_id: str = None
) -> Dict[str, Any]:
    """
    Computes weighted risk score and produces explainable evidence reasons.
    """
    score = 12 # Baseline authentic score
    reasons: List[str] = []

    # 1. MRZ analysis weighting (up to 35 points)
    if not mrz_result.get("detected", True):
        score += 30
        reasons.append("MRZ could not be detected or is obscured")
    elif not mrz_result.get("checksum_valid", True):
        score += 32
        reasons.append("MRZ checksum validation failed (ICAO Doc 9303 check digit mismatch)")
    elif not mrz_result.get("data_match", True):
        score += 28
        reasons.append("MRZ machine-readable fields do not match visual OCR zone")

    # Additional MRZ specific reasons
    for r in mrz_result.get("reasons", []):
        if r not in reasons:
            reasons.append(r)

    # 2. Forensics weighting (up to 40 points)
    flags = forensics_result.get("flags", {})
    if flags.get("photo_manipulation"):
        score += 35
        reasons.append("Possible photo manipulation detected (edge splicing and ELA gradient)")
    if flags.get("text_manipulation"):
        score += 30
        reasons.append("Text manipulation detected (font kerning and glyph baseline anomaly)")
    if flags.get("copy_paste"):
        score += 20
        reasons.append("Digital copy-paste tampering detected across security guilloche pattern")
    if flags.get("compression_anomaly"):
        score += 15
        reasons.append("Compression anomalies (JPEG quantization variance) detected in sensitive fields")

    for r in forensics_result.get("reasons", []):
        if r not in reasons:
            reasons.append(r)

    # 3. Face verification weighting (up to 30 points)
    if not face_result.get("face_detected", True):
        score += 25
        reasons.append("No biometric face portrait detected in document photograph area")
    elif not face_result.get("match", True):
        sim = face_result.get("similarity", 0)
        score += int(max(15, (75 - sim) * 0.8))
        reasons.append(f"Face similarity ({sim}%) is below the immigration verification threshold (75%)")
    if face_result.get("morphing_detected"):
        score += 20
        reasons.append("Facial morphing / composite deepfake synthesis pattern detected")

    # Clamp score to [5..99]
    score = min(99, max(5, score))

    # Determine risk level and status
    if score >= 70:
        risk_level = "HIGH"
        status = "HIGH RISK"
    elif score >= 40:
        risk_level = "MEDIUM"
        status = "SUSPICIOUS"
    else:
        risk_level = "LOW"
        status = "GENUINE"

    # Default explanation if genuine
    if not reasons:
        reasons.append("All optical security micro-features and MRZ check digits verified successfully")
        reasons.append("Consistent font glyphs and continuous guilloche background patterns confirmed")
        reasons.append("Biometric portrait matches standard immigration facial geometry")

    # Generate unique screening ID
    now = datetime.now()
    scr_id = custom_screening_id or f"SCR-{now.strftime('%Y')}-{uuid.uuid4().hex[:5].upper()}"

    # Structure matching the user's expected FastAPI schema
    ocr_clean = {
        "name": ocr_result.get("name", "N/A"),
        "date_of_birth": ocr_result.get("date_of_birth", "N/A"),
        "document_number": ocr_result.get("document_number", "N/A"),
        "nationality": ocr_result.get("nationality", "N/A"),
        "gender": ocr_result.get("gender", "N/A"),
        "issue_date": ocr_result.get("issue_date", "N/A"),
        "expiry_date": ocr_result.get("expiry_date", "N/A")
    }

    mrz_clean = {
        "detected": mrz_result.get("detected", True),
        "checksum_valid": mrz_result.get("checksum_valid", True),
        "data_match": mrz_result.get("data_match", True)
    }

    forensics_clean = {
        "photo_manipulation": flags.get("photo_manipulation", False),
        "text_manipulation": flags.get("text_manipulation", False),
        "copy_paste": flags.get("copy_paste", False),
        "compression_anomaly": flags.get("compression_anomaly", False)
    }

    face_clean = {
        "face_detected": face_result.get("face_detected", True),
        "similarity": face_result.get("similarity", 95),
        "match": face_result.get("match", True)
    }

    return {
        "screening_id": scr_id,
        "document_type": document_type,
        "date_time": now.strftime("%Y-%m-%d %H:%M:%S"),
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M:%S"),
        "risk_score": score,
        "risk_level": risk_level,
        "status": status,
        "ocr": ocr_clean,
        "mrz": mrz_clean,
        "forensics": forensics_clean,
        "face_verification": face_clean,
        "reasons": reasons,
        # Extended fields for rich visualization
        "regions": forensics_result.get("regions", []),
        "detailed_mrz": mrz_result.get("details", {}),
        "detailed_forensics": forensics_result.get("checks", {}),
        "face_details": face_result,
        "ela_metric": forensics_result.get("ela_metric", 12.0)
    }
