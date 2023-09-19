FROM nginx:latest
LABEL authors="andrew"

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the react build
COPY build/ usr/share/nginx/html/

ENTRYPOINT ["top", "-b"]