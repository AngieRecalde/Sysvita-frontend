//base de datos local de preguntas
const bd_preguntas = [
    {
        id_pregunta:0,
        enunciado:"Pienso que mi futuro es deseperado y no mejorará",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:1,
        enunciado:"Estoy preocupado",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:2,
        enunciado:"Me siento con confianza en mí mismo",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:3,
        enunciado:"Siento que me canso con facilidad",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:4,
        enunciado:"Creo que no tengo nada de qué arrepentirme",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:5,
        enunciado:"Siento deseos de quitarme la vida",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:6,
        enunciado:"Me siento seguro",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:7,
        enunciado:"Deseo desentenderme de todos los problemas tengo",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:8,
        enunciado:"Me canso más pronto que antes",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:9,
        enunciado:" Me inclino a ver el lado bueno de las cosas",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:10,
        enunciado:"Me siento bien sexualmente",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:11,
        enunciado:"Ahora no tengo ganas de llorar",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:12,
        enunciado:"He perdido la confianza en mí mismo",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:13,
        enunciado:" Siento necesidad de vivir",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:14,
        enunciado:"Siento que nada me alegra como antes",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:15,
        enunciado:" No tengo sentimientos de culpa",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:16,
        enunciado:"Duermo perfectamente",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:17,
        enunciado:"Me siento incapaz de hacer cualquier trabajo por pequeño que sea",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:18,
        enunciado:"Tengo gran confianza en el porvenir",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    },
    {
        id_pregunta:19,
        enunciado:" Me despierto más temprano que antes y me cuesta trabajo volverme a dormir",
        op0:"No, en absoluto",
        op1:"Un poco",
        op2:"Bastante",
        op3:"Mucho"
    }
]

// Para guardar las respuestas elegidas
let respuestas = [];

// Enunciado actual que debe ser cargado
let numPregunta = 0;

// Cargo una enunciado del JSON
function cargarPreguntas() {
    // Tomo la enunciado actual de la bd
    const enunciado = bd_preguntas[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-enunciado";
    contenedor.id_pregunta = enunciado.id_pregunta;

    const h2 = document.createElement("h2");
    h2.textContent = enunciado.id_pregunta + 1 + " - " + enunciado.enunciado;
    contenedor.appendChild(h2);

    const opciones = document.createElement("div");

    // Crear los cuatro labels
    const label1 = crearLabel("0", enunciado.op0);
    const label2 = crearLabel("1", enunciado.op1);
    const label3 = crearLabel("2", enunciado.op2);
    const label4 = crearLabel("3", enunciado.op3);

    // Agrego los labels al contenedor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);
    opciones.appendChild(label4);

    // Agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

// Creo la función que retornará el label con todo su contenido
function crearLabel(num, txtOpcion) {
    const label = document.createElement("label");
    label.id_pregunta = "l" + numPregunta + num;

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta + "," + num + ")");

    const span = document.createElement("span");
    span.textContent = txtOpcion;

    label.appendChild(input);
    label.appendChild(span);

    return label;
}

// Mediante un for cargo todas las preguntas del JSON
for (let i = 0; i < bd_preguntas.length; i++) {
    cargarPreguntas();
    // Actualizo el número de enunciado actual
    numPregunta++;
}

// Función que carga la opción elegida en el arreglo respuestas
function seleccionar(pos, opElegida) {
    respuestas[pos] = opElegida + 1; // Almacena el valor (1, 2, 3, 4)
}

// Botón calcular test
let calculartest = document.getElementById("calculartest");
calculartest.onclick = function () {
    // Se podría enviar las respuestas a la base de datos aquí
    // Por ahora, solo se mostrará en la consola
    console.log(respuestas);

    // Aquí puedes hacer una llamada AJAX para enviar los datos a la base de datos
    // Ejemplo:
    // fetch('/guardar_respuestas', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(respuestas),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    // Deshabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

    // Hacemos un scroll hacia arriba
    window.scrollTo(0, 0);

    // Mostramos el resultado
    let h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = "Test completado. Gracias por tus respuestas.";
    document.getElementById("juego").appendChild(h2);
};