// Call the dataTables jQuery plugin
$(document).ready(function() {

   cargarUsuarios();
  $('#dataTable').DataTable();

  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario(){
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}
function getHeader(){
    return{
        headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    'Authorization' : localStorage.token
                }
    }
}
async function cargarUsuarios(){
    const request = await fetch('api/usuarios',{
        method: 'GET',
        getHeader()
    });
    const usuarios = await request.json();

    let listadoHmtl = '';
    for(let usuario of usuarios){
        let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>'
        let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono
        let usuariosHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' + usuario.email + '</td><td>' + telefonoTexto + '</td><td>' + botonEliminar + '</td></tr>';
        listadoHmtl += usuariosHtml;
    }
    console.log(usuarios);
    document.querySelector('#usuarios tbody').outerHTML = listadoHmtl;
}


async function eliminarUsuario(id){

    if(confirm('Desea eliminar este usuario')){
        return;
    }
     const request = await fetch('api/usuarios/' + id,{
        method: 'DELETE',
        getHeader()
     });
     location.reload;
}