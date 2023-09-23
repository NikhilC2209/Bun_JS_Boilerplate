import { Database } from "bun:sqlite";

export const db = new Database("models/User.db");

function create_table(db) {
	db.run('CREATE TABLE records(name text, email text, password text)');
}

export function print_all_records(db) {
	const query = db.query("SELECT * FROM records");
	const results = query.all();
	console.log(results)
}

export function insert_user(db, user) {

	db.run('INSERT INTO records(name, email, password) VALUES(?, ?, ?)', [user.name, user.email, user.password], (err) => {
	if(err) {
		return console.log(err.message); 
	}
	console.log('Row was added to the table: ${this.lastID}');
	return `Row was added to the table: ${this.lastID}`;
})

}

export function find_user(db, user) {
	// console.log(typeof(user.email))
	console.log(user.email)
	const query = db.query(`SELECT * FROM records WHERE email = "${user.email}"`, (err) => {
		if(err) {
			return console.log(err.message); 
	}
	});
	// console.log(query)
	const results = query.all();
	console.log(results)
	if(results.length == 0) {
		return false
	} else {
		return true
	}
}

export function delete_table(db) {
	db.run('DELETE FROM records');
	console.log("Deleted all rows")
}

export function test_exports() {
	console.log("Working!!!")
}