# ECOLOGICA (v--01)

## Características Añadidas:

1. Creación de Administrador con página privada.
    Para crear a un administrador ser deberá entrar a una ruta privada, esta es:
    http://localhost:4321/usuario/registrar/Y aqui el token PUBLIC_CREATE_ADMIN del .env
    Esta ruta se ve exactamente igual que la del register normal, pero al registrarse crea administradores. 

2. Rol de usarios.
    Se ha implementado correctamente el rol de administrador, en la sección de foro solo los admins pueden crear y borrar foros nuevos.

3. Funcionalidad de mensajes
   Los mensajes están en correcto funcionamiento, se pueden crear en el foro y estos estarán relacionados al usuario y el foro que los creó.
   Ya se pueden tener conversaciones.

## Trabajo en Progreso

- Integración del contenido para la página de educación.
- Administración de las estadísticas

## IMPORTANTE

Se deben crear los archivos .env en ambas partes. Se agregó una nueva variable de entorno para el front end, que es la clave de la ruta privada. Esta será la que decidan crear de forma personal, recomiendo usar una clave codificada.
