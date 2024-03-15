function ValidacionJugador() {
    const nombreJug = document.getElementById('jugadorNombre').value;
    const apellidoJug = document.getElementById('jugadorApellido').value;
    const edadJug = document.getElementById('jugadorEdad').value;
    const emailJug = document.getElementById('jugadorEmail').value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (!isNaN(nombreJug) || nombreJug.trim() === "") {
        Swal.fire("Error", "Debe ingresar un nombre para el jugador", "error");
        return false;
    }
  
    if (!isNaN(apellidoJug) || apellidoJug.trim() === "") {
        Swal.fire("Error", "Debe ingresar un apellido para el jugador", "error");
        return false;
    }
  
    if (isNaN(edadJug) || edadJug.trim() === "" || edadJug <= 0) {
        Swal.fire("Error", "Debe ingresar una edad válida para el jugador", "error");
        return false;
    }
  
    if (!emailRegex.test(emailJug)) {
        Swal.fire("Error", "Debe ingresar un e-mail válido", "error");
        return false;
    }
  
    return true;
  }
  const JugadorForm = document.getElementById("Jugador-Form");
  async function emailExists(email) {
    const jugadorCollection = collection(db, "Jugador");
    const query2 = query(jugadorCollection, where("email", "==", email));
    const querySnapshot = await getDocs(query2);
    JugadorForm.reset();
    return !querySnapshot.empty;
  }