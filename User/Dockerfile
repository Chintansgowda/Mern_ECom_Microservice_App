FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# User service runs on 9001
EXPOSE 9001

CMD ["npm", "start"]
