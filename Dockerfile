# Stage 1: Build using JDK 25
FROM openjdk:25-jdk-slim AS build
WORKDIR /app

# Install Maven manually since standard Maven images don't have JDK 25 yet
RUN apt-get update && apt-get install -y maven

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run using JRE 25 (or JDK 25 if JRE is unavailable)
FROM openjdk:25-jdk-slim
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]