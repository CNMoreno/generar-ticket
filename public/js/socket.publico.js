var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

//var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Perdimos la conexion con el servidor');
});

socket.on('estadoActual', (data) => {
    console.log(data)
    actualizaHTML(data);
});

socket.on('ultimos4', (data) => {
    console.log(data)
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play();
    actualizaHTML(data);
});


function actualizaHTML(data) {

    data.ultimos4.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.numero);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.escritorio);
    });
}