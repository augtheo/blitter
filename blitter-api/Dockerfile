FROM openjdk:17-jdk-alpine as build
WORKDIR /workspace/app

COPY gradlew gradlew
COPY gradle gradle
COPY .gradle .gradle
COPY settings.gradle settings.gradle

COPY blitter-oas blitter-oas

COPY blitter-api/build.gradle blitter-api/build.gradle
COPY blitter-api/settings.gradle blitter-api/settings.gradle
COPY blitter-api/src blitte-api/src

RUN ./gradlew :blitter-api:bootJar
RUN mkdir -p blitter-api/target/dependency && (cd blitter-api/target/dependency; jar -xf ../../build/libs/*.jar)


FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/blitter-api/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.augtheo.blitter.BlitterAPIApplication"]
