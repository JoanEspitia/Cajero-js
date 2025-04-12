const cuentas = [
    { usuario: "pedro", saldo: 200, password: "123" },
    { usuario: "pepe", saldo: 290,  password: "123" },
    { usuario: "agripino", saldo:67, password: "123" }
];

let cuentaSeleccionada = null;

const loginForm = document.getElementById("loginForm");
const errorDiv = document.getElementById("error");
const sistemaDiv = document.getElementById("sistema");
const usuarioNombre = document.getElementById("usuarioNombre");
const mensajeDiv = document.getElementById("mensaje");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
        const userName = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();

const cuenta = cuentas.find(c => c.usuario === userName && c.password === password);
    if (cuenta) {
        cuentaSeleccionada = cuenta;
        iniciarSistema();
    } else {
        errorDiv.innerText = "Usuario o contraseña incorrectos";
    }
    });

function iniciarSistema() {
    errorDiv.innerText = "";
    mensajeDiv.innerText = "";
    loginForm.style.display = "none";
    sistemaDiv.style.display = "block";
    usuarioNombre.innerText = cuentaSeleccionada.usuario;
}

function cerrarSesion() {
    cuentaSeleccionada = null;
    loginForm.style.display = "block";
    sistemaDiv.style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    mensajeDiv.innerText = "";
}

function mostrarMensaje(msg, error = false) {
    mensajeDiv.style.color = error ? "red" : "green";
    mensajeDiv.innerText = msg;
}

function validarSesion() {
    if (!cuentaSeleccionada) {
        mostrarMensaje("Debe iniciar sesión primero", true);
            return false;
        }
        return true;
    }

function ConsultarSaldo() {
    if (!validarSesion()) return;
        mostrarMensaje(`Su saldo actual es: $${cuentaSeleccionada.saldo}`);
    }

function ingresarMonto() {
    if (!validarSesion()) return;
        const monto = parseFloat(prompt("Ingrese el monto a ingresar:"));
    if (isNaN(monto) || monto <= 0) return mostrarMensaje("Monto inválido", true);
        const nuevoSaldo = cuentaSeleccionada.saldo + monto;
    if (nuevoSaldo > 990) return mostrarMensaje("El saldo máximo permitido es $990", true);
        cuentaSeleccionada.saldo = nuevoSaldo;
            mostrarMensaje(`Ingreso exitoso. Nuevo saldo: $${cuentaSeleccionada.saldo}`);
    }

function retirarMonto() {
    if (!validarSesion()) return;
        const monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    if (isNaN(monto) || monto <= 0) return mostrarMensaje("Monto inválido", true);
        const nuevoSaldo = cuentaSeleccionada.saldo - monto;
    if (nuevoSaldo < 10) return mostrarMensaje("El saldo mínimo debe ser $10", true);
        cuentaSeleccionada.saldo = nuevoSaldo;
            mostrarMensaje(`Retiro exitoso. Nuevo saldo: $${cuentaSeleccionada.saldo}`);
}