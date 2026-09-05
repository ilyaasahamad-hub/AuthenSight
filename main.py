"""
AuthenSight - AI Fake Identity & Document Screening System
Root Application Entrypoint

Seamlessly connects workspace root execution (`uvicorn main:app --reload` or `python main.py`)
directly to the decoupled backend engine in `backend/main.py`.
"""

import os
import sys

# Ensure backend directory and workspace root are in Python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Expose the FastAPI app instance from backend.main
from backend.main import app

if __name__ == "__main__":
    import uvicorn
    print("=" * 72)
    print("  AuthenSight — AI Fake Identity & Document Screening System")
    print("=" * 72)
    print("  Backend Server     : http://127.0.0.1:8000")
    print("  Screening Engine   : http://127.0.0.1:8000/screening.html")
    print("  History Audit Log  : http://127.0.0.1:8000/history.html")
    print("  Swagger API Docs   : http://127.0.0.1:8000/docs")
    print("=" * 72)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
