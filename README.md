<div align="center">
    <p>
    <a href="https://blitter.augtheo.com/">
        <img alt="Blitter" src="./blitter-web/public/logo.svg">
    </a>
    </p>
    <br>
    <p>
        <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"/>
        <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
        <img src="https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind&logoColor=white"/>
        <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
    </p>
    A containerized twitter clone built with Spring, React and Tailwind
    
---
</div>

# setup

Run the following command to create DB credentials and generate an RSA private and public keys pair and place them at `blitter-api/src/main/resources/`


```bash
./setup.sh 
```

# build

```bash
docker compose -f docker-compose.yml -f docker-compose-dev.yml build
```

# run
```bash
docker compose -f docker-compose.yml -f docker-compose-dev.yml up
```


