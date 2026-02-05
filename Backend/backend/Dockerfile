FROM node:18-alpine

WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json* ./

# Install only what is needed to run + build
RUN npm install

# Copy project files
COPY . .

# Build Strapi admin
RUN npm run build

EXPOSE 4001

CMD ["npm", "run", "start"]
