# Ejemplo de Uso: Clase `Avatar`

La clase `Avatar` te permite generar avatares personalizados con texto a partir de iniciales o palabras. A continuación, se muestra un ejemplo de cómo utilizar esta clase en un proyecto.

## Compatibilidad de Navegadores

Este código es compatible con los siguientes navegadores:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari (versiones recientes)
- Opera

## Código de Ejemplo

```javascript
// Importar o incluir la clase Avatar en tu proyecto
// Ejemplo básico de uso

const avatar = new Avatar({
  width: 100,
  height: 100,
  font: "Arial",
  fontSize: 30,
  color: "#FFFFFF",
  background: "#3498db",  // Color de fondo o "auto" para un color aleatorio
  borderRadius: 50,       // Valor en píxeles o porcentaje (0 a 50 para un círculo perfecto)
  shadow: true,           // Habilitar sombra de texto
  text3D: true            // Habilitar efecto 3D en el texto
});

// Obtener un avatar con las iniciales "LW"
const avatarBase64 = avatar.get("LW");

// Imprimir en consola
console.log(avatarBase64);

// Ejemplo de resultado Base64
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAX...
```

## Explicación del Código

1. **Instanciación de Avatar:**
- Se crea una instancia de la clase Avatar, donde puedes definir las opciones como dimensiones, fuente, color de texto, color de fondo, etc.

2. **Instanciación de Avatar:**
- Se utiliza el método get() para generar un avatar a partir de las iniciales o texto. Si el avatar ya fue creado antes, se devuelve la versión almacenada en caché.

3. **Inserción en el DOM:**
- El avatar generado se convierte en una imagen base64 que puede ser directamente utilizada en un elemento <img> en HTML.

## Funcionalidades Avanzadas

- **Generación de Color Aleatorio:**
Si estableces background: "auto", se generará un color de fondo aleatorio que asegura un buen contraste con el color del texto.

- **Sombra y Texto 3D:**
Puedes agregar sombra al texto o aplicar un efecto 3D para mayor personalización visual.

## Ejemplo de Color de Fondo Aleatorio

```javascript
const avatarAutoBG = new Avatar({
  background: "#000",  // Color de fondo o auto
  color: "#FFFFFF",    // Color del texto
  width: 120,
  height: 120,
  borderRadius: 60,    // Avatar circular
});

// Obtener un avatar con las iniciales "LW" y color de fondo aleatorio
const avatarBase64AutoBG = avatarAutoBG.get("LW", { background: "auto" });

// Imprimir en consola
console.log(avatarBase64AutoBG);

// Ejemplo de resultado Base64
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAX...
```

# License

MIT