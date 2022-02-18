# Tu Buscador Latino (Frontend)

Esta aplicación permite realizar consultas a wikipedia, ver las palabras mas buscadas en la plataforma y descargar reportes PDF.

## 1. Descripción

Este repositorio contiene la interfaz de usuario del aplicativo web **Tu Buscador Latino**. El frontend fue desarrollado con los framework Vue.js v3 y Tailwind CSS y consume la API de consulta de [**Wikipedia**](https://www.mediawiki.org/wiki/API:Search).

## 2. Tecnologías

* Vue.js framework
* Tailwindcss framework 

## 3. Dependencias

- **Node.js framework:** https://nodejs.org/es/
- **Vue.js framework:** https://vuejs.org/
- **Tailwindcss:** https://tailwindcss.com/

## 4. Instalación

Configure el ambiente de trabajo en la maquina haciendo:
```
$ git clone https://github.com/Tu-Buscador-Latino/tu-buscador-latino-fe.git
$ cd ../tu-buscador-latino-fe
$ npm install package.json
```

Reemplaze las variables **urlStatsPost** y **urlStatsBase** de los archivos **src/views/Home.vue** y **src/views/Stats.vue** por las api de su backend de producción.

Para propósitos de desarrollo utilizar:
```
$ npm run serve
```

Para producción utilizar:
```
$ npm run build
``` 
