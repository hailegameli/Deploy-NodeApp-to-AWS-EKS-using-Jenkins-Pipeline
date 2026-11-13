ARG IN Dockerfile for NODE.js
------------------------------------------
FROM node:latest

WORKDIR /data

COPY package*.json ./

ARG NODEFILE

RUN npm install

RUN npm install express

COPY $NODEFILE ./slow.js

EXPOSE 3000

CMD ["node", "slow.js"]

#During build of image we use :$$$ docker build  --build-arg NODEFILE=server.js -t nodejs .
#ARG is only used in BUILDING a docker image
-----------------------------------------------------------------------------------------------------------------------------

 # ARG FOR NGINX WEBSERVER
    
FROM nginx:latest
ARG WEBSERVER=index.html    ------>>>> The argumrent is WEBSERVER=index.html
COPY $WEBSERVER /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", " daemon off;"]

root@ip-172-31-23-220:~/file/sample-project-codebase# ls
Dockerfile  app.html  css  file.html  fonts  img
root@ip-172-31-23-220:~/file/sample-project-codebase# docker build --build-arg WEBSERVER=file.html -t nginxxx .

# -----------------------------------------------------------------------------------------------------------------------------------
# ARG FOR HTTPD
FROM httpd:latest
ARG WEBSERVER=index.html
COPY $WEBSERVER /usr/local/apache2/htdocs/index.html
EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]


root@ip-172-31-23-220:~/file/sample-project-codebase# ls
Dockerfile  app.html  css  file.html  fonts  img
docker build --build-arg WEBSERVER=app.html -t httpd .

# ALWAYS MAKE THE VALUE index.html when writing the ARG OR ELSE IT WILL FAIL !!!

# ----------------------------------------------------------------------------------------------------------------------- 

# DOCKERFILE FOR TOMCAT and JAVA app

FROM tomcat:9-jdk8
RUN rm -rf /usr/local/tomcat/webapps/*.war
COPY /target/*.war /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]


# USING ARG WHEN THERE ARE MULTIPLE JAR FILES
FROM tomcat:9-jdk8
WORKDIR /usr/local/tomcat
# Build-time argument: WAR file name
ARG WAR_FILE=target/addressbook.war
# Remove default Tomcat applications
RUN rm -rf webapps/*
# Copy selected WAR file and deploy as ROOT application
COPY ${WAR_FILE} webapps/ROOT.war
EXPOSE 8080
CMD ["catalina.sh", "run"]

addressbook-project/
├── Dockerfile
├── pom.xml
└── target/
    ├── addressbook.war
    └── employee.war

docker build --build-arg WAR_FILE=target/addressbook.war -t tomcat-app:addressbook .
docker build --build-arg WAR_FILE=target/employee.war -t tomcat-app:employee .
  
