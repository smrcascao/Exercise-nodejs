var myParamToken;
var myParamID;
var arrayAno =[];
var arrayEstragados=[];
var arrayVendidos=[];

function charts(){

	$.getScript('http://www.chartjs.org/assets/Chart.js',function(){
    
    var url_rest = "http://127.0.0.1:8080/estatistica?token=" + myParamToken+"&id="+myParamID;
       // alert("data");
console.log(url_rest);
    $.ajax({
        url: url_rest//"http://localhost:8080/login?id=sergio%40mail.com&pass=sergio"
    }).then(function(data) {

        
//alert(JSON.stringify(data));

 arrayAno =[];
arrayEstragados=[];
 arrayVendidos=[];
//console.log('json'+JSON.stringify(data));
for(var i=0;i<data.length;i++)
{

//console.log('----------'+data[i]["ano"]+'----------->');
arrayAno.push(data[i]["ano"]);
arrayVendidos.push(data[i]["vendidos"]);
arrayEstragados.push(data[i]["estragados"]);

}



console.log('ano:'+arrayAno+' vendidos:'+arrayVendidos+' estragados:'+arrayEstragados);





    });



      var data = {
          labels : arrayAno,
          datasets : [
              {
                  fillColor : "rgba(220,220,220,0.5)",
                  strokeColor : "rgba(220,220,220,1)",
                  pointColor : "rgba(220,220,220,1)",
                  pointStrokeColor : "#fff",
                  data : arrayVendidos
              },
              {
                  fillColor : "rgba(151,187,205,0.5)",
                  strokeColor : "rgba(151,187,205,1)",
                  pointColor : "rgba(151,187,205,1)",
                  pointStrokeColor : "#fff",
                  data : arrayEstragados
              }
          ]
      }

      
    //  data["datasets"][0]["data"]= arrayVendidos; 
      //data["datasets"][1]["data"]= arrayEstragados; 
    //  data["labels"]= arrayAno;

  //console.log(myParamID+'-----'+myParamToken);
      var options = {
          animation: true
      };
  
      //Get the context of the canvas element we want to select
      var c = $('#myChart');
      var ct = c.get(0).getContext('2d');
      var ctx = document.getElementById("myChart").getContext("2d");
      /*********************/
      new Chart(ctx).Bar(data,options);
  
  });
}

$(document).ready(function() {




   myParamID = location.search.split('id=')[1];
   myParamID = myParamID.split('&token=')[0];
   myParamToken = location.search.split('token=')[1];
//alert(myParamID+'------ '+myParamToken);



var url_rest = "http://127.0.0.1:8080/getProdutoInfoByID?token=" + myParamToken+"&id="+myParamID;
       // alert("data");
console.log(url_rest);
    $.ajax({
        url: url_rest//"http://localhost:8080/login?id=sergio%40mail.com&pass=sergio"
    }).then(function(data) {
        console.log(data);
//alert(JSON.stringify(data));

        document.getElementById("id").innerHTML = data["id"];
 document.getElementById("nome").innerHTML = data["nome"];
        document.getElementById("type").innerHTML = data["tipo"];
 document.getElementById("pais").innerHTML = data["pais"];

    });



 	
});