# Stage 2: Set up Express app
FROM node:18

WORKDIR /usr/src/app

# Copy the Express app's package.json and package-lock.json
COPY server/package*.json ./

# Install Express dependencies
RUN npm install

# Copy the Express app files
COPY server/ .

# Install PM2 globally
RUN npm install pm2 -g


# Expose port 3001 for Express app
EXPOSE 3001



# Start the server using PM2
CMD ["pm2-runtime", "app.js"]