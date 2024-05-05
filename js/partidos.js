import{
    SavePartidos,
    deletePartido,
    updatePartido,
    onGetPartido,
    onAuthStateChanged,
    onGetJugador,
    onGetTorneo,
    auth
} from "./main.js";

function ValidacionPartidos() {
    const nombreTorneo = document.getElementById("selectTorneo").value;
    const nombreJugador1 = document.getElementById("selectJugador1").value;
    const nombreJugador2 = document.getElementById("selectJugador2").value;
    const fechaEmision = document.getElementById("fechaEmision").value;
    const horaInicio = document.getElementById("horaInicio").value;

    if (!nombreTorneo){
        Swal.fire({
            icon: 'error',
            title: 'Ups',
            text: 'Seleccione un torneo',
        });
        return false;
    }
     if (!nombreJugador1 || !nombreJugador2){
        Swal.fire({
            icon: 'error',
            title: 'Ups',
            text: 'Seleccione ambos jugadores',

        });
        return false;
     }
     if(nombreJugador1 === nombreJugador2){
        Swal.fire({
            icon: 'error',
            title: 'Ups',
            text: 'Los jugadores deben ser diferentes',
        });
        return false;
     }
    if (!fechaEmision){
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debe ingresar una fecha de emisión'
        });
        return false;
     }
     if (!horaInicio) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar una hora de inicio'
        });
        return false;
    }
}
const partidosList = document.getElementById("tablaPartido");

window.addEventListener("DOMContentLoaded", async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {

        } else {
            window.location.href = "../html/index.html";
        }
    });
    onGetTorneo((querySnapshot) => {
        let torneocmb = document.getElementById("selectTorneo");
        torneocmb.innerHTML = ""; // Limpia el combobox antes de agregar nuevos elementos

        let defaultOption = document.createElement("option");
        defaultOption.textContent = "Seleccione un torneo";
        defaultOption.value = "";
        torneocmb.appendChild(defaultOption); // Agrega una opción predeterminada

         querySnapshot.forEach((doc) => {
            let torneo = doc.data();
            let option = document.createElement("option");
            option.textContent = torneo.nombre; // Establece el texto del combobox como el nombre del torneo
            option.value = torneo.nombre; // Puede cambiar esto para usar otro valor como ID si lo prefiere
            torneocmb.appendChild(option); // Añade la opción al combobox
        });
    });
    onGetJugador((querySnapshot) => {
        let selectJugador1 = document.getElementById("selectJugador1");
        let selectJugador2 = document.getElementById("selectJugador2");
        selectJugador1.innerHTML = ""; // Limpia el combobox antes de agregar nuevos elementos
        selectJugador2.innerHTML = ""; // Limpia el segundo combobox
