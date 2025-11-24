# Tripleten web_project_around_es
Este proyecto web implementa una interfaz de usuario dinámica con manipulación de tarjetas y una gestión de formularios avanzada basada en JavaScript Vanilla, centrándose en la reutilización de código y la validación universal.

## **1. Arquitectura de Componentes y Modularidad**
Se ha desarrollado un conjunto de funciones puras y reutilizables para desacoplar la lógica del negocio de la manipulación del DOM (Document Object Model), lo que facilita la escalabilidad y el mantenimiento del código.

### **A. Funciones de Control de Modales (UX/Accesibilidad)**
Se implementó un control completo de las ventanas emergentes (.popup) que prioriza la experiencia del usuario (UX) y la accesibilidad.

    1. openModal(modal): Muestra cualquier ventana emergente añadiendo la clase de apertura (.popup_is-opened). Permite encapsulamiento y reutilización.

    2. closeModal(modal): Oculta la ventana emergente y elimina todos los listeners de cierre asociados. Ayuda con la limpieza de recursos.
    
    3. closeOnOverlayClick(evt): Cierra el modal solo si el clic ocurre directamente sobre el contenedor (evt.target === evt.currentTarget). Permite el control de burbujeo de eventos, y contribuye a UX.
    
    4. closeOnEscPress(evt):Cierra cualquier modal visible (.popup_is-opened) al presionar la tecla Escape. Contribuye a la accesibilidad.
    
## **2. Sistema de Validación de Formularios (Universal)**
Se creó un sistema de validación que se aplica a múltiples formularios (Editar Perfil y Nueva Tarjeta) sin duplicar la lógica, cumpliendo con los estándares de validación HTML5.

### **A. Funciones de Validación Base**
El código utiliza funciones de bajo nivel que operan sobre un único campo y su elemento de error asociado:

    1. showInputError(formElement, element, errorMessage):** Recibe el formElement como argumento para buscar localmente el span de error, aplicando clases CSS (.popup__input_type_error, etc.) y mostrando el mensaje (element.validationMessage).

    2. hideInputError(formElement, element): Oculta el mensaje de error y remueve las clases visuales de error.
    
    3. hasInvalidInput(inputList): Utiliza el método Array.prototype.some() para devolver true si al menos un campo (inputElement.validity.valid) es inválido, verificando todos los campos de la lista.
    
    4. toggleButtonState(inputList, buttonElement): Controla el estado del botón de envío, deshabilitándolo mediante la propiedad buttonElement.disabled = true y la clase CSS (.popup__button_disabled) si hasInvalidInput devuelve true.
    
### **B. Implementación e Inicialización**
- La validación se inicializa mediante dos bucles forEach independientes que adjuntan un event listener de tipo input a cada campo.
- La validación se desencadena en tiempo real (mientras el usuario escribe), proporcionando feedback inmediato (UX).
- La función toggleButtonState se llama explícitamente al cargar el script para establecer el estado inicial de los botones, asegurando que los botones de los formularios vacíos comiencen deshabilitados (cumpliendo con la restricción de campos required).

## **3. Manipulación de Elementos (Tarjetas)** 
Se implementó la lógica para la gestión dinámica de las tarjetas del sitio.
    1. getCardElement(name, link): Función que clona el contenido de la etiqueta <template> (cardTemplate.content), inyecta los datos de name y link, y adjunta todos los event listeners necesarios (Me gusta, Eliminar, Abrir imagen).
    *Nota: Los valores por defecto de los argumentos fueron eliminados (name, link), ya que el nuevo sistema de validación garantiza que los datos de entrada son siempre válidos.*
    Manejo de Eventos Locales: Se utilizan event listeners locales dentro de getCardElement para manipular la tarjeta clonada, como evt.target.classList.toggle() para el botón "Me gusta" y evt.target.closest(".card").remove() para eliminar la tarjeta.
    2. handleCardFormSubmit: Gestiona el evento submit del formulario de la nueva tarjeta, invoca renderCard, cierra el modal y llama a newCardFormElement.reset() para limpiar los campos y restaurar su estado inicial.
