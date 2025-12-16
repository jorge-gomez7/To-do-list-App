# 📋 To-Do List App

Una aplicación moderna para gestionar listas de tareas, desarrollada con **Ionic Framework** y **Angular**.

![Ionic](https://img.shields.io/badge/Ionic-7.x-3880FF?style=flat-square&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17.x-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)

---

## 📖 Descripción

To-Do List App es una herramienta simple y elegante para gestionar tareas pendientes. Permite a los usuarios agregar, listar, completar y eliminar tareas de manera intuitiva con una interfaz moderna de tema oscuro.

---

## ✨ Características

### Pantalla de Inicio
- Saludo dinámico según la hora del día
- Anillo de progreso animado mostrando el porcentaje de tareas completadas
- Estadísticas de tareas pendientes y completadas
- Resumen de tareas por categoría

### Agregar Tareas
- Formulario intuitivo con título y descripción
- Selección visual de categoría:
  - **Trabajo** - Color coral
  - **Casa** - Color verde
  - **Negocios** - Color púrpura
- Validación de campos obligatorios

### Lista de Tareas
- Filtros: Todas, Pendientes, Completadas
- Filtro por categoría
- Deslizar (swipe) para completar o eliminar
- Indicador visual del estado de cada tarea

### Detalle de Tarea
- Vista completa con título, descripción y categoría
- Fecha de creación y completado
- Opciones para marcar como completada o eliminar

### Diseño
- Tema oscuro moderno con gradientes vibrantes
- Animaciones suaves y fluidas
- Tipografía Poppins
- Diseño responsivo

---

## Tecnologías Utilizadas

- **Ionic Framework 7** - Framework híbrido para aplicaciones móviles
- **Angular 17** - Framework de desarrollo web
- **TypeScript** - Lenguaje de programación tipado
- **SCSS** - Preprocesador CSS
- **Capacitor** - Runtime nativo para aplicaciones híbridas
- **LocalStorage** - Almacenamiento persistente de datos

---

## Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Ionic CLI** (v7 o superior)

```bash
npm install -g @ionic/cli
```

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/jorge-gomez7/To-do-list-App.git
cd To-do-list-App
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

---

## Compilar para Dispositivos Móviles

### Android

```bash
ionic capacitor add android
ionic capacitor build android
```

### iOS (requiere macOS)

```bash
ionic capacitor add ios
ionic capacitor build ios
```

---

## 📁 Estructura del Proyecto

```
To-do-list-App/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── task.model.ts          # Interfaz del modelo Task
│   │   ├── pages/
│   │   │   ├── home/                  # Página de inicio
│   │   │   ├── task-list/             # Lista de tareas
│   │   │   ├── add-task/              # Agregar tarea
│   │   │   └── task-detail/           # Detalle de tarea
│   │   ├── services/
│   │   │   └── task.service.ts        # Servicio de gestión de tareas
│   │   ├── app.component.ts
│   │   └── app.routes.ts              # Configuración de rutas
│   ├── theme/
│   │   └── variables.scss             # Variables de tema personalizado
│   ├── global.scss                    # Estilos globales
│   └── index.html
├── capacitor.config.ts
├── ionic.config.json
├── package.json
└── README.md
```

---

## Funcionalidades por Pantalla

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Inicio | `/home` | Dashboard con estadísticas y resumen |
| Lista de Tareas | `/task-list` | Listado con filtros y acciones |
| Agregar Tarea | `/add-task` | Formulario de nueva tarea |
| Detalle | `/task-detail/:id` | Vista completa de una tarea |

---

## Modelo de Datos

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  category: 'trabajo' | 'casa' | 'negocios';
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}
```

---

## Autor

**Jorge Gómez**

- GitHub: [@jorge-gomez7](https://github.com/jorge-gomez7)

---

## Licencia

Este proyecto fue desarrollado como parte de la actividad de la **Semana 6** del curso **Introducción al Desarrollo de Aplicaciones Móviles** - Universidad Galileo.

---



