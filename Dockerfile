FROM node:10-alpine as base

# Install tools needed for build
RUN apk update && \
    apk add gcc git libc-dev make

# Install mp3cat
WORKDIR /mp3cat
RUN git clone https://github.com/tomclegg/mp3cat.git . && \
    make

ENV PATH="/mp3cat:${PATH}"

# Cleanup
RUN apk del gcc git libc-dev make

# Install node dependencies
FROM base as node-build

# Set the working directoy to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in package.json
RUN npm install && \
    cd client && \
    npm install && \
    npm run build && \
    cd ..

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV PORT 80

# Run server
CMD ["npm", "run", "start:prod"]