
// ======================================================
// SISTEMA DE GESTIÓN DE PRÉSTAMOS
// Interfaces basadas en el prototipo de diagrams.net
// ======================================================

const app = document.getElementById("app");

// ======================================================
// 1. DATOS DE REFERENCIA DEL PROTOTIPO
// ======================================================

const cobros = [
    ["C-001", "15/06/2025", "Cobro semanal Centro", "25", "18,5%", "Activo"],
    ["C-002", "12/06/2025", "Cobro mensual Norte", "18", "15,2%", "Activo"],
    ["C-003", "10/06/2025", "Cobro quincenal Sur", "32", "20,3%", "Activo"],
    ["C-004", "08/06/2025", "Cobro mensual Barrio 7", "15", "8,6%", "Inactivo"],
    ["C-005", "05/06/2025", "Cobro especial Clientes VIP", "8", "25,1%", "Activo"],
    ["C-006", "01/06/2025", "Cobro semanal Occidente", "20", "16,7%", "Activo"],
    ["C-007", "28/05/2025", "Cobro mensual Oriente", "14", "12,4%", "Activo"],
    ["C-008", "25/05/2025", "Cobro quincenal Centro", "28", "19,8%", "Activo"],
    ["C-009", "20/05/2025", "Cobro mensual VIP", "10", "9,1%", "Inactivo"],
    ["C-010", "15/05/2025", "Cobro semanal Norte", "22", "21,5%", "Activo"]
];

const clientes = [
    ["CL-001", "Juan Pérez", "1.001.245.678", "$ 1.500.000", "Activo"],
    ["CL-002", "María López", "1.002.356.789", "$ 2.000.000", "Activo"],
    ["CL-003", "Carlos Ramírez", "1.003.467.890", "$ 800.000", "Inactivo"],
    ["CL-004", "Ana Torres", "1.004.578.901", "$ 1.200.000", "Activo"],
    ["CL-005", "Luis Díaz", "1.005.689.012", "$ 950.000", "Activo"],
    ["CL-006", "Sofía Gómez", "1.006.790.123", "$ 1.750.000", "Activo"],
    ["CL-007", "Pedro Sánchez", "1.007.801.234", "$ 1.300.000", "Inactivo"],
    ["CL-008", "Laura Martínez", "1.008.912.345", "$ 600.000", "Activo"],
    ["CL-009", "Andrés Castillo", "1.009.023.456", "$ 2.400.000", "Activo"],
    ["CL-010", "Valentina Rojas", "1.010.134.567", "$ 1.100.000", "Activo"]
];

const usuarios = [
    ["1", "admin", "Administrador", "Administrador", "Activo"],
    ["2", "cobro", "Usuario Cobro", "Operador", "Activo"],
    ["3", "consulta", "Usuario Consulta", "Consulta", "Activo"],
    ["4", "juan", "Juan Pérez", "Operador", "Activo"],
    ["5", "maria", "María López", "Operador", "Activo"]
];

const resumenReportes = [
    ["1", "C-001", "16/06/2025", "$ 450.000", "$ 1.500.000", "$ 0", "$ 450.000", "$ 450.000", "$ 0"],
    ["2", "C-001", "17/06/2025", "$ 520.000", "$ 2.000.000", "$ 10.000", "$ 510.000", "$ 520.000", "$ 0"],
    ["3", "C-001", "18/06/2025", "$ 380.000", "$ 1.800.000", "$ 5.000", "$ 375.000", "$ 380.000", "$ 0"],
    ["4", "C-001", "19/06/2025", "$ 600.000", "$ 2.500.000", "$ 0", "$ 600.000", "$ 600.000", "$ 0"],
    ["5", "C-001", "20/06/2025", "$ 420.000", "$ 1.700.000", "$ 12.000", "$ 408.000", "$ 420.000", "$ 0"],
    ["6", "C-001", "21/06/2025", "$ 510.000", "$ 2.100.000", "$ 8.000", "$ 502.000", "$ 510.000", "$ 0"],
    ["7", "C-001", "22/06/2025", "$ 390.000", "$ 1.600.000", "$ 0", "$ 390.000", "$ 390.000", "$ 0"]
];

