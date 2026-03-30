# ================= Build stage =================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom và tải dependency offline
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy toàn bộ source code
COPY src ./src

# Build jar, skip test
RUN mvn clean package -Dmaven.test.skip=true

# ================= Runtime stage =================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy jar từ stage build
COPY --from=build /app/target/*.jar app.jar

# ENV cho Spring Boot
ENV SPRING_PROFILES_ACTIVE=dev
ENV JAVA_OPTS=""

# Local port
EXPOSE 8080

# Chạy Spring Boot app
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
