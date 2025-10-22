# official Node.js image
FROM node:18-alpine

# working directory
WORKDIR /app

# Copying only package files 
COPY package*.json ./

# Installing dependencies
RUN npm install --only=production

# Copying the rest of the app
COPY . .

# Expose the app port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