// ======================================================
// 2. FUNCIONES AUXILIARES
// ======================================================

function encabezadoPagina(titulo, descripcion, icono = "") {
    return `
        <div class="titulo-seccion">
            ${icono ? `<span>${icono}</span>` : ""}
            <div>
                <h2 class="titulo-pagina">${titulo}</h2>
                <p class="descripcion-pagina">${descripcion}</p>
            </div>
        </div>
    `;
}

function selectorCobro(id = "selector-cobro") {
    return `
        <select id="${id}">
            <option value="C-001">C-001 - Cobro semanal Centro</option>
            <option value="C-002">C-002 - Cobro mensual Norte</option>
            <option value="C-003">C-003 - Cobro quincenal Sur</option>
        </select>
    `;
}

function estadoHTML(estado) {
    return `
        <span class="estado ${estado.toLowerCase()}">
            ${estado}
        </span>
    `;
}

function tablaHTML(encabezados, filas, id = "") {
    return `
        <div class="tabla-scroll">
            <table ${id ? `id="${id}"` : ""}>
                <thead>
                    <tr>
                        ${encabezados.map(t => `<th>${t}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${filas.map(fila => `
                        <tr>
                            ${fila.map((celda, i) => `
                                <td>
                                    ${i === fila.length - 1 && celda === "ACCIONES"
                                        ? `<button type="button" class="accion">👁</button>
                                           <button type="button" class="accion">✏</button>
                                           <button type="button" class="accion eliminar">🗑</button>`
                                        : celda}
                                </td>
                            `).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function tarjetaIndicador(icono, titulo, valor, descripcion) {
    return `
        <article class="tarjeta-indicador">
            <div class="icono-indicador">${icono}</div>
            <h3>${titulo}</h3>
            <strong>${valor}</strong>
            <p>${descripcion}</p>
        </article>
    `;
}

// ======================================================
// 3. INICIO DE SESIÓN
// ======================================================

function pantallaLogin() {
    app.innerHTML = `
        <div class="pantalla-login">

            <header class="login-header">
                <h2>🪙 Sistema de Gestión de Préstamos</h2>

                <nav>
                    <a href="#">⌂ Inicio</a>
                    <a href="#">ⓘ Ayuda</a>
                    <a href="#">✆ Contacto</a>
                </nav>
            </header>

            <main class="login-contenido">

                <section class="login-presentacion">
                    <h1>Sistema de Gestión de Préstamos</h1>

                    <p>
                        Administra tus clientes, préstamos, pagos
                        y reportes de manera fácil y segura.
                    </p>

                    <div class="login-ilustracion">
                        💰
                    </div>
                </section>

                <section class="login-formulario">
                    <div class="login-logo">$</div>

                    <h2>Iniciar sesión</h2>

                    <p>
                        Ingresa tus credenciales para acceder al sistema
                    </p>

                    <form id="form-login">

                        <label for="usuario-login">👤 Usuario</label>
                        <input
                            type="text"
                            id="usuario-login"
                            placeholder="Ingresa tu usuario"
                            required
                        >

                        <label for="password-login">🔒 Contraseña</label>

                        <div class="password-contenedor">
                            <input
                                type="password"
                                id="password-login"
                                placeholder="Ingresa tu contraseña"
                                required
                            >
                            <button type="button" id="ver-password">👁</button>
                        </div>

                        <div class="login-opciones">
                            <label>
                                <input type="checkbox">
                                Recordarme
                            </label>

                            <a href="#">¿Olvidó su contraseña?</a>
                        </div>

                        <button type="submit" class="btn-login">
                            ➜ Iniciar sesión
                        </button>

                        <div class="login-separador">o</div>

                        <button type="button" class="btn-registro">
                            👤+ Registrarse
                        </button>

                    </form>
                </section>

            </main>

            <footer class="login-footer">
                © 2025 - Sistema de Gestión de Préstamos |
                Todos los derechos reservados.
                <span>Versión 1.0.0</span>
            </footer>

        </div>
    `;

    document.getElementById("form-login").addEventListener("submit", e => {
        e.preventDefault();
        iniciarAplicacion();
    });

    document.getElementById("ver-password").addEventListener("click", () => {
        const campo = document.getElementById("password-login");

        campo.type = campo.type === "password" ? "text" : "password";
    });
}

// ======================================================
// 4. MENÚ Y ESTRUCTURA GENERAL
// ======================================================

const menu = [
    { id: "inicio", icono: "⌂", nombre: "Inicio" },
    { id: "cobros", icono: "💲", nombre: "Cobro" },
    { id: "clientes", icono: "👥", nombre: "Clientes" },
    { id: "abono", icono: "💵", nombre: "Abono" },
    { id: "reportes", icono: "📊", nombre: "Reportes" },
    { id: "enrutar", icono: "📍", nombre: "Enrutar" },
    { id: "configuracion", icono: "⚙", nombre: "Configuración" },
    { id: "salir", icono: "⎋", nombre: "Salir" }
];

let paginaActual = "inicio";

function iniciarAplicacion() {
    app.innerHTML = `
        <div class="contenedor">

            <header class="encabezado-superior">

                <div class="marca">
                    <span class="logo">🪙</span>
                    <h1>Sistema de Gestión de Préstamos</h1>
                </div>

                <div class="usuario-superior">
                    <span>🔔 3</span>
                    <span>👤 Administrador ⌄</span>
                    <span>16/06/2025 10:24 a. m.</span>
                    <button type="button" id="cerrar-sesion">⎋ Salir</button>
                </div>

            </header>

            <aside class="menu-lateral">
                <nav>
                    ${menu.map(item => `
                        <a href="#"
                           data-pagina="${item.id}"
                           class="${item.id === "inicio" ? "activo" : ""}">
                            <span class="icono">${item.icono}</span>
                            <span class="texto-menu">${item.nombre}</span>
                        </a>
                    `).join("")}
                </nav>
            </aside>

            <main class="contenido" id="contenido-principal"></main>

        </div>
    `;

    document.querySelectorAll("[data-pagina]").forEach(enlace => {
        enlace.addEventListener("click", event => {
            event.preventDefault();

            const pagina = enlace.dataset.pagina;

            if (pagina === "salir") {
                pantallaLogin();
                return;
            }

            mostrarPagina(pagina);
        });
    });

    document.getElementById("cerrar-sesion").addEventListener("click", pantallaLogin);

    mostrarPagina("inicio");
}

// ======================================================
// 5. DASHBOARD
// ======================================================

function paginaInicio() {
    return `
        ${encabezadoPagina(
            "Inicio",
            "Resumen general del sistema de gestión de préstamos"
        )}

        <section class="indicadores-dashboard">

            ${tarjetaIndicador(
                "$",
                "Cobros",
                "$ 12.450.000",
                "Total cobrado este mes"
            )}

            ${tarjetaIndicador(
                "🪙",
                "Capital",
                "$ 9.800.000",
                "Capital cobrado este mes"
            )}

            ${tarjetaIndicador(
                "%",
                "Interés",
                "$ 2.650.000",
                "Intereses cobrados este mes"
            )}

        </section>

        <section class="dashboard-graficos">

            <article class="panel-dashboard">
                <h3>Cobros por mes</h3>

                <div class="grafico-barras">
                    ${[
                        ["Ene", "8.200.000", 55],
                        ["Feb", "10.500.000", 70],
                        ["Mar", "12.300.000", 82],
                        ["Abr", "11.800.000", 78],
                        ["May", "14.200.000", 95],
                        ["Jun", "12.450.000", 83]
                    ].map(d => `
                        <div class="barra-mes">
                            <span>${d[1]}</span>
                            <div class="barra-fondo">
                                <div class="barra-valor" style="height:${d[2]}%"></div>
                            </div>
                            <small>${d[0]}</small>
                        </div>
                    `).join("")}
                </div>
            </article>

            <article class="panel-dashboard">
                <h3>Distribución del cobro</h3>

                <div class="distribucion-cobro">
                    <div class="grafico-circular">78%</div>

                    <div>
                        <p>🔵 78% Capital</p>
                        <p>🟠 22% Interés</p>
                    </div>
                </div>
            </article>

        </section>

        <section class="panel-dashboard estado-prestamos">
            <h3>Estado de préstamos</h3>

            <div class="estados-resumen">
                <div>
                    <strong>150</strong>
                    <span>Total</span>
                </div>
                <div>
                    <strong>60%</strong>
                    <span>Al día</span>
                    <b>90</b>
                </div>
                <div>
                    <strong>25%</strong>
                    <span>En mora</span>
                    <b>38</b>
                </div>
                <div>
                    <strong>10%</strong>
                    <span>Próximos</span>
                    <b>15</b>
                </div>
                <div>
                    <strong>5%</strong>
                    <span>Cancelados</span>
                    <b>7</b>
                </div>
            </div>
        </section>

        ${seccionCobrosDashboard()}
    `;
}

function seccionCobrosDashboard() {
    const filas = cobros.slice(0, 5).map(c => [
        c[0],
        c[1],
        c[2],
        c[3],
        "↗ " + c[4],
        estadoHTML(c[5]),
        "ACCIONES"
    ]);

    return `
        <section class="panel-dashboard">
            <div class="encabezado-tabla">
                <h3>Cobros creados</h3>
                <div>
                    <input type="search" placeholder="Buscar cobro...">
                    <button type="button" class="btn-principal">📅 + Nuevo cobro</button>
                </div>
            </div>

            ${tablaHTML(
                [
                    "ID Cobro",
                    "Fecha de creación",
                    "Descripción",
                    "Cantidad de préstamos",
                    "Rentabilidad del cobro",
                    "Estado",
                    "Acciones"
                ],
                filas
            )}
        </section>
    `;
}

// ======================================================
// 6. COBROS
// ======================================================

function paginaCobros() {
    const filas = cobros.map(c => [
        c[0],
        c[1],
        c[2],
        c[3],
        "↗ " + c[4],
        estadoHTML(c[5]),
        "ACCIONES"
    ]);

    return `
        ${encabezadoPagina(
            "Cobros",
            "Administra los cobros asociados a los préstamos."
        )}

        <section class="barra-acciones">
            <div class="busqueda">
                <input
                    type="search"
                    id="buscar-cobro"
                    placeholder="🔍 Buscar cobro por descripción..."
                >
                <button type="button" id="btn-buscar-cobro">Buscar</button>
            </div>

            <button type="button" class="btn-principal">
                ＋ Nuevo cobro
            </button>
        </section>

        <section class="indicadores-dashboard">

            ${tarjetaIndicador("$", "Total de cobros", "12", "Cobros creados")}

            ${tarjetaIndicador("👥", "Préstamos asociados", "150", "Total de préstamos")}

            ${tarjetaIndicador("📈", "Rentabilidad promedio", "18,3%", "Rentabilidad de cobros")}

            ${tarjetaIndicador("📅", "Cobros activos", "10", "De 12 cobros")}

        </section>

        <section class="panel-dashboard">

            <div class="encabezado-tabla">
                <h3>Lista de cobros creados</h3>

                <label>
                    Mostrar
                    <select>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    registros
                </label>
            </div>

            ${tablaHTML(
                [
                    "ID Cobro ⇵",
                    "Fecha de creación ⇵",
                    "Descripción ⇵",
                    "Cantidad de préstamos ⇵",
                    "Rentabilidad del cobro ⇵",
                    "Estado ⇵",
                    "Acciones"
                ],
                filas,
                "tabla-cobros"
            )}

            <p class="pie-tabla">
                Mostrando 1 a 10 de 12 registros
            </p>

            <div class="paginacion">
                <button>Anterior</button>
                <button class="pagina-activa">1</button>
                <button>2</button>
                <button>Siguiente</button>
            </div>

        </section>
    `;
}

// ======================================================
// 7. CLIENTES
// ======================================================

function paginaClientes() {
    const filas = clientes.map(c => [
        c[0],
        c[1],
        c[2],
        c[3],
        estadoHTML(c[4]),
        "ACCIONES"
    ]);

    return `
        ${encabezadoPagina(
            "Clientes",
            "Clientes asociados al cobro seleccionado."
        )}

        <section class="barra-acciones">
            <div class="selector-cliente">
                <label for="selector-cobro-cliente">Seleccionar cobro</label>
                ${selectorCobro("selector-cobro-cliente")}
            </div>

            <button type="button" class="btn-principal">
                ＋ Nuevo cliente
            </button>
        </section>

        <section class="barra-acciones">
            <div class="busqueda">
                <input
                    type="search"
                    id="buscar-cliente"
                    placeholder="🔍 Buscar cliente por nombre o documento..."
                >
                <button type="button" id="btn-buscar-cliente">Buscar</button>
            </div>
        </section>

        <section class="indicadores-dashboard">

            ${tarjetaIndicador("👥", "Total de clientes", "25", "Clientes registrados en el cobro")}

            ${tarjetaIndicador("👤", "Clientes activos", "22", "Clientes habilitados")}

            ${tarjetaIndicador("⚠", "Clientes inactivos", "3", "Clientes deshabilitados")}

        </section>

        <section class="panel-dashboard">

            <div class="encabezado-tabla">
                <h3 id="titulo-lista-clientes">
                    Lista de clientes - Cobro: C-001 (Cobro semanal Centro)
                </h3>

                <label>
                    Mostrar
                    <select>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    registros
                </label>
            </div>

            ${tablaHTML(
                [
                    "ID ⇵",
                    "Cliente ⇵",
                    "Documento ⇵",
                    "Valor del préstamo actual ⇵",
                    "Estado ⇵",
                    "Acciones"
                ],
                filas,
                "tabla-clientes"
            )}

            <p class="pie-tabla">
                Mostrando 1 a 10 de 25 registros
            </p>

            <div class="paginacion">
                <button>Anterior</button>
                <button class="pagina-activa">1</button>
                <button>2</button>
                <button>3</button>
                <button>Siguiente</button>
            </div>

        </section>
    `;
}

// ======================================================
// 8. ABONO
// ======================================================

function paginaAbono() {
    return `
        ${encabezadoPagina(
            "Abono",
            "Registra y consulta los abonos de los préstamos."
        )}

        <section class="abono-seleccion">
            <label>Seleccionar cobro</label>
            ${selectorCobro("seleccionar-cobro-abono")}

            <label for="fecha-abono">Fecha de abono</label>
            <input type="date" id="fecha-abono" value="2025-06-16">
        </section>

        <section class="abono-cliente">

            <div class="abono-titulo-cliente">
                <span>👤</span>
                <h3>Información del cliente</h3>
            </div>

            <div class="abono-datos-cliente">

                <div class="abono-cedula">
                    <label>Cédula</label>
                    <div class="abono-buscar">
                        <input value="1.001.245.678">
                        <button type="button">🔍</button>
                    </div>
                </div>

                <div class="abono-campos-cliente">
                    <label>Nombre</label>
                    <input value="Juan Pérez" readonly>

                    <label>Dirección</label>
                    <input value="Calle 12 # 45 - 78" readonly>
                </div>

                <div class="abono-campos-cliente">
                    <label>Alias</label>
                    <input value="Juan Centro" readonly>

                    <label>Tipo de cliente</label>
                    <input value="Casilla" readonly>
                </div>

                <div class="abono-estado-cliente">
                    <label>Estado</label>
                    <span>Activo</span>
                </div>

            </div>

            <div class="abono-navegacion">
                <button type="button">‹ Atrás</button>
                <button type="button">Siguiente ›</button>
            </div>

        </section>

        <section class="abono-paneles">

            <article class="panel-prestamo">

                <div class="titulo-panel titulo-verde">
                    <span>≡</span>
                    <h3>Descripción del préstamo actual</h3>
                </div>

                ${[
                    ["ID del préstamo", "PR-001"],
                    ["Valor del préstamo", "$ 1.500.000"],
                    ["Cuota actual", "$ 150.000"],
                    ["Plazo (cuotas)", "12"],
                    ["Cuotas pagadas", "2"],
                    ["Cuotas pendientes", "10"],
                    ["Fecha inicio", "01/03/2025"],
                    ["Fecha próximo pago", "22/06/2025"],
                    ["Saldo pendiente", "$ 1.350.000"]
                ].map(d => `
                    <div class="prestamo-fila">
                        <span>${d[0]}</span>
                        <strong>${d[1]}</strong>
                    </div>
                `).join("")}

                <button type="button" class="btn-ingresar-prestamos">
                    ＋ Ingresar préstamos
                </button>

            </article>

            <article class="panel-abono">

                <div class="titulo-panel titulo-rojo">
                    <span>$</span>
                    <h3>Abono</h3>
                </div>

                <label for="valor-abono">Valor del abono</label>

                <div class="valor-abono">
                    <span>$</span>
                    <input type="number" id="valor-abono" value="150000">
                </div>

                <div class="botones-abono">
                    <button type="button">💾 Ingresar</button>
                    <button type="button">🗑 Eliminar</button>
                </div>

            </article>

            <article class="panel-cobro-dia">

                <div class="titulo-panel titulo-naranja">
                    <span>📅</span>
                    <h3>Cobro del día</h3>
                </div>

                <div class="cobro-fila">
                    <label>Cobro</label>
                    <input value="450.000" readonly>
                    <small>(Total cuotas ingresadas)</small>
                </div>

                <div class="cobro-fila">
                    <label>Préstamos</label>
                    <input value="3" readonly>
                    <small>(Total préstamos ingresados)</small>
                </div>

                ${[
                    ["Gastos", "gastos-dia"],
                    ["Base", "base-dia"],
                    ["Descuento", "descuento-dia"],
                    ["Efectivo", "efectivo-dia"]
                ].map(d => `
                    <div class="cobro-fila">
                        <label>${d[0]}</label>
                        <input type="number" id="${d[1]}" value="0">
                    </div>
                `).join("")}

                <div class="botones-cobro">
                    <button type="button">🧮 Calcular</button>
                    <button type="button">💾 Guardar</button>
                </div>

            </article>

        </section>

        <section class="abono-historial">

            <div class="titulo-historial">
                <span>≡</span>
                <h3>Historial de abonos del préstamo</h3>
            </div>

            ${tablaHTML(
                [
                    "#",
                    "Fecha",
                    "Cuota",
                    "Valor abono",
                    "Capital",
                    "Interés",
                    "Otros",
                    "Descuento",
                    "Efectivo",
                    "Saldo",
                    "Acciones"
                ],
                [
                    ["1", "01/03/2025", "1", "$ 150.000", "$ 120.000", "$ 30.000", "$ 0", "$ 0", "$ 150.000", "$ 1.380.000", "👁 ✏ 🗑"],
                    ["2", "08/03/2025", "2", "$ 150.000", "$ 123.000", "$ 27.000", "$ 0", "$ 0", "$ 150.000", "$ 1.350.000", "👁 ✏ 🗑"]
                ],
                "tabla-historial-abonos"
            )}

        </section>
    `;
}

// ======================================================
// 9. ENRUTAR TARJETA
// ======================================================

function paginaEnrutar() {
    return `
        ${encabezadoPagina(
            "Enrutar tarjeta",
            "Cambia de cobro o reorganiza la posición de una tarjeta (cliente).",
            "📍⇄"
        )}

        <section class="formulario-enrutar">

            <div class="campo-enrutar">
                <label>COBRO ORIGEN</label>
                <span>Cobro</span>
                <select>
                    <option>C-001 - Cobro semanal Centro</option>
                    <option>C-002 - Cobro mensual Norte</option>
                    <option>C-003 - Cobro quincenal Sur</option>
                </select>
            </div>

            <div class="campo-enrutar">
                <label>COBRO DESTINO</label>
                <span>Cobro</span>
                <select>
                    <option>C-003 - Cobro semanal Norte</option>
                    <option>C-001 - Cobro semanal Centro</option>
                    <option>C-002 - Cobro mensual Norte</option>
                </select>
            </div>

            <div class="campo-enrutar">
                <label>CLIENTE (TARJETA)</label>
                <span>Cliente</span>
                <select>
                    <option>Juan Pérez - 1.001.245.678</option>
                    <option>María López - 1.002.356.789</option>
                </select>
            </div>

            <div class="campo-enrutar">
                <label>Posición actual</label>
                <input type="number" value="15" readonly>
            </div>

            <div class="campo-enrutar">
                <label>UBICAR</label>

                <div class="opciones-ubicacion">
                    <label>
                        <input type="radio" name="ubicacion" value="antes">
                        Antes del cliente
                    </label>

                    <label>
                        <input type="radio" name="ubicacion" value="despues">
                        Después del cliente
                    </label>
                </div>
            </div>

            <div class="campo-enrutar">
                <label>Posición de referencia</label>
                <select>
                    <option>María López - 1.002.200.222</option>
                </select>
            </div>

            <div class="botones-enrutar">
                <button type="button">⇄ Enrutar</button>
                <button type="button" id="salir-enrutar">⎋ Salir</button>
            </div>

        </section>
    `;
}

// ======================================================
// 10. REPORTES
// ======================================================

function paginaReportes() {
    const filas = resumenReportes.map(r => [
        ...r,
        `<button type="button" class="btn-detalles">🔍 Detalles</button>`
    ]);

    return `
        ${encabezadoPagina(
            "Reportes",
            "Consulta el resumen de los cobros realizados.",
            "📊"
        )}

        <section class="barra-acciones">
            <label>Seleccionar cobro</label>
            ${selectorCobro("selector-cobro-reporte")}
        </section>

        <section class="panel-dashboard">

            <div class="titulo-historial">
                <span>≡</span>
                <h3>Resumen de cobros</h3>
            </div>

            ${tablaHTML(
                [
                    "#",
                    "Cobro",
                    "Fecha",
                    "Total cobrado",
                    "Préstamos",
                    "Gastos",
                    "Efectivo",
                    "Base",
                    "Descuadre",
                    "Acciones"
                ],
                filas,
                "tabla-reportes"
            )}

        </section>
    `;
}

// ======================================================
// 11. CONFIGURACIÓN
// ======================================================

function paginaConfiguracion() {
    const filasUsuarios = usuarios.map(u => [
        u[0],
        u[1],
        u[2],
        u[3],
        estadoHTML(u[4]),
        "ACCIONES"
    ]);

    return `
        ${encabezadoPagina(
            "Configuración",
            "Administra la información básica del sistema."
        )}

        <div class="configuracion-grid">

            <section class="panel-dashboard">

                <h3>👥 Usuarios del sistema</h3>

                <button type="button" class="btn-principal">
                    ＋ Nuevo usuario
                </button>

                ${tablaHTML(
                    [
                        "#",
                        "Usuario",
                        "Nombre completo",
                        "Rol",
                        "Estado",
                        "Acciones"
                    ],
                    filasUsuarios,
                    "tabla-usuarios"
                )}

            </section>

            <section class="panel-dashboard">

                <h3>🔒 Roles y permisos</h3>

                <label>Rol</label>

                <select>
                    <option>Operador</option>
                    <option>Administrador</option>
                    <option>Consulta</option>
                </select>

                ${tablaHTML(
                    ["Módulo", "Ver", "Crear", "Editar", "Eliminar"],
                    [
                        ["Inicio", "✓", "", "", ""],
                        ["Cobro", "✓", "✓", "✓", ""],
                        ["Clientes", "✓", "✓", "✓", "✓"],
                        ["Abono", "✓", "✓", "✓", "✓"],
                        ["Reportes", "✓", "", "", ""],
                        ["Enrutar", "✓", "✓", "", "✓"],
                        ["Configuración", "", "", "", ""]
                    ],
                    "tabla-permisos"
                )}

                <button type="button" class="btn-principal">
                    💾 Guardar permisos
                </button>

            </section>

            <section class="panel-dashboard">

                <h3>🏢 Datos del sistema</h3>

                <div class="config-formulario">
                    <label>Nombre del sistema</label>
                    <input value="Sistema de Gestión de Préstamos">

                    <label>Empresa</label>
                    <input value="Financiera Popular">

                    <label>Dirección</label>
                    <input value="Calle 123 # 45 - 67">

                    <label>Teléfono</label>
                    <input value="300 123 4567">

                    <label>Logo</label>
                    <input type="file" accept="image/*">
                </div>

            </section>

            <section class="panel-dashboard">

                <h3>🔑 Cambiar contraseña</h3>

                <div class="config-formulario">
                    <label>Usuario</label>
                    <input value="admin" readonly>

                    <label>Contraseña actual</label>
                    <input type="password">

                    <label>Nueva contraseña</label>
                    <input type="password">

                    <label>Confirmar contraseña</label>
                    <input type="password">
                </div>

                <button type="button" class="btn-principal">
                    🔑 Actualizar contraseña
                </button>

            </section>

        </div>
    `;
}

// ======================================================
// 12. MOSTRAR CADA PÁGINA
// ======================================================

function mostrarPagina(pagina) {
    paginaActual = pagina;

    const contenido = document.getElementById("contenido-principal");

    const paginas = {
        inicio: paginaInicio,
        cobros: paginaCobros,
        clientes: paginaClientes,
        abono: paginaAbono,
        enrutar: paginaEnrutar,
        reportes: paginaReportes,
        configuracion: paginaConfiguracion
    };

    if (!paginas[pagina]) return;

    contenido.innerHTML = paginas[pagina]();

    document.querySelectorAll("[data-pagina]").forEach(enlace => {
        enlace.classList.toggle(
            "activo",
            enlace.dataset.pagina === pagina
        );
    });

    activarEventosPagina(pagina);
}

// ======================================================
// 13. EVENTOS DE LAS PANTALLAS
// ======================================================

function activarEventosPagina(pagina) {

    // Buscador de cobros
    if (pagina === "cobros") {
        const buscador = document.getElementById("buscar-cobro");
        const tabla = document.getElementById("tabla-cobros");

        buscador.addEventListener("input", () => {
            const texto = buscador.value.toLowerCase();

            tabla.querySelectorAll("tbody tr").forEach(fila => {
                fila.style.display = fila.textContent.toLowerCase().includes(texto)
                    ? ""
                    : "none";
            });
        });
    }

    // Buscador de clientes
    if (pagina === "clientes") {
        const buscador = document.getElementById("buscar-cliente");
        const tabla = document.getElementById("tabla-clientes");

        buscador.addEventListener("input", () => {
            const texto = buscador.value.toLowerCase();

            tabla.querySelectorAll("tbody tr").forEach(fila => {
                fila.style.display = fila.textContent.toLowerCase().includes(texto)
                    ? ""
                    : "none";
            });
        });
    }

    // Salir de Enrutar
    if (pagina === "enrutar") {
        document.getElementById("salir-enrutar").addEventListener("click", () => {
            mostrarPagina("inicio");
        });
    }
}

// ======================================================
// 14. INICIAR EL SISTEMA
// ======================================================

// La aplicación comienza mostrando la pantalla de acceso.
pantallaLogin();
