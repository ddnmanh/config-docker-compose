# Sử dụng một image NodeJS với tag LTS
FROM node:lts

# Tạo thư mục làm việc trên docker container /app
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc trên docker container
COPY package*.json ./

# Cài đặt dependencies trên docker container
RUN npm install
RUN npm install pm2 -g

# Sao chép toàn bộ dự án vào thư mục làm việc /app trên docker container
COPY . .

# Mở cổng trên docker container
EXPOSE 80
 
# Thiết lập biến môi trường cho host của database
ENV DB_HOST=mysql-database
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=123
ENV DB_DATABASE=manager_student
ENV DOMAIN_FRONTEND=http://localhost:8000

# Khởi chạy ứng dụng khi docker container được khởi động
# CMD ["npm", "start"]
CMD ["pm2-runtime", "server.js", "--watch"]
