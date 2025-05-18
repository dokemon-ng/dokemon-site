sudo docker build -t javastraat/dokemon-site -f Dockerfile .
sudo docker push javastraat/dokemon-site:latest
git add *
git commit -m "fixed some things"
git push

