### ✍️ Dokémon Website

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
