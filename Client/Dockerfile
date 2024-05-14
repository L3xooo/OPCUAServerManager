# Stage 1: Build Stage
FROM node:20-bullseye-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production Stage
FROM node:20-bullseye-slim as production
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm", "run", "dev"]
