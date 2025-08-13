const electrodomesticos = {
    'refrigerador': 150,
    'televisor-32': 80,
    'televisor-55': 120,
    'lavadora': 500,
    'microondas': 800,
    'computadora': 300,
    'laptop': 65,
    'aire-acondicionado': 2200,
    'ventilador': 75,
    'bombillo-led': 10,
    'bombillo-incandescente': 60,
    'plancha': 1200,
    'secador': 1500,
    'licuadora': 400,
    'tostadora': 800,
    'cafetera': 900
};

let dispositivos = [];
let contadorDispositivos = 0;

// mostrar loading
function mostrarLoading(mostrar) {
    const loadingDiv = document.getElementById('loading');
    if (mostrar) {
        loadingDiv.style.display = 'flex';
        loadingDiv.classList.add('animate-fadeIn');
    } else {
        loadingDiv.style.display = 'none';
    }
}

// agregar nuevo dispositivo
function agregarDispositivo() {
    contadorDispositivos++;
    const dispositivosContainer = document.getElementById('dispositivos-container');

    const dispositivoDiv = document.createElement('div');
    dispositivoDiv.className = 'dispositivo-card animate-slideIn';
    dispositivoDiv.id = `dispositivo-${contadorDispositivos}`;

    dispositivoDiv.innerHTML = `
        <div class="dispositivo-header">
            <h4>🔌 Dispositivo ${contadorDispositivos}</h4>
            ${contadorDispositivos > 1 ? `<button type="button" class="btn-eliminar" onclick="eliminarDispositivo(${contadorDispositivos})">❌</button>` : ''}
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-2 mb-3">
                <label class="form-label">Cantidad:</label>
                <input type="number" class="form-control" min="1" value="1" id="cantidad-${contadorDispositivos}">
            </div>
            <div class="col-md-6 col-lg-3 mb-3">
                <label class="form-label">Tipo de electrodoméstico:</label>
                <select class="form-select" id="tipo-${contadorDispositivos}" onchange="actualizarPotencia(${contadorDispositivos})">
                    <option value="">Seleccionar...</option>
                    <option value="refrigerador">Refrigerador (150W)</option>
                    <option value="televisor-32">Televisor LED 32" (80W)</option>
                    <option value="televisor-55">Televisor LED 55" (120W)</option>
                    <option value="lavadora">Lavadora (500W)</option>
                    <option value="microondas">Microondas (800W)</option>
                    <option value="computadora">Computadora (300W)</option>
                    <option value="laptop">Laptop (65W)</option>
                    <option value="aire-acondicionado">Aire Acondicionado (2200W)</option>
                    <option value="ventilador">Ventilador de Techo (75W)</option>
                    <option value="bombillo-led">Bombillo LED (10W)</option>
                    <option value="bombillo-incandescente">Bombillo Incandescente (60W)</option>
                    <option value="plancha">Plancha (1200W)</option>
                    <option value="secador">Secador de Cabello (1500W)</option>
                    <option value="licuadora">Licuadora (400W)</option>
                    <option value="tostadora">Tostadora (800W)</option>
                    <option value="cafetera">Cafetera (900W)</option>
                </select>
            </div>
            <div class="col-md-6 col-lg-2 mb-3">
                <label class="form-label">Horas/día:</label>
                <input type="number" class="form-control" min="0" max="24" step="0.5" value="1" id="horas-${contadorDispositivos}">
            </div>
            <div class="col-md-6 col-lg-2 mb-3">
                <label class="form-label">Días/mes:</label>
                <input type="number" class="form-control" min="1" max="31" value="30" id="dias-${contadorDispositivos}">
            </div>
            <div class="col-md-6 col-lg-3 mb-3">
                <label class="form-label">Potencia (W):</label>
                <input type="number" class="form-control potencia-input" min="0" value="0" id="potencia-${contadorDispositivos}" readonly>
            </div>
        </div>
    `;

    dispositivosContainer.appendChild(dispositivoDiv);

    // animacion inicial
    setTimeout(() => {
        dispositivoDiv.classList.add('visible');
    }, 100);
}

// eliminar dispositivo
function eliminarDispositivo(id) {
    const dispositivo = document.getElementById(`dispositivo-${id}`);
    dispositivo.classList.add('animate-fadeOut');

    setTimeout(() => {
        dispositivo.remove();
        actualizarNumeracion();
    }, 300);
}

// Función para actualizar numeración después de eliminar
function actualizarNumeracion() {
    const dispositivos = document.querySelectorAll('.dispositivo-card');
    dispositivos.forEach((dispositivo, index) => {
        const header = dispositivo.querySelector('h4');
        header.textContent = `🔌 Dispositivo ${index + 1}`;
    });
}

// Potencia por id
function actualizarPotencia(id) {
    const tipoSelect = document.getElementById(`tipo-${id}`);
    const potenciaInput = document.getElementById(`potencia-${id}`);

    const tipoSeleccionado = tipoSelect.value;
    if (electrodomesticos[tipoSeleccionado]) {
        potenciaInput.value = electrodomesticos[tipoSeleccionado];
        potenciaInput.classList.add('animate-pulse');
        setTimeout(() => {
            potenciaInput.classList.remove('animate-pulse');
        }, 500);
    } else {
        potenciaInput.value = 0;
    }
}

