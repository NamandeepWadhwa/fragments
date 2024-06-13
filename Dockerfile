# This a docker file, the capital letter D is intentional and there is no ext for it

# Every docker file stat with a base image, which is the image that we are going to use to build our image on top of it. We are using node image here
FROM node:20.12.2

# LABEL is used to add metadata to the image
LABEL maintainer="Namandeep Singh Wadhwa, naman23156@outlook.com"
LABEL description="Fragment node js microservice"

# We use ENV to set environment variables in the image

# We default to use port 8080 in our service
ENV PORT=8080

# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

# Use /app as our working directory
WORKDIR /app

# files into /app. NOTE: the trailing `/` on `/app/`, which tells Docker
# that `app` is a directory and not a file.
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm install

# Copy src to /app/src/
COPY ./src ./src

# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD npm start

# We run our service on port 8080
EXPOSE 8080
