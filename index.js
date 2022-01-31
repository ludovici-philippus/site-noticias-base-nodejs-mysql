const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");




const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/pages"));
/*---------------------------------*/

app.get("/", (req, res)=>{
	const noticias = async function get_noticias(){
		const sql = await db.connect();	
		const [rows] = await sql.execute("SELECT * FROM `tb_noticias`");
		res.render("home", {noticias: rows});
	}
	noticias();
});

app.get("/:slug", (req, res)=>{
	const noticia_single = async function get_noticia_info(){
		const sql = await db.connect();
		const [row] = await sql.execute("SELECT * FROM `tb_noticias` WHERE slug = ?", [req.params.slug]);
		res.render("artigo", {artigo: row[0]});
	}
	noticia_single();
});

/*---------------------------------*/
app.listen(5000, ()=>{
	console.log("Servidor começo, homi do céu!");
});
