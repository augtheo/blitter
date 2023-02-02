FROM openjdk:17-jdk-alpine as build
WORKDIR /workspace/app

COPY gradlew .
COPY gradle gradle
# COPY .gradle .gradle
COPY build.gradle .
COPY settings.gradle .
RUN ./gradlew --version


COPY src src

RUN ./gradlew bootJar
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../../build/libs/*.jar)


FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.augtheo.blitter.BlitterAPIApplication"]
