// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
//FireAuth import
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
//FireStore import
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHcot_9bQUbMlJaW-9xwQuwJIPILNkmrQ",
    authDomain: "pingpong-ae537.firebaseapp.com",
    projectId: "pingpong-ae537",
    storageBucket: "pingpong-ae537.appspot.com",
    messagingSenderId: "860830730183",
    appId: "1:860830730183:web:d8cbfa04eb47501dfe7be2",
    measurementId: "G-XRWELWNQP0"
  };
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();
const provider = new GoogleAuthProvider();
export const SaveJugador = (nombre, apellido, edad, email) => {
  addDoc(collection(db, "Jugador"), { nombre, apellido, edad, email });
};

export const getJugador = () => getDocs(collection(db, "Jugador"));

export const onGetJugador = (callback) => onSnapshot(collection(db, "Jugador"), callback)

export const deleteJugador = id => deleteDoc(doc(db, "Jugador", id));

export const updateJugador = (id, newFields) => updateDoc(doc(db, "Jugador", id), newFields);

export { db, collection, query, where, getDocs, onAuthStateChanged }

//CRUD Torneos
export const SaveTorneos = (nombre, cantidadJugadores, estado, fechaInicio, direccion) => {
  addDoc(collection(db, "Torneo"), { nombre, cantidadJugadores, estado, fechaInicio, direccion });
};

export const onGetTorneo = (callback) => onSnapshot(collection(db, "Torneo"), callback)
export const deleteTorneo = id => deleteDoc(doc(db, "Torneo", id));

export const updateTorneo = (id, newFields) => updateDoc(doc(db, "Torneo", id), newFields);

//Crud Partidos
export const SavePartidos = (nombreJugador1, nombreJugador2, nombreTorneo, fechaEmision, horaInicio, nombreGanador, resultadoJug1, resultadoJug2) => {
  addDoc(collection(db, "Partidos"), {nombreJugador1, nombreJugador2, nombreTorneo, fechaEmision, horaInicio, nombreGanador, resultadoJug1, resultadoJug2} );
}

export const deletePartido = id => deleteDoc(doc(db, "Partidos", id));

export const updatePartido = (id, newFields) => updateDoc(doc(db, "Partidos", id), newFields);

export const onGetPartido = (callback) => onSnapshot(collection(db, "Partidos"), callback)

// Evento Registrarse
const SingupForm = document.querySelector("#singup-form");

SingupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = document.querySelector("#singup-email").value;
  const clave = document.querySelector("#singup-password").value;

  createUserWithEmailAndPassword(auth, correo, clave)
    .then((userCredential) => {
      //resetea el formulario
      SingupForm.reset();
      var modalElement = document.getElementById("SingupModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();

      console.log("signed up");
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
});

//Evento Iniciar Sesion
const LoginForm = document.querySelector("#login-form");

LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = document.querySelector("#login-email").value;
  const clave = document.querySelector("#login-password").value;

  signInWithEmailAndPassword(auth, correo, clave)
    .then((userCredential) => {
      //resetea el formulario
      SingupForm.reset();
      var modalElement = document.getElementById("SinginModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();

      // Ahora puedes usar modalInstance para interactuar con el modal:
      SingupModal.hide();
      console.log("signed in");
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
});

//Evento Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log("sing out");
    window.location.href = "../html/index.html";
  });
});

//Google Login
const googleButton = document.getElementById("googleLogin");
googleButton.addEventListener("click", (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      var modalElement = document.getElementById("SinginModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

const jugadorList = document.getElementById("tablaJugador");
export const setUpJugadores = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const td = `
      <td>${post.nombre}</td>
      <td>${post.apellido}</td>
      <td>${post.edad}</td>
      <td>${post.email}</td>
            `;
      html += td;
    });
    jugadorList.innerHTML = html;
  } else {
    jugadorList.innerHTML =
      '<td class="text-center">Inicia sesion para ver las publicaciones</td>';
  }
};

//Login check
const loggedOut = document.querySelectorAll(".logged-out");
const loggedIn = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedIn.forEach((link) => (link.style.display = "block"));
    loggedOut.forEach((link) => (link.style.display = "none"));
  } else {
    loggedIn.forEach((link) => (link.style.display = "none"));
    loggedOut.forEach((link) => (link.style.display = "block"));
  }
};

//Events
//Listar si el usuario esta autenticado
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginCheck(user);
  } else {
    loginCheck(user);
  }
});

