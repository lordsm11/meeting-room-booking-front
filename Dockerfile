FROM nginx:1.14

RUN mkdir /usr/share/nginx/html/booking-front
COPY build /usr/share/nginx/html/booking-front

RUN sed -i 's+/usr/share/nginx/html+/usr/share/nginx/html/booking-front+g' /etc/nginx/conf.d/default.conf

EXPOSE 80
