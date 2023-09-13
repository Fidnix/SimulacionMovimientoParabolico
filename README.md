# Movimiento de trayectoria parabólica

Este proyecto pasó por un cambio brusco (sin commitear durante mucho tiempo). Trata de un pequeño sistema de simulación física para cinemática; es decir, funciona no solo para el movimiento parabólico (Puede modificar la función de movimiento del punto). Este proyecto cuenta, además, con una pequeña interfaz para modificar las componentes de velocidad del punto. Además que se puede modificar el tiempo del movimiento

# Uso

Simplemente debe descargar el proyecto y abrir el archivo html en su navegador

# Aspectos técnicos

El proyecto se basa en tres importantes componentes para la simulación:
* Render: Dibuja en pantalla
* Engine: Simula las físicas
* Timer: Usa los dos componentes anteriores para iterar en bucle

Además posee dos elementos:
* Punto
* Vector velocidad (Las funciones de vectores solo sirven para operar)

# Para futuro

El proyecto es muy pequeño y pienso añadirle más cosas conforme pase el tiempo
* Una mejor interfaz gráfica
* Modo de arrastre en pantalla para moverse
* Modificar las funciones de movimiento (Quizás con un pequeño interpretador)
* Añadir más objetos no colisionables
* Comentar el código

> Nota: Tampoco quiero crear un simulador de físicas completo. Para eso existen muchas librerías que incluso usaré a futuro