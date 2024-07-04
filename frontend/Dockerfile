
FROM node:lts AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./ 

# Ghi đè biến môi trường từ file compose.yaml
ARG DOMAIN_BACKEND
ENV REACT_APP_DOMAIN_SERVER=${DOMAIN_BACKEND}
ARG DOMAIN_BACKEND_API
ENV REACT_APP_DOMAIN_SERVER_API=${DOMAIN_BACKEND_API}
ARG DOMAIN_BACKEND_STATIC
ENV REACT_APP_DOMAIN_SERVER_STATICS=${DOMAIN_BACKEND_STATIC}

RUN npm run build 

# Cấu hình Nginx để phục vụ file tĩnh (React đã build)
FROM nginx:alpine

# Sao chép các file tĩnh đã build vào thư mục mặc định của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx đã được định nghĩa vào docker container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80   

CMD ["nginx", "-g", "daemon off;"]
