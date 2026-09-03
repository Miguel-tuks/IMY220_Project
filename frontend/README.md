IMY 220 Project 2026 - Deliverable 1

GitHub Repository:
https://github.com/Miguel-tuks/IMY220_Project

BACKEND
Build:
    cd backend
    docker build -t imy220-backend .
Run:
    docker run -p 3000:3000 --name imy220-backend-container imy220-backend

FRONTEND
Build:
    cd frontend
    docker build -t imy220-frontend .
Run:
    docker run -p 5173:5173 --name imy220-frontend-container imy220-frontend

Access the application at http://localhost:5173