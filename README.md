# Examen Práctico Frontend en VUEJS

## Requerimientos

- Node.js 16.18.1
- [Visual Studio Code](https://code.visualstudio.com/)

En caso de tener Node.js ya instalado verificar que la versión sea la correcta, para ello hay que abrir la terminal 
de tu sistema operativo e introducir el siguiente comando:
```bash
# Consultar la versión de Node.js
node --version
```
En caso de no contar con Node.js en la versión especificada descargar [Node Version Manager](https://github.com/nvm-sh/nvm):
- [Descargar para windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.10/nvm-setup.exe)

Una vez instalado abrir la terminal de tu sistema operativo y ejecutar los siguientes comandos:
```bash
# Instalar Node.js 16.18.1 con Node Version Manager
nvm install 16.18.1
nvm use 16.18.1
```

## Comandos del proyecto
```bash

# Instalar dependencias del proyecto
npm install

# Iniciar el servidor del proyecto para desarrollo
npm run dev

# Inicio del servidor del proyecto para producción
npm run build
npm run start

```

Para obtener más detalles sobre el funcionamiento del framework revisar la [documentación de NuxtJS](https://nuxtjs.org/docs/get-started/installation).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
