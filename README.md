# Cấu hình Docker compose cho React, Express, MySQL

Đây là cấu hình docker-compose và dockerfile cho một cấu trúc dự án fullstack theo hướng RESTFul. Frontend viết bằng thư viện React, backend viết bằng Express, sử dụng MySQL cho cơ sở dữ liệu.

## Tải mã nguồn
```terminal
git clone https://github.com/nguyenducmanhmysc/config-docker-compose.git
```

## Build dự án với Docker
Di chuyển vào thư mục dự án
```terminal
cd config-docker-compose
```
Phương thức 1: Build Docker-image, Docker-container, Docker-volume trong một lệnh
```terminal
docker-compose up --build -d
```
Phương thức 2: Build Docker-image và Docker-container từng bước
1. Build Docker-image
```terminal
docker-compose build
```
2. Build Docker-container, Docker-volume
```terminal
docker-compose up -d
```

Sau bước này
    - 4 Docker-image sẽ được tạo ra "\*-frontend-app", "\*-backend-app", "\*-mysql-database-app", "\*-proxy-app"
    - 4 Docker-container sẽ được tạo ra "frontend", "backend", "mysql-database", "proxy"
    - bộ dữ liệu MySQL mẫu đã được tạo sẳn chứa trong Docker-container "mysql-database" và Docker-volume "\*-mysql-database-volume-app"

### Lưu ý
Mặc dù việc build dự án và dữ liệu MySQL mẫu khởi tạo thành công nhưng vì lý do nào đó đã khiến cho dữ liệu không hiển thị trong container "mysql-database" (Bạn có thể chạy lệnh sau để kiểm tra `docker exec -it mysql-database mysql -u root -p`). 
Cho đến thời điểm hiện tại việc tốt nhất để khắc phục lỗi này là thực hiện lệnh sau:
```terminal
docker restart mysql-database backend
```

## Kiểm tra dự án
### Kiểm tra Docker-container "frontend"
Truy cập trình duyệt với url sau
```terminal
http://localhost:8000
```

### Kiểm tra Docker-container "backend"
Truy cập trình duyệt với url sau
```terminal
http://localhost:8000/api
```
hoặc
```terminal
http://localhost:8000/api/query/student
```

### Kiểm tra Docker-container "mysql-database"
Quay trở lại terminal và chạy lệnh sau
```terminal
docker exec -it mysql-database mysql -u root -p
``` 
Nhập mật khẩu 123 (Mật khẩu sẽ không hiển thị)

Xem các cơ sở dữ liệu hiện có trong container "mysql-database"
```terminal
show databases;
```
## Trỏ tên miền
*Sau khi build và chạy Docker-compose thành công, Dự án sẽ chạy ở máy chủ với địa chỉ `http://localhost:8000` cổng 8000 là cổng proxy tiếp nhập yêu cầu được cấu hình trong file `compose.yaml`
Giả sử cần trỏ tên miền `app.abc.com` về dự án này:
1. Kiểm tra ip của server
   <br>Ví dụ ip server của bạn là: `171.248.108.76`
2. Truy cập vào nhà quản lý tên miền
   <br>Thiết lập `app.abc.com` đến `171.248.108.76:8000`