# CRUD Productos y Firebase - Cloud Firestore
> ### Aplicación en Angular v8.

### Introducción
Esta aplicación es la evolución del proyecto angular-crud-firestore. La novedad consiste en el uso del Storage de Firebase para almacenar las imágenes asociadas a los vehículos

En el formulario, donde el usuario especifica un producto y una descripción, vamos a habilitar una serie de controles para que también pueda indicar una o varias imágenes relativas al producto.
Así como tenemos los datos en Cloud Firestore, las imágenes se almacenarán en el Storage de Firebase, ya que el Storage lo han creado específicamente para almacenar ficheros de cierto tamaño sin mezclarlos con los datos ordinarios y evitar problemas de rendimiento.

Trabajar con el Storage es bastante parecido a hacerlo en Cloud Firestore, es decir, tendremos que subir las imágenes con una operación de acceso a datos tipo add() y para descargarlas tendremos que hacer una consulta con una instrucción tipo query().
Al margen de almacenar las imágenes en el Storage, tendremos una colección en Cloud Firestore llamada img que nos establecerá la relación siguiente:
`nombre_fichero_imagen – URL en el Storage – ID_producto`

De esta manera tendremos asociado un producto con sus (posibles) imágenes.
En lo que respecta a la operativa, tendremos la siguiente restricción: solo será posible asociar
imágenes a un producto si el producto ya existe. Para aclarar mejor esto último, veamos la siguiente secuencia de imágenes:

## Capturas de pantalla
A continuación se muestran las capturas de pantalla más representativas de la aplicación.

### Edición de un producto existente
La siguiente figura muestra como el usuario ha seleccionado un producto de la lista, en este caso el Ferrari F60 América y esta acción ha provocado que los datos del vehículo se carguen el formulario.

![Edicion](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/1.png)

### Drag and Drop de imágenes
Ahora el usuario selecciona dos imágenes y las arrastra al área específica para poder subir
archivos de imagen para un producto:

![DragAndDrop](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/2.png)


### Activación botón para subir imágenes
Se ha activado el botón `Cargar a Firebase` porque el vehículo anterior ya existía. Si hubiera sido un vehículo nuevo, que aún no hubiéramos guardado, no podríamos subir las imágenes:

![Activacion](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/3.png)

### Pulsación del botón para subir imágenes
Al pulsar el botón veremos que las barras de progreso aumenta su longitud progresivamente hasta alcanzar el 100%, lo cual significa que las imágenes ya se han subido al Storage.
Además los nombres de los ficheros aparecerán en color verde para indicar que la subida ha finalizado correctamente.
También veremos las dos imágenes en el componente de la lista:

![Pulsacion](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/4.png)

### Visualización en el Storage
Si pulsamos sobre el enlace de una de las imágenes se abrirá una nueva pestaña para ver la imagen a su tamaño real (notad que la URL es del Storage):

![Visualizacion](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/5.png)

### El Storage en el site de Firebase
Si vamos al Storage y refrescamos, podremos ver que se ha creado una carpeta llamada `img`.
Esto ha sido una decisión de organización, ya que en un futuro podríamos tener otra carpeta adicional llamada `video` para almacenar vídeos de los vehículos:

![Storage1](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/6.png)

Si pulsamos en `img` veremos las dos imágenes que habíamos subido:

![Storage2](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/7.png)

Si pulsamos sobre alguna de las imágenes veremos una ficha con los datos más relevantes de la misma:

![Storage3](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/8.png)

Finalmente, si vamos al Cloud Firestore veremos una nueva colección llamada `img`, que podría haberse llamado de otra manera para evitar confusión con la carpeta `img` del Storage, la cual contiene dos documentos, uno por cada imagen que tiene asociada al vehículo `Ferrari F60 América`:

![Storage4](https://github.com/dcolomer/crud-angular-firestore-storage-img/blob/master/screenshots/9.png)

Características de Angular aplicadas a este programa:
- Uso de servicios Firebase
  - Cloud Firestore para el acceso a datos
  - Storage para el almacenamiento de imágenes
- Autenticación de Firebase basada en cuentas de Google
- Creación de directivas personalizadas
- Compartir información entre componentes mediante @Input() y @Output()
- Gestión de datos asíncronos. Observables
- Bootstrap 4: cards, navbar, table
- Librerías para notificaciones y cuadros de diálogo, respectivamente, Toastr y SweetAlert2

## Instalación
Ejecutar `mpm install` para descargar las librerías de node.

**Importante: Para probar la aplicación debes crearte tu propia BD (aplicación)  en Firebase - Cloud Firestore -, copiar los datos de configuración que te proporcionen (apiKey, Domain, etc) y reemplazarlos por lo datos `fake` del fichero `app.module.ts`**
