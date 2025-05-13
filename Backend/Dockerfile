# Builder
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o deathnote .

# Runtime
FROM alpine:latest
WORKDIR /root
COPY --from=builder /app/deathnote .
COPY config/config.json ./config/config.json
CMD ["./deathnote"]
