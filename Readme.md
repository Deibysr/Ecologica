# ECOLOGICA (v--01)

## Características Añadidas:

1. Ver foros en la página principal.
   Ahora los foros que se creen se cargan automáticamente en el home también.
2. Automatización del sistema de contenido.
   Se programó la gestión del contenido de eduación, para que se puedan agregar nuevos
   contenidos fácilmente. 
3. Se mejoró la performance de la página de estadísticas

## Trabajo en Progreso

- Se está integrando el sistema de estadísticas.
- Se está integrando la posibilidad de subir estadísticas por medio de CSV.

## IMPORTANTE

Se deben crear los archivos .env en ambas partes. Se agregó una nueva variable de entorno para el front end, que es la clave de la ruta privada. Esta será la que decidan crear de forma personal, recomiendo usar una clave codificada.

## Para crear contenido
Seguir los siguientes pasos: 
1. Cualquier markdown siempre debe llevar title, description y slug
2. Colocar el markdown en la carpeta content/education
3. Importante que NO poner las imágenes en la carpeta anterior si no en la carpeta "public/img/content"
4. Poner nombres descriptivos a las imágenes.
5. Optimizar las imágenes antes de ponerlas en la carpeta. (Usar la página Squoosh y dejarlas en formato .webp)
