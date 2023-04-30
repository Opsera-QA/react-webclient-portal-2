FROM node:18-alpine3.17 as build
ARG build_env=kube-generic
RUN echo ${build_env}
RUN apk add curl
RUN rm -rf  /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP false
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY .npmrc /usr/src/app/.npmrc
#This line is needed when installing different versions for building the project.
#RUN npm install npm@9.5.0 react-app-rewired@2.2.1 react-scripts@5.0.0 -g --legacy-peer-deps
RUN npm install
COPY . /usr/src/app
RUN npm run build:${build_env}
RUN mv build* code
RUN ls -lrt

FROM httpd:2.4.52-alpine
COPY apache-configs/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY apache-configs/my-htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /usr/src/app/code /usr/local/apache2/htdocs/
EXPOSE 80
