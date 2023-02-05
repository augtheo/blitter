<div align="center">
    <a href="https://blitter.augtheo.com/">
        <img alt="Blitter" src="./blitter-web/public/logo.svg">
    </a>
</div>
<hr>

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A containerized twitter clone built with Spring, React and Tailwind

# setup

Run the following command to generate an RSA private and public keys pair and place them inside `blitter-api/src/main/resources/`


```bash
./generate-ssh-key.sh 
```

# build

```bash
docker compose -f docker-compose.yml -f docker-compose-dev.yml build
```

# run
```bash
docker compose -f docker-compose.yml -f docker-compose-dev.yml up
```

