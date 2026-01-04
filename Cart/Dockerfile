FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Cart service runs on 9003
EXPOSE 9003

CMD ["npm", "start"]
