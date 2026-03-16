// ========================================
// CONFIGURACIÓN - CREDENCIALES
// ========================================
const USUARIO_VALIDO = "Ricardo";
const CONTRASENA_VALIDA = "1234";

// ========================================
// ELEMENTOS DEL DOM
// ========================================

// Pantallas
const loginScreen = document.getElementById('login-container');
const dashboardScreen = document.getElementById('main-container');

// Elementos del login
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Botones
const randomBtn = document.getElementById('random-simulate');
const resetBtn = document.getElementById('emergency-reset');

// Elementos de tiempo
const timestampSpan = document.getElementById('timestamp');
const logLast = document.getElementById('log-last');

// Elementos de usuario
const userNameSpan = document.getElementById('user-name');

// Elementos de humedad
const humedadSlider = document.getElementById('humedad-slider');
const humedadValor = document.getElementById('humedad-valor');
const ledHumedad = document.getElementById('led-humedad');
const humedadFill = document.getElementById('humedad-fill');

// Elementos de temperatura
const tempSlider = document.getElementById('temp-slider');
const tempValor = document.getElementById('temp-valor');
const ledTemp = document.getElementById('led-temp');
const tempFill = document.getElementById('temp-fill');

// ========================================
// FUNCIONES DE ACTUALIZACIÓN
// ========================================

/**
 * Actualiza el timestamp en la interfaz
 */
function actualizarTimestamp() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    
    // Actualizar el timestamp en la barra de estado
    timestampSpan.textContent = `${horas}:${minutos}:${segundos}`;
    
    // Actualizar el último registro del log
    if (!dashboardScreen.classList.contains('hidden')) {
        logLast.innerHTML = `<span>[${horas}:${minutos}:${segundos}]</span> Lectura actualizada`;
    }
}

/**
 * Actualiza el sensor de humedad
 * - Lee el valor del slider
 * - Actualiza el número y la barra
 * - Cambia el color del LED según el valor
 */
function actualizarHumedad() {
    // Obtener valor actual (0-100)
    const valor = parseInt(humedadSlider.value);
    
    // Actualizar display numérico
    humedadValor.textContent = valor;
    
    // Actualizar barra de progreso
    humedadFill.style.width = valor + '%';
    
    // CAMBIO DE COLOR DEL LED
    if (valor <= 8) {
        // Rojo - crítico
        ledHumedad.className = 'panel-led red-led';
    } else if (valor <= 20) {
        // Amarillo - alerta
        ledHumedad.className = 'panel-led yellow-led';
    } else {
        // Verde - normal
        ledHumedad.className = 'panel-led green-led';
    }
    
    // Actualizar timestamp
    actualizarTimestamp();
}

/**
 * Actualiza el sensor de temperatura
 * - Lee el valor del slider
 * - Actualiza el número y la barra
 * - Cambia el color del LED según el valor
 */
function actualizarTemperatura() {
    // Obtener valor actual (0-50 con decimal)
    const valor = parseFloat(tempSlider.value);
    
    // Actualizar display numérico (1 decimal)
    tempValor.textContent = valor.toFixed(1);
    
    // Calcular porcentaje para la barra (0-50 → 0-100%)
    const porcentaje = (valor / 50) * 100;
    tempFill.style.width = porcentaje + '%';
    
    // CAMBIO DE COLOR DEL LED
    if (valor >= 30) {
        // Rojo - calor extremo
        ledTemp.className = 'panel-led red-led';
    } else if (valor <= 10) {
        // Amarillo - frío
        ledTemp.className = 'panel-led yellow-led';
    } else {
        // Verde - temperatura normal
        ledTemp.className = 'panel-led green-led';
    }
    
    // Actualizar timestamp
    actualizarTimestamp();
}

// ========================================
// EVENTOS DE INTERFAZ
// ========================================

// Cuando se mueve el slider de humedad
humedadSlider.addEventListener('input', actualizarHumedad);

// Cuando se mueve el slider de temperatura
tempSlider.addEventListener('input', actualizarTemperatura);

// Botón de simulación aleatoria
randomBtn.addEventListener('click', () => {
    // Generar valores aleatorios
    const nuevaHumedad = Math.floor(Math.random() * 101);      // 0 a 100
    const nuevaTemperatura = (Math.random() * 50).toFixed(1);  // 0 a 50, 1 decimal
    
    // Asignar a los sliders
    humedadSlider.value = nuevaHumedad;
    tempSlider.value = nuevaTemperatura;
    
    // Actualizar todo
    actualizarHumedad();
    actualizarTemperatura();
});

// Botón de reinicio de sensores
resetBtn.addEventListener('click', () => {
    // Valores por defecto
    humedadSlider.value = 45;
    tempSlider.value = 22;
    
    // Actuali
