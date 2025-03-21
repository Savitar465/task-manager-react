# Task Manager

## Descripción general

Task Manager es una aplicación web construida con React y TypeScript que permite a los usuarios gestionar sus tareas. Los usuarios pueden crear, actualizar y eliminar tareas, así como marcarlas como completadas. La aplicación incluye autenticación de usuarios para asegurar que solo los usuarios autenticados puedan gestionar tareas.

## Características

- Autenticación de usuarios (inicio de sesión y registro)
- Crear, actualizar y eliminar tareas
- Marcar tareas como pendientes, en progreso o completadas
- Diseño tailwind

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- Lucide React (para íconos)
- Tailwind CSS (para estilos)
- npm (para gestión de paquetes)

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/Savitar465/task-manager-react.git
    cd task-manager
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Inicia el servidor de desarrollo:
    ```sh
    npm start
    ```

4. Abre tu navegador y navega a `http://localhost:3000`.

## Estructura del proyecto

- `src/components`: Contiene los componentes de React utilizados en la aplicación.
- `src/components/pages`: Contiene los componentes de página para diferentes rutas.
- `src/core/routes`: Contiene componentes y utilidades relacionadas con las rutas.
- `src/types`: Contiene definiciones de tipos de TypeScript.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Lint del código.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request para cualquier cambio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.