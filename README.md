# Cấu hình Docker compose, sử dụng Docker hub, triển khai lên server Ubuntu cho dự án sử dụng React, Express, MySQL

Đây là hướng dẫn mẫu cho việc cấu hình Docker-compose và Dockerfile cho một cấu trúc dự án fullstack theo hướng RESTFul API, sử dụng kĩ thuật CSR (Client-side rendering). 

Công nghệ:
* Frontend: Sử dụng thư viện ReactJS.
* Backend: Sử dụng framework ExpressJS.
* Database: Sử dụng MySQL.

Dự án "xem danh sách sinh viên" được thiết kế đơn giản, nhằm mô phỏng các vấn đề cơ bản của một web app:
* Tương tác giữa client và server qua API
* Đọc ghi dữ liệu vào cơ sở dữ liệu MySQL.

Một số URL quan trọng:
* URL frontend: `http://localhost:8000/`
* URL backend:
  * Kiểm tra backend: `http://localhost:8000/api`
  * Lấy danh sách sinh viên: `http://localhost:8000/api/query/student`

## Mục lục
1. [Tải mã nguồn](#1-tải-ma-nguồn)
2. [Chạy dự án ở localhost](#2-chạy-dự-án-với-docker-compose-ở-localhost)

   2.1 [Build và chạy dự án](#21-build-và-chạy-dự-án)

   2.2 [Kiểm tra](#22-kiểm-tra) 
   
3. [Đẩy Docker-image lên Docker hub](#3-đẩy-docker-image-lên-docker-hub)

   3.1 [Kiểm tra các Docker-image](#31-kiểm-tra-các-docker-image)
   
   3.2 [Tạo các reposotory trên Docker hub](#32-tạo-các-repository-trên-docker-hub)
   
   3.3 [Đẩy Docker-image lên Docker hub](#33-Đẩy-Docker-image-lên-Docker-hub)
   
   3.4 [Sửa tệp compose.yaml](#34-Sửa-tệp-composeyaml)
   
   3.5 [Đẩy tệp compose.yaml lên kho lưu trữ](#35-Đẩy-tệp-composeyaml-lên-kho-lưu-trữ) 

4. [Triển khai dự án lên server Ubuntu theo Docker-compose](#4-triển-khai-dự-án-lên-server-ubuntu-theo-docker-compose)

   4.1 [Tải tệp cấu hình Docker-compose](#41-tải-tệp-cấu-hình-docker-compose-của-dự-án)

   4.2 [Xác định địa chỉ truy cập và cấu hình DNS](#42-xác-định-địa-chỉ-truy-cập-và-cấu-hình-dns-cho-domain)
   
   4.3 [Cấu hình lại Docker-compose](#43-cấu-hình-lại-docker-compose)
   
   4.4 [Chạy dự án](#44-chạy-dự-án)

   
   


## 1. Tải mã nguồn
```terminal
git clone https://github.com/nguyenducmanhmysc/config-docker-compose.git
```
Di chuyển vào thư mục dự án
```terminal
cd config-docker-compose
```

## 2. Chạy dự án với Docker-compose ở localhost
### 2.1 Build và chạy dự án
**Phương thức 1: Build trong một lệnh**
```terminal
docker-compose up --build -d
```
**Phương thức 2: Build từng bước**
1. Build Docker-image
```terminal
docker-compose build
```
2. Build Docker-container, Docker-volume
```terminal
docker-compose up -d
```
## Lưu ý
Mặc dù việc build dự án và dữ liệu MySQL mẫu khởi tạo thành công nhưng vì lý do nào đó đã khiến cho dữ liệu không hiển thị trong container "mysql-database" (Bạn có thể chạy lệnh sau để kiểm tra `docker exec -it mysql-database mysql -u root -p`). Cho đến thời điểm hiện tại việc tốt nhất để khắc phục lỗi này là khởi động lại Docker-container `mysql-database-app` và `backend-app`:

- Xem danh sách các Docker-container (Bao gồm các Docker-container đã dừng)
```terminal
docker ps -a
```
Một bảng tương tự sẽ hiện ra:
```bash
CONTAINER ID   IMAGE                                      ...   PORTS                  NAMES
47635235a510   config-docker-compose-mysql-database-app   ...   3306/tcp, 33060/tcp    mysql-database
a9512c3b8249   config-docker-compose-frontend-app         ...   80/tcp                 frontend
07ca7d741bd7   config-docker-compose-proxy-app            ...   0.0.0.0:8000->80/tcp   proxy
57601c1a68c0   config-docker-compose-backend-app          ...   80/tcp                 backend
```

- Khởi động lại Docker-container 'backend' và 'mysql-database' bằng 'CONTAINER ID' tương ứng**
```terminal
docker restart 47635235a510 57601c1a68c0
```

### 2.2 Kiểm tra
Kiểm tra cơ sở dữ liệu trong Docker-container "mysql-database"
1. Quay trở lại terminal và chạy lệnh sau
```terminal
docker exec -it mysql-database mysql -u root -p
``` 
2. Nhập mật khẩu `123` (Mật khẩu sẽ không hiển thị)

3. Xem các cơ sở dữ liệu hiện có trong container "mysql-database"
```terminal
show databases;
```

## 3. Đẩy Docker-image lên Docker hub
Việc đẩy Docker-image lên Docker hub nhằm chia sẽ dự án cho cộng đồng và đảm bảo không bị lộ mã nguồn. Khi người dùng cần sử dụng, họ chỉ cần có được tệp `compose.yaml` và chạy lệnh `docker-compose up -d` các Docker-image sẽ được kéo về và khởi chạy Docker-container.
### 3.1 Kiểm tra các Docker-image
```terminal
docker image ls
```
Kết quả tương tự như sau:
```
REPOSITORY                                    TAG       IMAGE ID        SIZE
config-docker-compose-frontend-app            latest    579f76936007    43.1MB
ducmanhjr/config-docker-compose-backend-app   latest    fcd223882dcd    1.14GB
config-docker-compose-backend-app             latest    fcd223882dcd    1.14GB
config-docker-compose-mysql-database-app      latest    200d8c7be88d    603MB
config-docker-compose-proxy-app               latest    2ac3cd723203    42.6MB
```
### 3.2 Tạo các repository trên Docker hub
Trong hướng dẫn này các repository tương ứng với các Docker-image sẽ được đặt theo tên của Docker-image (Bạn có thể sử dụng tên khác). User của Docker hub được sử dụng là `ducmanhjr`.
```
IMAGE                                            REPOSITORY NAME
config-docker-compose-mysql-database-app   --->  config-docker-compose-mysql-database-app
config-docker-compose-frontend-app         --->  config-docker-compose-frontend-app
config-docker-compose-proxy-app            --->  config-docker-compose-proxy-app
config-docker-compose-backend-app          --->  config-docker-compose-backend-app
```
### 3.3 Đẩy Docker-image lên Docker hub
Cú pháp: `docker tag <docker-image-name> <user-docker-hub>/<repository-name`.

Ví dụ đẩy Docker-image 'config-docker-compose-backend-app' lên Docker hub

```terminal
docker tag config-docker-compose-backend-app ducmanhjr/config-docker-compose-backend-app
```

### 3.4 Sửa tệp `compose.yaml`
Thêm các thuộc tính `image` để chỉ rõ địa chỉ repository cho cho từng `services`.

Cú pháp: `image: <user-docker-hub>/<repository-name>`.

Ví dụ cho service 'mysql-database-app', 'backend-app':

```yaml
services: 
   mysql-database-app:
      build:
         context: ./mysql
         dockerfile: ./Dockerfile
      container_name: mysql-database  
      volumes:
         - mysql-database-volume-app:/var/lib/mysql
      networks:
         - this-project-network 
      image: ducmanhjr/config-docker-compose-mysql-database-app

   backend-app:
      build:
         context: ./backend
         dockerfile: ./Dockerfile
         args: 
            - DOMAIN_ACCEPT_CORS=http://localhost:8000
      container_name: backend 
      networks:
         - this-project-network
      image: ducmanhjr/config-docker-compose-backend-app

   ...
```
### 3.5 Đẩy tệp `compose.yaml` lên kho lưu trữ
Lựa chọn GitHub cho việc lưu trữ tệp `compose.yaml` (chỉ cần đẩy duy nhất tệp này để tránh lộ mã nguồn).

Bạn có thể tham khảo thêm tài liệu tạo và đẩy dự án lên repository của GitHub [tại đây](https://www.digitalocean.com/community/tutorials/how-to-push-an-existing-project-to-github).

## 4. Triển khai dự án lên server Ubuntu theo Docker-compose
Yêu cầu: Đã cài đặt Git, Docker, Docker-compose cho server thành công

Tài liệu tham khảo:
* [Cài đặt và cấu hình Git trên Ubuntu](https://phoenixnap.com/kb/how-to-install-git-on-ubuntu#ftoc-heading-3).
* [Cài đặt và sử dụng Docker trên Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04).
  
### 4.1 Tải tệp cấu hình Docker-compose của dự án
Cú pháp: `git clone <url repository>`
### 4.2 Xác định địa chỉ truy cập và cấu hình DNS cho domain
* Lựa chọn domain truy cập

  Giả sử chọn domain sau: `conf-docker-compose.example.com`.

* Kiểm tra ip của server triển khai dự án

   Ví dụ ip server là: `171.248.108.76`.

* Xác định cổng Docker-compose cho phép truy cập 

Cấu hình của `proxy-app` trong tệp `compose.yaml` cho thấy dự án sẽ chạy ở cổng `8000`.

```yaml
... 
    proxy-app:
        build:
            context: ./proxy
            dockerfile: ./Dockerfile 
        container_name: proxy 
        networks:
            - this-project-network
        ports:
            - "8000:80"
...
```

* Cấu hình DNS cho domain

   Truy cập vào nhà quản lý tên miền và thiết lập `conf-docker-compose.example.com` trỏ đến địa chỉ `171.248.108.76:8000`.

### 4.3 Cấu hình lại Docker-compose 
Trong tệp `compose.yaml` tìm và thay thế các `http://localhost:8000` bằng `http://conf-docker-compose.example.com:8000`.

Trước khi thay thế
```yaml
# Backend
backend-app: 
    build:
        context: ./backend
        dockerfile: ./Dockerfile
        args: 
            - DOMAIN_ACCEPT_CORS=http://localhost:8000
    container_name: backend 
    networks:
        - this-project-network

# Frontend 
frontend-app:
    build:
        context: ./frontend
        dockerfile: ./Dockerfile  
        args: 
            - DOMAIN_BACKEND=http://localhost:8000/api
    container_name: frontend  
    networks:
        - this-project-network
```

Sau khi thay thế
```yaml
# Backend
backend-app: 
    build:
        context: ./backend
        dockerfile: ./Dockerfile
        args: 
            - DOMAIN_ACCEPT_CORS=http://conf-docker-compose.example.com:8000
    container_name: backend 
    networks:
        - this-project-network

# Frontend 
frontend-app:
    build:
        context: ./frontend
        dockerfile: ./Dockerfile  
        args: 
            - DOMAIN_BACKEND=http://conf-docker-compose.example.com:8000/api
    container_name: frontend  
    networks:
        - this-project-network
```

### 4.4 Chạy dự án
Tương tự như chạy dự án ở localhost [Lối tắt](#2-chạy-dự-án-với-docker-compose-ở-localhost).

