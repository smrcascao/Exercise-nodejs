function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}



$(document).ready(function() {// depois de todo o html e java script ser carregado executa o codigo seguitne

var cookie = getCookie("PTapp_token");
var url_rest = "http://127.0.0.1:8080/user?token=" + cookie;
       // alert("data");

    $.ajax({
        url: url_rest//"http://localhost:8080/login?id=sergio%40mail.com&pass=sergio"
    }).then(function(data) {
        
//alert(JSON.stringify(data));
        $('.username').text(data["nome"]);
        document.getElementById("mail").innerHTML = data["mail"];
 document.getElementById("telefone").innerHTML = data["telefone"];
    });


/*carregar elementos para a tabela*/
var cookie = getCookie("PTapp_token");
var url_rest = "http://127.0.0.1:8080/produtos?token=" + cookie;
       // alert("data");

    $.ajax({
        url: url_rest
    }).then(function(data) {
        
//alert(JSON.stringify(data));
/*        $('.username').text(data["nome"]);
        document.getElementById("mail").innerHTML = data["mail"];
 document.getElementById("telefone").innerHTML = data["telefone"];
  */
      /*  $('#produtos > tbody').remove();
        $('#produtos').append('<tbody> <tr> </tr> </tbody>');


       for(var i =0 ; i<data.length;i++)
        {
            $('#produtos > tbody:last-child').append('<tr style="cursor: pointer;" onclick="#"> <td>' +data[i]["id"]+ '</td> <td >' +data[i]["nome"]+ '</td> <td >' +data[i]["tipo"]+ '</td> <td>' +data[i]["pais"]+ '</td></tr>');

        }

        $('#produtos').DataTable();*/

    var t = $('#produtos').DataTable();
    for(var i =0 ; i<data.length;i++){
        t.row.add( [
            data[i]["id"],
            data[i]["nome"],
            data[i]["tipo"],
            data[i]["pais"]
        ] ).draw( false );
}
    });


    $('#produtos').DataTable();
 
    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
 
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).attr('data-column') );
    } );


 $('#produtos tbody').on( 'click', 'tr', function () {
var cookie = getCookie("PTapp_token");
      var  id = $(this).children()[0].innerText;
        document.getElementById("body").innerHTML='<object type="text/html" data="propriedades.html?id='+ id +"&token="+cookie+' " style="width: 100%;    height: 500px;"></object>'
;
    } );
 



});

function filterGlobal () {
    $('#produtos').DataTable().search(
        $('#global_filter').val()

    ).draw();
}
 
function filterColumn ( i ) {
    //alert(i);
    $('#produtos').DataTable().column( i ).search(
        $('#col'+i+'_filter').val()
    ).draw();
}



function logOut() {
var cookie = getCookie("PTapp_token");
var url_rest = "http://127.0.0.1:8080/logout?token=" + cookie;
    $.ajax({
        url: url_rest
    }).then(function(data) {

    //alert(data);        
if(data=="200"){
    alert("logout feito com sucesso")
    window.location.href = "index.html";
}
else
       alert("Erro ao fazer logout")
    });   
}


