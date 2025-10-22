# Node.js Portfolio CI/CD with Docker and Jenkins

This repository demonstrates a complete CI/CD pipeline for my Node.js portfolio application using Jenkins and Docker.

---

## Overview

- A simple Node.js portfolio app built with Express.js  
- Dockerfile to containerize the application  
- Jenkins pipeline for automating CI/CD (build → test → DockerHub push → EC2 deployment)  
- Deployment target: AWS EC2 instance running Docker  

---

## Workflow Summary

1. **Code Checkout:** Pulls the latest code from the main branch  
2. **Install Dependencies:** Installs exact Node.js dependencies using `npm ci`  
3. **Run Tests:** Executes `npm test` to validate the application  
4. **Docker Build & Push:** Builds the Docker image and pushes it to DockerHub  
5. **EC2 Deployment:** SSH into EC2, pull the latest image, stop/remove any running container, and run the new container  

---

## Secrets Required

- `GITHUB` → GitHub credentials (used for repo checkout)  
- `DOCKERHUB` → DockerHub credentials (used for Docker login and push)  
- `EC2` → EC2 credentials (SSH private key and username for deployment)  

---

## Outcome

- Automated CI/CD pipeline triggered on every push to main  
- Docker image is built and pushed to DockerHub automatically  
- Latest version of the portfolio app is deployed to EC2  

---

## Access

Once deployed, the portfolio can be accessed at:  
http://3.110.188.30/
