FROM nginx
COPY src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf