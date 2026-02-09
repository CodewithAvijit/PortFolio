# Stage 1: Build using Oracle's JDK 25 (The most likely to exist)
FROM container-registry.oracle.com/java/openjdk:25 AS build
WORKDIR /app

# Oracle images often don't have Maven, so we download it
RUN microdnf install -y maven

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Run
FROM container-registry.oracle.com/java/openjdk:25
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]