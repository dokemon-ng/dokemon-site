@echo off
git pull
docker buildx build --platform linux/amd64,linux/arm64 -t javastraat/dokemon-site:latest -f .\Dockerfile.buildx --push .
pause

