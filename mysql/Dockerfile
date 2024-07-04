FROM mysql:8.0

# Tạo một thư mục để chứa tệp SQL
# RUN mkdir /docker-entrypoint-initdb.d

# Sao chép tệp SQL vào thư mục initdb.d trong container
COPY ./data/init.sql /docker-entrypoint-initdb.d/

# Thiết lập biến môi trường cho MySQL, mặc định tài khoản là root
ARG DATABASE_NAME
ENV MYSQL_DATABASE=${DATABASE_NAME}
ARG DATABASE_USER_ROOT_PASSWORD
ENV MYSQL_ROOT_PASSWORD=${DATABASE_USER_ROOT_PASSWORD}

# Bạn cũng có thể thiết lập các biến môi trường khác ở đây nếu cần
# ENV MYSQL_USER=your_user

EXPOSE 3306
