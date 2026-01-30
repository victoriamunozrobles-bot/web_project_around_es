# Around The U.S. 🇺🇸

## 📋 Descripción del Proyecto

**Around The U.S.** es una aplicación web interactiva que permite a los usuarios compartir sus experiencias de viaje creando una galería de fotos personalizada. Este proyecto simula una red social donde los usuarios pueden gestionar su perfil e interactuar con el contenido.

La aplicación se conecta a una **API REST** para garantizar la persistencia de los datos, lo que significa que tu perfil, tus fotos y tus "likes" se guardan en un servidor real.

### 🚀 Funcionalidades Principales:

- **Gestión de Perfil:** Edición de nombre, descripción y actualización de foto de perfil (Avatar) con persistencia en servidor.
- **Gestión de Tarjetas:** Crear nuevas tarjetas con imágenes y títulos.
- **Interactividad:** Dar y quitar "Me gusta" (Likes) a las fotos, con contador actualizado en tiempo real.
- **Eliminación:** Borrar tus propias tarjetas (con confirmación de seguridad).
- **Visualización:** Abrir las imágenes en tamaño completo (Popup) para ver los detalles.
- **Validación:** Formularios con validación en vivo (UX) para asegurar que los datos sean correctos antes de enviarlos.

---

## 🛠️ Tecnologías y Técnicas Utilizadas

El proyecto fue construido siguiendo las mejores prácticas de desarrollo web moderno, con un enfoque en la programación orientada a objetos (POO) y la modularidad.

- **HTML5 Semántico:** Estructura clara y accesible.
- **CSS3:** Diseño responsivo (Mobile First) utilizando Flexbox y Grid Layout.
- **Metodología BEM:** Organización estricta de archivos y clases CSS (Bloque, Elemento, Modificador) para un código mantenible y escalable.
- **JavaScript (ES6+):**
  - **Programación Orientada a Objetos (POO):** Uso de clases (`Card`, `Section`, `UserInfo`, `Popup`, `Api`) para encapsular la lógica.
  - **Módulos (Import/Export):** Para dividir el código en archivos lógicos.
  - **Asincronía y Promesas:** Comunicación con la API mediante `fetch()`, manejo de respuestas y errores.
- **Git y GitHub:** Control de versiones.

---

## 📂 Estructura de Archivos (BEM)

El proyecto sigue la estructura de archivos anidada (Nested BEM) para mantener el orden:

```text
web_project_around_es/
├── blocks/             # Bloques BEM (Estilos CSS modulares)
│   ├── card.css        # Estilos para el bloque de tarjeta
│   ├── popup.css       # Estilos generales para ventanas emergentes
│   ├── profile.css     # Estilos para la sección de perfil
│   └── ...
├── images/             # Activos visuales (iconos, avatares, logos)
├── pages/              # Archivos específicos de la página principal
│   ├── index.css       # Hoja de estilos principal (imports)
│   └── index.js        # (Opcional si usas esta estructura para JS)
├── scripts/            # Lógica JavaScript dividida en clases
│   ├── Api.js          # Clase para la comunicación con el servidor
│   ├── Cards.js        # Clase para la creación y manejo de tarjetas
│   ├── FormValidator.js # Clase para la validación de formularios
│   ├── Section.js      # Clase para renderizar secciones en el DOM
│   ├── UserInfo.js     # Clase para manejar datos del usuario
│   └── ...
├── vendor/             # Librerías y archivos de terceros (Fuentes, Normalize)
└── index.html          # Punto de entrada HTML
```
