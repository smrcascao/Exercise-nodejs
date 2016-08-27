

var http = require('http'), arquivo = require('fs');





var express = require('express');


var app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');

app.listen(8080);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

	extended: true
}));



//informação do user
app.get('/user',function(req,res){
	var token= req.param('token');
	var user=getInforUserByToken(token);//procura o mail correspondente ao token
delete user["password"];//remover elemento do json user
delete user["token"];
delete user["produtos"];
res.json(user);

});


/* retorna json estatisticas do produto*/
app.get('/estatistica',function(req,res){

	var file = 'estatistica.json'
	var jsonProdutos=jsonfile.readFileSync(file);

	var token= req.param('token');
	var idProduto= req.param('id');
	var user=getInforUserByToken(token);//procura o mail correspondente ao token
	var flag = 0;
	if(user!= null)
	{
	for(j=0; j <jsonProdutos.length;j++)
	{
		if(idProduto==jsonProdutos[j]["idProduto"])
		{
			flag=1;
		res.json(jsonProdutos[j]["vendas"]);
		break;
		}

	}
	}
	if (flag==0) {
	res.status(300).send("300");
	}


});



/*retorna a informação referente a um produto via ID*/
app.get('/getProdutoInfoByID',function(req,res){
	var file = 'produtos.json'
	var jsonProdutos=jsonfile.readFileSync(file);

	var token= req.param('token');
	var idProduto= req.param('id');
	var user=getInforUserByToken(token);//procura o mail correspondente ao token
	var flag = 0;
	if(user!= null)
	{
	for(j=0; j <jsonProdutos.length;j++)
	{
		if(idProduto==jsonProdutos[j]["id"])
		{
			flag=1;
		res.json(jsonProdutos[j]);
		break;
		}

	}
	}
	if (flag==0) {
	res.status(300).send("300");
	}


});

//enviar a lista de produtos de cada utilizador
app.get('/produtos',function(req,res){
	var file = 'produtos.json'
	var jsonProdutos=jsonfile.readFileSync(file);

	var token= req.param('token');
	var user=getInforUserByToken(token);//procura o mail correspondente ao token

//console.log(JSON.stringify(user["produtos"][0]));

var string='[]';
var objJson =JSON.parse(string);
var count =0;
for(i=0; i<user["produtos"].length; i++)
{
for(j=0; j <jsonProdutos.length;j++)
{
if(user["produtos"][i]==jsonProdutos[j]["id"])
{
//string= string+JSON.stringify(jsonProdutos[j])+',';

objJson[count]=jsonProdutos[j];
//console.log(JSON.stringify(objJson));
count ++;
}

}
}

res.json(objJson);
//res.end(objJson);
//console.log("Valor da objJson");
//console.log(JSON.stringify(objJson));

});


//logout do user
app.get('/logout',function(req,res){

	var file = 'login.json'
	var json=jsonfile.readFileSync(file);

	var token= req.param('token');

	for (var i = 0; i < json.length; i++){

		if(json[i]["token"]==token){
			console.log(json[i]["token"]+" apagar este");
			delete json[i]["token"];
			console.log(json);
		
		jsonfile.writeFile(file, json, function (err) {
			console.error(err)

		})
		res.status(200).send("200");
		}
	}			
res.status(300).send("300");


});

//http://127.0.0.1:5000/user/login?id=JP&pass=abchjkl
app.get('/login',function(req,res){

	var file = 'login.json'
	var json=jsonfile.readFileSync(file);
	console.dir(json);

	var id= req.param('id');
	var pass= req.param('pass');
	var flag =0;
	for (i = 0; i < json.length; i++) { 
		if(id==json[i]["mail"] && pass ==json[i]["password"])
		{
			flag=1;

			//console.log(json[i]["mail"]+"   "+json[i]["password"]+'asdasdasdasdasdasdasd');
			//res.end('O User '+json[i].mail+' exite a password é: '+json[i].password);   
			json[i]["token"]= Math.random(); //acrescentar atributos no json
			
			jsonfile.writeFile(file, json, function (err) {
				console.error(err)
			})
			res.json(
			{
				mail: json[i]["mail"],token: json[i]["token"] }
				);
			
			break;
		}


	}
	if(flag==0)
		res.json(
			{token: null,
				mail: id }
				);	
});


function getInforUserByToken (token){
	var file = 'login.json'
	var json=jsonfile.readFileSync(file);
	console.dir(json);

	json=jsonfile.readFileSync(file);

	for (i = 0; i < json.length; i++) { 
		if(token==json[i]["token"])
		{

			console.log(json[i]["mail"]);
			return json[i];

		}}
	}

	app.post('/user',function(req,res){

		res.end('/Cria um novo User');

	});

	app.put('/user:id',function(req,res){

		res.end('/Actualiza o user ID');

	});