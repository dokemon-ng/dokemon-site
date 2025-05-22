export const command = `# Create directory to store Dokémon data
sudo mkdir /dokemondata

# Run Dokémon
sudo docker run -p 9090:9090 \\
      -v /dokemondata:/data \\
      -v /var/run/docker.sock:/var/run/docker.sock \\
      --restart unless-stopped \\
      --name dokemon-server -d javastraat/dokemon-server:latest`;

export const volumeCommand = `# Create Docker volume for Dokémon data
sudo docker volume create dokemondata

# Run Dokémon with volume
sudo docker run -p 9090:9090 \\
      -v dokemondata:/data \\
      -v /var/run/docker.sock:/var/run/docker.sock \\
      --restart unless-stopped \\
      --name dokemon-server -d javastraat/dokemon-server:latest`;

export const compose = `version: "3"
services:
  dokemon-server:
    container_name: dokemon-server
    image: javastraat/dokemon-server:latest
    ports:
      - 9090:9090
    volumes:
      - /dokemondata:/data
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
`;

export const composeVolume = `version: "3"
services:
  dokemon-server:
    container_name: dokemon-server
    image: javastraat/dokemon-server:latest
    ports:
      - 9090:9090
    volumes:
      - dokemondata:/data
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped

volumes:
    dokemondata:
`;

export const traefikConfig = `version: "3.3"

services:
  traefik:
    container_name: "traefik"
    image: "traefik:v2.10"
    command:
      - "--log.level=DEBUG"
      - "--accesslog=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.dokemon.acme.tlschallenge=true"
      - "--certificatesresolvers.dokemon.acme.email=your.email@example.com"
      - "--certificatesresolvers.dokemon.acme.storage=/letsencrypt/dokemon.json"
    ports:
      - "443:443"
      - "8080:8080"
    volumes:
      - "./letsencrypt:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  dokemon:
    container_name: dokemon-server
    image: javastraat/dokemon-server:latest
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dokemon.rule=Host(\`dokemon.example.com\`)"
      - "traefik.http.routers.dokemon.entrypoints=websecure"
      - "traefik.http.routers.dokemon.tls.certresolver=dokemon"
    ports:
      - 9090:9090
    volumes:
      - /dokemondata:/data
      - /var/run/docker.sock:/var/run/docker.sock
`;
