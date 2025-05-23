# 📱 Proyecto Full Stack: Ionic + Node.js/Express

Este proyecto incluye un **frontend en Ionic** y un **backend en Node.js con Express**. Ambos se comunican vía API REST.

---

## 📦 Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (v7+):  
```bash
  npm install -g @ionic/cli

  /my-project
│
├── backend/         # Node.js + Express
│   ├── app.js
    ├── controllers
    ├── models
    ├── routes
    ├── middlewares
    ├── config
│   └── package.json
│
└── frontend/        # Ionic Angular
    ├── src/
    └── package.json
```
## 🚀Instrucciones para correr el proyecto
### ▶️ 1. Iniciar el Backend (Node.js + Express)
  ```bash
cd backend
npm install
node index.js
```
Esto levanta el servidor en http://localhost:3000.

# ▶️ 2. Iniciar el Frontend (Ionic)
```bash
cd frontend
npm install
ionic serve
```
# 🔗 Comunicación entre frontend y backend
  - El frontend hace peticiones HTTP a la API REST del backend.

  - Ejemplo de uso:

      - POST /api/users/login → retorna JWT

      - GET /api/users/perfil → retorna perfil del usuario (requiere token)

**Asegúrate de que el CORS esté habilitado**  en el backend para permitir llamadas desde Ionic:
```bash
const cors = require('cors');
app.use(cors());
```

# 🔐 Autenticación

  - El backend emite un token JWT al iniciar sesión.

  - El frontend guarda el token y lo incluye en las peticiones protegidas:

```ts 
Authorization: Bearer <token>
```
# ✅ Funcionalidades implementadas

1. Registro de usuarios
2. Inicio de sesión con JWT
3. Perfil de usuario protegido
4. Comunicación full stack
