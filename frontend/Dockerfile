
# Sử dụng một image node để xây dựng dự án ReactJS 
FROM node:lts AS build

# Tạo thư mục làm việc trên docker container /app
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc trên docker container
COPY package*.json ./

# Cài đặt dependencies trên docker container
RUN npm install

# Sao chép toàn bộ dự án vào thư mục làm việc /app trên docker container
COPY . ./

# Build ứng dụng trên docker container
RUN npm run build 

# Cấu hình Nginx để phục vụ file tĩnh (React đã build)
FROM nginx:alpine

# Sao chép các file tĩnh đã build vào thư mục mặc định của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx đã được định nghĩa vào docker container
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 trên docker container
EXPOSE 80 

ENV REACT_APP_DOMAIN_SERVER = http://localhost:8000/api

# Lệnh chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
