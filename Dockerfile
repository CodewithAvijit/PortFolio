# # Stage 1: Use a standard Maven image to fetch dependencies
# FROM maven:3.9.6-eclipse-temurin-21 AS build_base
# WORKDIR /app

# # Copy your pom.xml
# COPY pom.xml .

# # Stage 2: Switch to JDK 25 to actually compile the code
# # We manually copy Maven from the previous stage to this one
# FROM openjdk:25-ea-jdk-oracle AS build
# WORKDIR /app

# # Copy Maven binaries from the build_base stage
# COPY --from=build_base /usr/share/maven /usr/share/maven
# COPY --from=build_base /usr/bin/mvn /usr/bin/mvn

# # Set up environment variables so the system knows where Maven is
# ENV MAVEN_HOME=/usr/share/maven
# ENV PATH=$MAVEN_HOME/bin:$PATH

# # Copy the source code
# COPY . .

# # Run the build using the JDK 25 compiler
# RUN mvn clean package -DskipTests

# # Stage 3: Final Runtime Image
# FROM openjdk:25-jdk-slim
# WORKDIR /app

# COPY --from=build /app/target/*.jar app.jar

# EXPOSE 8000

# ENTRYPOINT ["java", "-jar", "app.jar"]


# -------- Stage 1: Build --------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .
RUN mvn clean package -DskipTests


# -------- Stage 2: Runtime --------
FROM openjdk:25-jdk-slim
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8000
ENTRYPOINT ["java", "-jar", "app.jar"]
