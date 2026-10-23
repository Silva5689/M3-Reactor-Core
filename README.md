# Misión 3 - Reactor Core

# Buscador de ofertas de videojuegos con React

He decidido reutilizar mi buscador de ofertas de videojuegos de la M2, pero esta vez utilizando React 19 para construir la web mediante componentes.

## Descripción

Se trata de una web en la que podemos consultar diferentes videojuegos en oferta utilizando la API pública CheapShark.

La aplicación permite buscar videojuegos por su título, filtrar por precio máximo, ordenar las ofertas y calcular el ahorro total.

Además, he añadido un sistema de favoritos que permite guardar videojuegos mediante localStorage y mostrarlos utilizando un filtro.

La principal diferencia respecto a la M2 es que ahora utilizo componentes React y estados para actualizar la interfaz, en lugar de modificar el DOM manualmente.

## Lenguajes y tecnologías utilizados

- HTML
- CSS
- JavaScript
- JSX
- React 19
- Vite

## Uso de IA

He utilizado ChatGPT como herramienta de inteligencia artificial para ayudarme a transformar mi proyecto de la M2 en una aplicación React. Principalmente lo he utilizado para entender mejor cómo funcionan los componentes, las props y los hooks, y para organizar el código siguiendo lo que hemos visto en clase.

También me ha ayudado con el CSS.


### Prompt 1:

"No debemos usar hooks si no son necesarios y tenemos que hacer un código limpio"

### Resultado 1:

ChatGPT revisó el uso de los hooks y me explicó por qué necesitábamos `useState` para guardar los datos que cambian y `useEffect` para consultar la API.

También detectamos que en `App.jsx` había dos funciones muy parecidas para cargar las ofertas. Decidí simplificarlo para evitar repetir código.

### Prompt 2:

"Qué propones para hacer el bonus de la mision?"

### Resultado 2:

ChatGPT propuso crear un custom hook llamado `useLocalStorage` para guardar los favoritos.

Lo incorporé al proyecto para almacenar los identificadores de los videojuegos favoritos. El hook utiliza `useState` para mantener los datos y `useEffect` para guardarlos en localStorage cuando cambian.

## Autopsia

### Decisión 1:

Decidí reutilizar las funciones de `api.js` y `logic.js` de mi M2, en lugar de escribir toda la lógica otra vez dentro de los componentes.

El motivo es que esas funciones ya se encargaban de consultar la API, filtrar, ordenar y calcular el ahorro, y no dependían de la manipulación del DOM.

En cambio, sustituí `render.js` por componentes como `TarjetaOferta`, `ListaOfertas` y `Filtros`, que reciben información mediante props.

### Decisión 2:

Para gestionar los filtros y el ahorro total decidí no utilizar estados adicionales ni `useEffect`.

Por ejemplo, las ofertas visibles se calculan mediante las funciones de `logic.js`, utilizando los datos recibidos y los valores de los filtros. Lo mismo ocurre con el ahorro total.

Descarté guardar estos resultados en otros `useState`, porque se pueden calcular a partir de los estados que ya tenemos. Así evito duplicar información y tener que sincronizarla.

### Decisión 3:

Al principio teníamos dos funciones para cargar las ofertas: una para cuando se abría la web y otra para cuando el usuario pulsaba Reintentar.

Decidí unificar la carga utilizando un contador de intentos y un único `useEffect`. Cuando cambia ese contador, se vuelve a realizar la consulta.

De esta manera evito repetir el código de la petición y del tratamiento de errores. Además, el efecto incluye una función de limpieza para evitar que una petición anterior actualice el estado cuando ya no corresponde.

### Decisión 4:

Para el sistema de favoritos decidí crear un custom hook llamado `useLocalStorage`, en lugar de gestionar el almacenamiento directamente dentro de `App.jsx`.

También decidí guardar únicamente los identificadores `dealID` de los videojuegos, en lugar de duplicar todos los datos de cada oferta.

Así el código queda más organizado y puedo reutilizar el hook para guardar otros valores si lo necesito.