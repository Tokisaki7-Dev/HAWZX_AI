#!/bin/bash
. venv/bin/activate
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
