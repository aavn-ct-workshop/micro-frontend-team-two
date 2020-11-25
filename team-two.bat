@echo off
call docker build -t team-two .
call docker stop team-two
call docker run -p 8003:8003 team-two