import express from "express";
const app = express();
import exphbs from "express-handlebars";
import session from "express-session";
import bodyParser from "body-parser";
import SpazaRouters from "./routes/routes.js";
import flash from "express-flash";
import dataFactory from "./spaza-suggest.js";
import pgPromise from "pg-promise";

const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_spaza';

const config = { 
	connectionString
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}

const db = pgp(config);
const spazaDB = dataFactory(db);


let shopRouter = SpazaRouters(spazaDB,db);

//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'djfhsdflbasf',
    resave: false,
    saveUninitialized: true   
}));

// initialise the flash middleware
app.use(flash());

app.get('/', shopRouter.defaultRoute);
app.get('/register', shopRouter.registerRoute);
app.get('/login', shopRouter.loginRoute);
app.post('/register', shopRouter.regClient);
app.post('/login', shopRouter.Login)


//start the server
const PORT = process.env.PORT || 3018;

app.listen(PORT, function () {
    console.log("App running at http://localhost:" + PORT)
});