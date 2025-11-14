# Marquetazo — Tienda Online (Frontend)

Marquetazo es una aplicación web desarrollada con **React + Vite** que simula una tienda online inspirada en plataformas reales de comercio electrónico.  
Este proyecto es únicamente **frontend**, utilizando **LocalStorage** para manejar usuarios, carrito y preferencias de entrega.

---

## Tecnologías utilizadas

- React
- Vite
- Bulma CSS
- Sass (SCSS)
- React Router DOM
- LocalStorage

---

## Estructura del proyecto

```bash
src/
├──assets
├──components
├──data
├──hooks
├──app.jsx
├──app.scss
├──index.scss
├──main.jsx

```

---

## Funcionalidades principales

### Catálogo de productos
- Navegación por categorías
- Vista detallada de cada producto

### Autenticación (simulada)
- Registro, login y logout usando LocalStorage
- Persistencia del usuario con la clave `currentUser`

### Carrito de compras
- Agregar productos
- Modificar cantidades
- Eliminar productos
- Persistencia por usuario con claves basadas en su email

### Selector de entrega
- Modal para elegir:
  - Domicilio
  - Recoger en tienda
- Dirección guardada por usuario en LocalStorage

### Perfil
- Actualizar Perfil
- Actualizar foto de perfil

### Buscador
- Barra de búsqueda integrada en el navbar
- Resultados dinámicos por coincidencia

### Diseño responsive
- Adaptado a diferentes tamaños de pantalla usando Bulma y SCSS

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-repo/marquetazo.git
cd marquetazo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo 
```bash
npm run dev
```

### 4. Crear build de produccion 
```bash
npm run dev
```

Notas

- El proyecto no utiliza backend.
- Toda la lógica de sesión, carrito y entrega se almacena en LocalStorage.
- Ideal como prototipo o base para implementar un backend real más adelante.


---
Autor

Frank-G276 {https://github.com/Frank-G276}
Yosiber {https://github.com/Yosiber}
