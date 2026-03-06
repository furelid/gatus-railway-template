ARG VERSION=v5.35.0

# Gatus a
FROM twinproduction/gatus:${VERSION} AS builder

# Build the final image, with sh
FROM alpine:latest
WORKDIR /app
COPY --from=builder /gatus /app/gatus
COPY --from=builder /config/ /app/config/
COPY config/ /app/config/

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

ENV GATUS_CONFIG_PATH="/app/config"
ENV GATUS_LOG_LEVEL="INFO"
ENV PORT="8080"
EXPOSE ${PORT}

# ENTRYPOINT ["/app/gatus"]
# sleep infinity to keep the container running for testing purposes
ENTRYPOINT ["sh", "-c", "sleep infinity"]
