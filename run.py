"""
AuthenSight Server Launcher.
Runs the separated FastAPI backend on port 8000 and serves the decoupled frontend.
"""

import sys
import os
import uvicorn

if __name__ == "__main__":
    # Ensure backend directory is in path
    backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
    if backend_dir not in sys.path:
        sys.path.insert(0, backend_dir)

    print("======================================================================")
    print("  AuthenSight — AI Fake Identity & Document Screening System")
    print("======================================================================")
    print("  Backend Directory  : ./backend")
    print("  Frontend Directory : ./frontend")
    print("  Local Server       : http://127.0.0.1:8000")
    print("  Swagger API Docs   : http://127.0.0.1:8000/docs")
    print("======================================================================")

    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
