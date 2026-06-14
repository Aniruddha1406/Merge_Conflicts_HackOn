FROM nginx:alpine
# Copy the pre-built React app
COPY dist /usr/share/nginx/html

# Copy a custom nginx config to handle React Router and API proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
