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
}
