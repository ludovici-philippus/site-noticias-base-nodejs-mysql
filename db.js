const connect = async ()=>{
	if(global.conexao && global.conexao.state != 'disconnected')
		return global.conexao;

	const mysql = require("mysql2/promise");
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "noticias"
	});
	console.log("Conectou ao banco");
	global.conexao = connection;
	return connection;
}

const get_noticias = async ()=>{
	const sql = connect();
	const [noticias] = sql.query("SELECT * FROM `tb_noticias`", function(err, result, fields){
		if(err) throw err;
		console.log("Deu bom");
		console.log(result);
		console.log(fields);
	});
	return noticias;
}

module.exports = {connect, get_noticias}
