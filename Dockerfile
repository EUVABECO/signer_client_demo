FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY app/. /usr/share/nginx/html
EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
