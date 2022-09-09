class Equipo {
    constructor(nombre, partidosJugados, puntos, ciudad) {
        this.nombre = nombre;
        this.partidosJugados = partidosJugados;
        this.puntos = puntos;
        this.ciudad = ciudad;
    }
}

const equipos=[
    {
        nombre:"Las Leñitas FC",
        partidosJugados: 4,
        puntos:5,
        ciudad:"La Granja"
    },
    {
        nombre:"Caroya Unido",
        partidosJugados:4,
        puntos:3,
        ciudad:"Colonia Caroya"
    },     
];

dibujarTabla();

const cordobaCoordenates = {
    lat: -31.428121,
    lng: -64.186334
  };
  const apikey = 'fe561ece-2f22-11ed-869c-0242ac130002-fe561fa0-2f22-11ed-869c-0242ac130002';
  const params = 'airTemperature';
  let temperaturaActual;
  
  const getWeather = async () => {
    //Otra api:reemplazar el string del tech por:
    // https://api.openweathermap.org/data/3.0/onecall?lat=-31.428121&lon=-64.186334&appid=bb696e6790f386932f0bb2a60c6e3e16
    const resp = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${cordobaCoordenates.lat}&lng=${cordobaCoordenates.lng}&params=${params}`, {
      method: 'GET',
      headers: {
        'Authorization': apikey
      }
    });
    const results = await resp.json();
    temperaturaActual = results.hours[0].airTemperature.noaa;
    let climaP = document.getElementById('clima');
    climaP.innerHTML = temperaturaActual;
  }

getWeather();



let formulario1 = document.getElementById("agregarForm");
let agregarUnEquipo = document.getElementById("agregarEq");
let agregarPartidosJugados = document.getElementById("agregarPj");
let agregarPuntos = document.getElementById("agregarPts");
let agregarCiudad = document.getElementById("agregarCity");

agregarUnEquipo.onchange = () => {
    agregarEq = agregarUnEquipo.value;
}
agregarPartidosJugados.onchange = () => {
    agregarPj = agregarPartidosJugados.value;
}
agregarPuntos.onchange = () => {
    agregarPts = agregarPuntos.value;
}
agregarCiudad.onchange = () => {
    agregarCity = agregarCiudad.value;
}

function cargarUnEquipo() {
    equipos.push(new Equipo(agregarEq, agregarPj, agregarPts, agregarCity));
}

let botonDeAgregar = document.getElementById("addEquipo");

botonDeAgregar.onclick = () => {
    if ((agregarUnEquipo.value == "") || (agregarPartidosJugados.value == "") || (agregarPuntos.value == "") || (agregarCiudad.value == "")) {
        alert("Por favor, complete todos los campos")
    } else {
        cargarUnEquipo();
        console.log("Has agregado un equipo");
        dibujarTabla();
        console.table(equipos);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Equipo Agregado con Éxito',
            showConfirmButton: false,
            timer: 1500
          }) //Librería
    }
    localStorage.setItem("equipos",JSON.stringify(equipos));
}

let traidoDelStorage=localStorage.getItem("equipos");
const jsonAObjeto=JSON.parse(traidoDelStorage);


function dibujarTabla() {
    let tablaDePosicion = document.getElementById("equipoItem");
    tablaDePosicion.innerHTML = "";
    equipos.forEach(
        (equipo) => {
            tablaDePosicion.innerHTML += `
            <tr>
            <td id="equipo-nombre-${equipo.nombre}">${equipo.nombre}</td>
            <td id="equipo-pj-${equipo.partidosJugados}">${equipo.partidosJugados}</td>
            <td id="equipo-pts-${equipo.puntos}">${equipo.puntos}</td>
            <td id="equipo-ciudad-${equipo.ciudad}">${equipo.ciudad}</td>
            </tr>
        `;
        }
    );
}


let botonDeEliminar = document.getElementById("eliminarEqui");


let formularioEliminar = document.getElementById("eliminarForm");
let paraEliminarNombre = document.getElementById("eliminarNombre");
let paraEliminarCiudad = document.getElementById("eliminarCiudad");

paraEliminarNombre.onchange = () => {
    eliminarNombre = paraEliminarNombre.value;
}
paraEliminarCiudad.onchange = () => {
    eliminarCiudad = paraEliminarCiudad.value;
}

botonDeEliminar.onclick = () => {
    if ((paraEliminarNombre.value == "") || (paraEliminarCiudad.value == "")) {
        alert("Por favor, complete todo los campos")
    } else
        equiposRestantes = equipos.filter(equipo => equipo.nombre != paraEliminarNombre.value);
    equipos.length = 0;
    equiposRestantes.forEach((equiposRestantes) => equipos.push(equiposRestantes));
    dibujarTabla();
}