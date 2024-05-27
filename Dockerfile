FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
#RUN npm run --prod
RUN npm run build

# FROM nginx:1.15.8-alpine
# RUN apk add certbot
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder /usr/src/app/www /usr/share/nginx/html