// Calculo
function calcularConsumo() {
    mostrarLoading(true);

    setTimeout(() => {
        const dispositivos = document.querySelectorAll('.dispositivo-card');
        let consumoTotalMensual = 0;
        let resultadosDetallados = [];

        dispositivos.forEach((dispositivo, index) => {
            const id = dispositivo.id.split('-')[1];

            const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 0;
            const tipo = document.getElementById(`tipo-${id}`).value;
            const horas = parseFloat(document.getElementById(`horas-${id}`).value) || 0;
            const dias = parseInt(document.getElementById(`dias-${id}`).value) || 0;
            const potencia = parseInt(document.getElementById(`potencia-${id}`).value) || 0;

            if (tipo && potencia > 0) {
                const consumoDiario = (cantidad * potencia * horas) / 1000;
                const consumoMensual = consumoDiario * dias;
                consumoTotalMensual += consumoMensual;

                resultadosDetallados.push({
                    dispositivo: tipo,
                    cantidad: cantidad,
                    consumoMensual: consumoMensual.toFixed(2),
                    consumoDiario: consumoDiario.toFixed(2)
                });
            }
        });

        mostrarResultados(consumoTotalMensual, resultadosDetallados);
        mostrarLoading(false);
    }, 1500);
}

// Resultados
function mostrarResultados(consumoTotal, detalles) {
    const resultadosDiv = document.getElementById('resultados');
    const consumoAnual = consumoTotal * 12;
    const consumoTWh = consumoAnual / 1000000;

    // Recomendacion
    const panelesSolares = Math.ceil(consumoTotal / 120);
    const costoSistema = panelesSolares * 300;
    const ahorroMensual = consumoTotal * 0.12;
    const tiempoRecuperacion = (costoSistema / (ahorroMensual * 12)).toFixed(1);

    resultadosDiv.innerHTML = `
        <div class="resultados-container animate-slideIn">
            <h3 class="text-center mb-4">📊 Resultados de tu Consumo Eléctrico</h3>
            
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="resultado-card bg-primary">
                        <div class="numero">${consumoTotal.toFixed(2)}</div>
                        <div class="unidad">kWh/mes</div>
                        <div class="descripcion">Consumo Mensual</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="resultado-card bg-success">
                        <div class="numero">${consumoAnual.toFixed(2)}</div>
                        <div class="unidad">kWh/año</div>
                        <div class="descripcion">Consumo Anual</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="resultado-card bg-warning">
                        <div class="numero">${consumoTWh.toFixed(6)}</div>
                        <div class="unidad">TWh/año</div>
                        <div class="descripcion">En Terawatts hora</div>
                    </div>
                </div>
            </div>
            
            <div class="recomendacion-solar">
                <h4>🌞 Recomendación de Energía Solar</h4>
                <div class="row">
                    <div class="col-md-3">
                        <div class="solar-stat">
                            <div class="solar-numero">${panelesSolares}</div>
                            <div class="solar-texto">Paneles Solares Necesarios</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="solar-stat">
                            <div class="solar-numero">$${costoSistema.toLocaleString()}</div>
                            <div class="solar-texto">Inversión Estimada</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="solar-stat">
                            <div class="solar-numero">$${ahorroMensual.toFixed(0)}</div>
                            <div class="solar-texto">Ahorro Mensual</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="solar-stat">
                            <div class="solar-numero">${tiempoRecuperacion}</div>
                            <div class="solar-texto">Años Recuperación</div>
                        </div>
                    </div>
                </div>
                
                <div class="tip-solar">
                    💡 <strong>Consejo:</strong> Con ${panelesSolares} paneles solares podrías generar toda la energía que consumes, 
                    ahorrando $${ahorroMensual.toFixed(0)} mensuales y recuperando tu inversión en ${tiempoRecuperacion} años.
                </div>
            </div>
            
            <div class="detalles-dispositivos">
                <h5>📋 Detalles por Dispositivo</h5>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Dispositivo</th>
                                <th>Cantidad</th>
                                <th>Consumo Diario (kWh)</th>
                                <th>Consumo Mensual (kWh)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detalles.map(detalle => `
                                <tr>
                                    <td>${detalle.dispositivo.replace('-', ' ').toUpperCase()}</td>
                                    <td>${detalle.cantidad}</td>
                                    <td>${detalle.consumoDiario}</td>
                                    <td>${detalle.consumoMensual}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    resultadosDiv.style.display = 'block';
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Agregar el primer dispositivo automáticamente
    agregarDispositivo();

    // Event listener para el formulario
    const form = document.getElementById('formularioCalculo');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            calcularConsumo();
        });
    }

    // Event Dispositivos creados
    const btnAgregar = document.getElementById('btn-agregar-dispositivo');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', agregarDispositivo);
    }

    // Animaciones
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});