IMY 220 Project 2026 - Deliverable 2
Miguel De Freitas u23744512

GitHub Repository:
https://github.com/Miguel-tuks/IMY220_Project

DATABASE (MongoDB Atlas)
Connection string (also in backend/db.js): mongodb+srv://grail_user:ophcqYTDJfDgv3E8@cluster0.k0faycn.mongodb.net/?appName=Cluster0
Database name: grail
Collections: users, posts, albums, comments, reports, report_reasons
Test accounts:
    admin@grail.com  / admin123      
    miguel@grail.com / password123   
    jane@grail.com   / password123
    sam@grail.com    / password123

BACKEND
Build:
    cd backend
    docker build -t imy220-backend .
    Seed the database (resets all data to the test data above):
    docker run --rm imy220-backend node seed.js
Run:
    docker run -p 3000:3000 --name imy220-backend-container imy220-backend

FRONTEND
Build:
    cd frontend
    docker build -t imy220-frontend .
Run:
    docker run -p 5173:5173 --name imy220-frontend-container imy220-frontend

Access the application at http://localhost:5173

STOP AND REMOVE CONTAINERS
    docker stop imy220-frontend-container imy220-backend-container
    docker rm imy220-frontend-container imy220-backend-container