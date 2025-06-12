### ✍️ Dokémon Website

<div align="center">
  <img src="https://raw.githubusercontent.com/dokemon-ng/.github/refs/heads/main/dokemon-logo.png" width="500" alt="Dokémon (Dokemon) Logo">
</div>

![Supports arm64 Architecture][arm64-shield] ![Supports amd64 Architecture][amd64-shield] ![Supports armv7 Architecture][armv7-shield]

[arm64-shield]: https://img.shields.io/badge/arm64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[repository-badge]: https://img.shields.io/badge/Add%20repository%20to%20my-Home%20Assistant-41BDF5?logo=home-assistant&style=for-the-badge
[repository-url]: https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fdokeomon-ng%2Fhomeassistant-addons

## Running Locally (No Docker)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the app:

   ```bash
   npm run build
   ```

3. Start the server:

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

---

## Running with Docker

If you prefer to run the site in a container:

```bash
docker run -d --name dokemon-site -p 3000:3000 javastraat/dokemon-site:latest
```
