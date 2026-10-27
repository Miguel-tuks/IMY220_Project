Grain - IMY 220 Project 2026
Miguel De Freitas u23744512
GitHub: https://github.com/Miguel-tuks/IMY220_Project

RUN WITH DOCKER (from the project root)
    docker build -t imy220-backend ./backend
    docker run -d -p 3000:3000 --name imy220-backend-container imy220-backend
    docker build -t imy220-frontend ./frontend
    docker run -d -p 5173:5173 --name imy220-frontend-container imy220-frontend
Open http://localhost:5173 

TEST ACCOUNTS
    test@test.com / test1234
    admin@grain.com / admin123
    All other users use password123

DATABASE
    Database name: grain
    Connection string:
    mongodb+srv://grain_user:pn3XObnCJA2BJzLH@cluster0.k0faycn.mongodb.net/?appName=Cluster0
    Exported data: database/ folder 
    Reset to test data: docker run --rm imy220-backend node seed.js

DIRECTORY STRUCTURE
    backend/     server.js (routes), db.js (MongoDB connection),
                 models/ (database functions), seed.js, export.js, Dockerfile
    frontend/    index.html, public/images/ (favicon),
                 src/components/, src/pages/, src/styles/, Dockerfile
    database/    Exported MongoDB data in JSON format