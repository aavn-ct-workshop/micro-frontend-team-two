docker build -t team-two .
docker stop team-two
docker run -p 8003:8003 team-two