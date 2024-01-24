FROM mysql:8.0

# Tạo một thư mục để chứa tệp SQL
# RUN mkdir /docker-entrypoint-initdb.d

# Sao chép tệp SQL vào thư mục initdb.d trong container
COPY ./data/init.sql /docker-entrypoint-initdb.d/

# Thiết lập biến môi trường cho MySQL
ENV MYSQL_DATABASE=manager_student
ENV MYSQL_ROOT_PASSWORD=123

# Bạn cũng có thể thiết lập các biến môi trường khác ở đây nếu cần
# ENV MYSQL_USER=your_user

EXPOSE 3306
