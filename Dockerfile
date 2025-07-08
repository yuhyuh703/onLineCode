FROM openjdk:22-slim

EXPOSE 80

RUN apt-get update
RUN apt-get install -y maven
RUN apt-get install -y wget

COPY files /app
RUN cd app && mvn clean package -DskipTests

ENTRYPOINT java -jar -Dspring.profiles.active=prod /app/target/summerschool-0.0.1-SNAPSHOT.jar