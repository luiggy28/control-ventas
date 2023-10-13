document.addEventListener('DOMContentLoaded', function() {

    const medioPago = document.getElementById("medioPago");
    medioPago.addEventListener('change', calcularValores);

    const incluirIVA = document.getElementById("incluirIVA");
    incluirIVA.addEventListener('change', calcularValores);

    const valorBruto = document.getElementById("valorBruto");
    valorBruto.addEventListener('input', calcularValores);

    const valorVentaPublico = document.getElementById("valorVentaPublico");
    valorVentaPublico.addEventListener('input', calcularValores);

    const guardar = document.getElementById("guardar");
    guardar.addEventListener('click', guardarVenta);
});

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
}

function calcularValores() {
    const valorBruto = document.getElementById("valorBruto").valueAsNumber;
    const valorVentaPublico = document.getElementById("valorVentaPublico").valueAsNumber;
    const medioPago = document.getElementById("medioPago").value;
    const incluirIVA = document.getElementById("incluirIVA").checked;

    let comisionDebito = 0;
    let comisionCredito = 0;

    if (medioPago === 'Tarjeta Debito') {
        comisionDebito = 0.035 * valorVentaPublico;
    } else if (medioPago === 'Tarjeta Credito') {
        comisionCredito = 0.045 * valorVentaPublico;
    }

    const comisionTotal = valorVentaPublico - valorBruto;

    let valorIVAValue = 0;
    if (incluirIVA) {
        valorIVAValue = 0.19 * (comisionTotal + comisionDebito + comisionCredito);
    }

    const comisionColaboradorValue = (valorVentaPublico - valorBruto) * 0.13;
    const comisionEmpresaValue = (valorVentaPublico - valorBruto) * 0.87;
    const totalPagar = valorVentaPublico + valorIVAValue + comisionDebito + comisionCredito;

    document.getElementById("valorIVA").value = formatCurrency(valorIVAValue);
    document.getElementById("comisionTotal").value = formatCurrency(comisionTotal);
    document.getElementById("comisionColaborador").value = formatCurrency(comisionColaboradorValue);
    document.getElementById("comisionEmpresa").value = formatCurrency(comisionEmpresaValue);
    document.getElementById("valorPagoDebito").value = formatCurrency(comisionDebito);
    document.getElementById("valorPagoCredito").value = formatCurrency(comisionCredito);
    document.getElementById("valorTotalPagar").value = formatCurrency(totalPagar);
}

function guardarVenta() {
    const nombreColaborador = document.getElementById("nombreColaborador").value.trim().toUpperCase();
    const apellidoColaborador = document.getElementById("apellidoColaborador").value.trim().toUpperCase();
    const nombreCliente = document.getElementById("nombreCliente").value.trim().toUpperCase();
    const apellidoCliente = document.getElementById("apellidoCliente").value.trim().toUpperCase();
    const tipoServicio = document.getElementById("tipoServicio").value;
    const valorBruto = document.getElementById("valorBruto").value.trim();
    const valorVentaPublico = document.getElementById("valorVentaPublico").value.trim();

    if (!nombreColaborador) {
        alert("Por favor, ingresa el nombre.");
        return;
    }

    if (!apellidoColaborador) {
        alert("Por favor, ingresa el apellido.");
        return;
    }

    if (!nombreCliente) {
        alert("Por favor, ingresa el nombre.");
        return;
    }

    if (!apellidoCliente) {
        alert("Por favor, ingresa el apellido.");
        return;
    }

    if (!tipoServicio) {
        alert("Por favor, selecciona un tipo de servicio.");
        return;
    }

    if (!valorBruto) {
        alert("Por favor, ingresa el valor bruto.");
        return;
    }

    if (!valorVentaPublico) {
        alert("Por favor, ingresa el valor de venta al público.");
        return;
    }

    let incluirIVA;
    if (document.getElementById("incluirIVA").checked) {
        incluirIVA = "Sí";
    } else {
        incluirIVA = "No";
    }

    const valorIVA = document.getElementById("valorIVA").value;
    const comisionTotal = document.getElementById("comisionTotal").value;
    const comisionColaborador = document.getElementById("comisionColaborador").value;
    const comisionEmpresa = document.getElementById("comisionEmpresa").value;
    const valorPagoDebito = document.getElementById("valorPagoDebito").value;
    const valorPagoCredito = document.getElementById("valorPagoCredito").value;
    const valorTotalPagar = document.getElementById("valorTotalPagar").value;

    console.log("Nombre Agente:", nombreColaborador);
    console.log("Apellido Agente:", apellidoColaborador);
    console.log("Nombre Cliente:", nombreCliente);
    console.log("Apellido Cliente:", apellidoCliente);
    console.log("Tipo de Servicio:", tipoServicio);
    console.log("Valor Bruto:", valorBruto);
    console.log("Valor Venta Público:", valorVentaPublico);
    console.log("Medio de Pago:", document.getElementById("medioPago").options[document.getElementById("medioPago").selectedIndex].text);
    console.log("Incluir IVA:", incluirIVA);
    console.log("Valor IVA:", valorIVA);
    console.log("Comisión Total:", comisionTotal);
    console.log("Comisión Colaborador:", comisionColaborador);
    console.log("Comisión Empresa:", comisionEmpresa);
    console.log("Comisión Pago Débito:", valorPagoDebito);
    console.log("Comisión Pago Crédito:", valorPagoCredito);
    console.log("Valor Total a Pagar:", valorTotalPagar);

    alert("Venta guardada");

    // Reseteo de todos los campos del formulario
    document.getElementById("nombreColaborador").value = '';
    document.getElementById("apellidoColaborador").value = '';
    document.getElementById("nombreCliente").value = '';
    document.getElementById("apellidoCliente").value = '';
    document.getElementById("tipoServicio").selectedIndex = 0;
    document.getElementById("valorBruto").value = '';
    document.getElementById("valorVentaPublico").value = '';
    document.getElementById("medioPago").selectedIndex = 0;
    document.getElementById("incluirIVA").checked = false;
    document.getElementById("valorIVA").value = '';
    document.getElementById("comisionTotal").value = '';
    document.getElementById("comisionColaborador").value = '';
    document.getElementById("comisionEmpresa").value = '';
    document.getElementById("valorPagoDebito").value = '';
    document.getElementById("valorPagoCredito").value = '';
    document.getElementById("valorTotalPagar").value = '';
}
