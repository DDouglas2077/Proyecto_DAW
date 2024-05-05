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

         // Agrega una opción predeterminada para ambos comboboxes
        ["selectJugador1", "selectJugador2"].forEach(selectId => {
            let defaultOption = document.createElement("option");
            defaultOption.textContent = "Seleccione un jugador";
            defaultOption.value = "";
            document.getElementById(selectId).appendChild(defaultOption);
        });

        querySnapshot.forEach((doc) => {
            let player = doc.data();
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.textContent = `${player.nombre} ${player.apellido}`; // Nombre completo para el primer combobox
            option1.value = `${player.nombre} ${player.apellido}`; // Usa nombre y apellido como valor

            option2.textContent = `${player.nombre} ${player.apellido}`; // Nombre completo para el segundo combobox
            option2.value = `${player.nombre} ${player.apellido}`; // Usa nombre y apellido como valor

            selectJugador1.appendChild(option1); // Añade la opción al primer combobox
            selectJugador2.appendChild(option2); // Añade la opción al segundo combobox
        });
    });

    var selectJugador1 = document.getElementById('selectJugador1');
    var selectJugador2 = document.getElementById('selectJugador2');

    onGetPartido((querySnapshot) => {
        partidosList.innerHTML = ""; // Asegúrate de que partidosList sea el ID de tu elemento de lista de partidos
        querySnapshot.forEach((doc) => {
            let partido = doc.data();
            let row = document.createElement("tr");
            row.innerHTML = `
              <td>${partido.nombreTorneo}</td>
              <td>${partido.nombreJugador1} vs ${partido.nombreJugador2}</td>
              <td>${partido.fechaEmision}</td>
              <td>${partido.horaInicio}</td>
               <td><button type="button" class="btn btn-info btn-editPartido" data-id='${doc.id}' data-nombreTorneo='${partido.nombreTorneo}'data-nombreJugador1='${partido.nombreJugador1}'
                                                                                data-nombreJugador2='${partido.nombreJugador2}'
                                                                                data-fechaEmision='${partido.fechaEmision}'
                                                                                data-horaInicio='${partido.horaInicio}' Editar</button></td>
              <td><button type="button" class="btn btn-danger btn-deletePartido" data-id='${doc.id}'>Eliminar</button></td>`;
            partidosList.appendChild(row);
        });
        
 // Botones para eliminar
        const btnDelete = partidosList.querySelectorAll(".btn-deletePartido");
        btnDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deletePartido(dataset.id);
                Swal.fire({
                    icon: 'success',
                    title: '¡Hecho!',
                    text: 'Partido eliminado con éxito'
                });
            });
        });
