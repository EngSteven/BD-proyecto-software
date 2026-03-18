## Instrucciones para levantar el proyecto

### 1. Levantar el backend (C#)
Abre una terminal y ejecuta:

```
cd API/SupabaseDemo
dotnet run
```

### 2. Levantar el frontend (React)
Abre otra terminal nueva y ejecuta:

```
cd frontend/app
npm i
npm start
```


### 3. Modelo de base 

## Tabla Users

Esta tabla almacena todos los usuarios registrados en el sistema.

Campos:

* `id` – identificador único del usuario
* `name` – nombre del usuario
* `email` – correo electrónico utilizado para iniciar sesión
* `password` – contraseña del usuario
* `role` – define si el usuario es `presenter` o `audience`
* `created_at` – fecha de creación del usuario

Propósito:

* autenticar usuarios
* identificar si el usuario es presentador o espectador

---

## Tabla Sessions

Esta tabla almacena las sesiones creadas por los presentadores.

Campos:

* `session_id` – identificador único de la sesión (ejemplo: S1, S2, S3)
* `name` – nombre de la sesión
* `description` – descripción de la sesión
* `presenter_id` – referencia al usuario que creó la sesión
* `created_at` – fecha de creación de la sesión

Relación:

```id="rel_users_sessions"
users.id → sessions.presenter_id
```

Un presentador puede crear varias sesiones.

---

## Tabla Session Participants

Esta tabla registra qué usuarios se han unido a una sesión.

Campos:

* `session_id` – referencia a la sesión
* `user_id` – referencia al usuario
* `name` – alias o nombre que el usuario usa dentro de la sesión
* `joined_at` – fecha en la que el usuario se unió a la sesión

Relaciones:

```id="rel_participants"
sessions.session_id → session_participants.session_id
users.id → session_participants.user_id
```

Propósito:

* registrar qué usuarios participan en cada sesión
* permitir que el usuario use un nombre distinto dentro de la sesión

---

## Tabla Questions

Esta tabla almacena las preguntas realizadas durante las sesiones.

Campos:

* `question_id` – identificador único de la pregunta
* `question` – texto de la pregunta
* `user_id` – referencia al usuario que hizo la pregunta
* `session_id` – referencia a la sesión
* `created_at` – fecha en la que se creó la pregunta

Relaciones:

```id="rel_questions"
users.id → questions.user_id
sessions.session_id → questions.session_id
```

Propósito:

* almacenar las preguntas realizadas por los participantes
* asociar cada pregunta con un usuario y una sesión

---

# Flujo del Programa

1. El usuario inicia sesión utilizando su correo y contraseña.

2. El sistema verifica las credenciales en la tabla `users`.

3. Si el usuario tiene el rol de `presenter`, puede crear una nueva sesión.

4. Cuando se crea una sesión, se inserta un nuevo registro en la tabla `sessions`.

5. Los usuarios con rol `audience` pueden unirse a una sesión existente utilizando su identificador.

6. Cuando un usuario se une a una sesión, se registra en la tabla `session_participants`.

7. Durante la sesión, los participantes pueden enviar preguntas.

8. Cada pregunta se guarda en la tabla `questions` y se relaciona con el usuario que la hizo y la sesión donde se realizó.

---

# Diagrama del Flujo de la Base de Datos

```id="diagrama_flujo_bd"
USERS
-----
id
name
email
password
role
created_at
     |
     | el presentador crea
     v
SESSIONS
--------
session_id
name
description
presenter_id
created_at
     |
     | los usuarios se unen
     v
SESSION_PARTICIPANTS
--------------------
session_id
user_id
name
joined_at
     |
     | los participantes hacen preguntas
     v
QUESTIONS
---------
question_id
question
user_id
session_id
created_at
```
