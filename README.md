# Pablo Rendon - Prueba técnica Spanish Weather Frontend
## Requerimientos ##

 - Angular 17
 - Typescript 5.2.2

## Dependecias del proyecto

Antes de poder iniciar el proyecto localmente se deben instalar las librerias

```
npm install
```

## Ejecutar la app localmente

para ejecutar la app se debe ejecutar el comando `npm start` y levantará en la url `http://localhost:4200/`

## Ejecutar localmente mediante docker

primero crear la imagen usando: `docker build -t spanish-weather-frontend .`

```
docker build -t spanish-weather-frontend .
```

luego crear el contenedor con
```
docker run -d -p 80:80 spanish-weather-frontend
```

con docker se usa un servidor nginx por lo cual el servicio quedará levantado en el puerto 80, `http://localhost:80/`