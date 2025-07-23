# Use a Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have one)
# to install dependencies
COPY package*.json ./

# Install Node.js dependencies, including task-master-ai
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]