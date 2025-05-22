export const piholeCompose = `# More info at https://github.com/pi-hole/docker-pi-hole/ and https://docs.pi-hole.net/
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    # For DHCP it is recommended to remove these ports and instead add: network_mode: "host"
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8008:80/tcp"
    environment:
      TZ: 'Europe/Amsterdam'
      WEBPASSWORD: 'YOURPASSWORD'
    # Volumes store your data between container upgrades
    volumes:
      - '/pihole/etc-pihole:/etc/pihole'
      - '/pihole/etc-dnsmasq.d:/etc/dnsmasq.d'    
    #   https://github.com/pi-hole/docker-pi-hole#note-on-capabilities
    cap_add:
      - NET_ADMIN # Recommended but not required (DHCP needs NET_ADMIN)      
    restart: unless-stopped`;

export const openspeedtestCompose = `services:
  speedtest:
    container_name: openspeedtest
    image: openspeedtest/latest
    ports:
      - '3000:3000'
      - '3001:3001'
    restart: unless-stopped
`;

export const dokemonsiteCompose = `services:
  dokemon-site:
    container_name: dokemon-site
    image: javastraat/dokemon-site:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
`;
