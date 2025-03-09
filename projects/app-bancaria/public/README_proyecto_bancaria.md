
# Proyecto Bancaria

Este proyecto es una aplicación basada en Angular que involucra varios módulos y pasos de construcción. A continuación, te guiaré a través de los pasos necesarios para preparar y ejecutar la aplicación.

## Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina antes de comenzar:

- **Node.js** (versión 14 o superior)
- **npm** (v6 o superior)
- **Angular CLI**

Puedes verificar si tienes estas herramientas instaladas utilizando los siguientes comandos:

```bash
node -v
npm -v
ng version
```

## Pasos de Instalación

1. **Clonar el repositorio**  
   Primero, clona el repositorio de este proyecto en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <directorio_del_repositorio>
   ```

2. **Instalar las dependencias**  
   A continuación, instala todas las dependencias del proyecto utilizando npm:

   ```bash
   npm install -f
   ```

3. **Compilar los módulos compartidos**  
   Compila el módulo compartido de la aplicación (`shared`) utilizando el siguiente comando:

   ```bash
   ng build shared
   ```

4. **Compilar el módulo de productos**  
   Después, construye el módulo de productos de la siguiente forma:

   ```bash
   ng build products
   ```

5. **Compilar la aplicación bancaria**  
   A continuación, compila la aplicación específica bancaria:

   ```bash
   ng build app-bancaria
   ```

6. **Ejecutar el servidor de desarrollo**  
   Ahora que todo está listo, ejecuta el servidor de desarrollo de Angular para levantar la aplicación:

   ```bash
   ng serve
   ```

7. **Acceder a la aplicación**  
   Abre tu navegador y ve a `http://localhost:4200` para ver la aplicación en funcionamiento.

## Notas adicionales

- **`ng build`**: Este comando compila y empaqueta la aplicación o módulo Angular para producción.
- **`ng serve`**: Levanta un servidor de desarrollo y recompila los cambios en tiempo real mientras trabajas en el proyecto.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una rama para tu nueva característica (`git checkout -b feature-nueva-caracteristica`).
3. Haz tus cambios y realiza un commit.
4. Haz un push de tus cambios a tu fork (`git push origin feature-nueva-caracteristica`).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
