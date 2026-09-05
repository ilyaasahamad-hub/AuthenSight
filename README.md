# AuthenSight — AI Fake Identity & Document Screening System

A modern, high-precision web application engineered for immigration and border security officers to screen credentials (passports, visas, national ID cards) and detect tampering, digital splicing, font alterations, and MRZ checksum violations.

---

## Separated Project Structure

The project is cleanly decoupled into standalone `frontend/` and `backend/` directories:

```text
AuthenSight/
├── run.py                     # Convenience launcher (runs backend and serves frontend)
├── package.json               # npm scripts ('npm start')
├── README.md
│
├── frontend/                  # Standalone Pure Frontend (HTML5, CSS3, Vanilla JS)
│   ├── index.html             # Immigration Security Dashboard
│   ├── screening.html         # Document Ingestion & AI Analysis Station
│   ├── history.html           # Verification History & Audit Log
│   ├── report.html            # Printable Official Screening Dossier
│   ├── css/
│   │   └── style.css          # Dark Navy Security Theme & @media print styles
│   ├── js/
│   │   └── app.js             # REST API Fetch client & interactive heatmap logic
│   └── images/
│       └── presets/           # Ready-to-test document sample images
│           ├── sample_genuine_passport.jpg
│           ├── sample_tampered_dob.jpg
│           ├── sample_photo_tampered.jpg
│           └── sample_invalid_mrz.jpg
│
└── backend/                   # Standalone Python FastAPI Backend
    ├── main.py                # FastAPI app, REST APIs, CORS & static file mount
    ├── requirements.txt       # Python dependencies
    ├── uploads/               # Sandboxed uploaded credential scans
    └── services/              # Modular AI & Forensic Engines
        ├── __init__.py
        ├── mrz.py             # ICAO Doc 9303 Checksum Validator (weights [7,3,1])
        ├── forensics.py       # Error Level Analysis (ELA) & Bounding Boxes
        ├── ocr.py             # Optical text demographics parsing
        ├── face_verification.py # Biometric face likeness & morphing checks
        └── risk_engine.py     # Multi-vector explainable risk assessment
```

---

## How to Run

### Option 1: Run Unified Server (Recommended)
From the root workspace directory, run:
```bash
python run.py
```
Or with uvicorn:
```bash
python -m uvicorn backend.main:app --reload --port 8000
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your web browser.

### Option 2: Run Separated / Independently
- **Run Backend Only**:
  ```bash
  cd backend
  uvicorn main:app --reload --port 8000
  ```
- **Run Frontend with Any Static Web Server**:
  Because `frontend/js/app.js` is built with dynamic API routing and the backend supports CORS, you can serve `frontend/` using any static server (VS Code Live Server, `python -m http.server 3000`, Nginx, etc.). It will automatically route all API requests to `http://127.0.0.1:8000`.

---

## Available URLs

- **Dashboard**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Document Screening**: [http://127.0.0.1:8000/screening.html](http://127.0.0.1:8000/screening.html)
- **Verification History**: [http://127.0.0.1:8000/history.html](http://127.0.0.1:8000/history.html)
- **Screening Dossier / Report**: [http://127.0.0.1:8000/report.html](http://127.0.0.1:8000/report.html)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
