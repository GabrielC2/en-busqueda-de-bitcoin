# 🎮 En Búsqueda de Bitcoin

Juego educativo tipo "escape room" para aprender sobre Bitcoin de forma divertida.

## 🎯 Cómo Funciona

1. **📖 Lee el cómic** de cada capítulo
2. **❓ Responde la pregunta** de control
3. **🔍 Encuentra los objetos ocultos** en el escenario (¡solo 3 intentos de error!)
4. **🏆 ¡Desbloquea el siguiente capítulo!**

## 📁 Estructura

```
/public/images/
├── levels/
│   ├── level-1-scene.png  # Escenario Cap 1
│   ├── level-2-scene.png  # Escenario Cap 2
│   └── ...
└── comics/
    └── ...  # Imágenes de cómics (opcional)
```

## 🚀 Deploy

El proyecto está configurado para deployar automáticamente en Vercel.

## 📝 Cambios Realizados

- ✅ **Sistema de 3 intentos**: El usuario solo puede equivocarse 3 veces por nivel
- ✅ **Sin pistas visuales**: Los objetos NO se iluminan al pasar el mouse
- ✅ **Pantalla de Game Over**: Si pierde los 3 intentos, debe reintentar
- ✅ **Contador de corazones**: Muestra cuántos intentos quedan (❤️❤️❤️)
