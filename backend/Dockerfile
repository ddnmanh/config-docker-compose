FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 80
 
# Thiết lập biến môi trường cho host của database
ENV DB_HOST=mysql-database
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=123
ENV DB_DATABASE=manager_student

# Ghi đè biến môi trường từ file compose.yaml
ARG DOMAIN_ACCEPT_CORS
ENV DOMAIN_FRONTEND=${DOMAIN_ACCEPT_CORS}

# Khởi chạy ứng dụng với pm2 khi docker container được khởi động
CMD ["pm2-runtime", "server.js", "--watch"]
