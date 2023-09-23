const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { print_all_records, test_exports, db, find_user, insert_user } = require('../db.js');
// import { Database } from "bun:sqlite";

// const database = new Database("models/User.db", { readonly: true });

// router.get("/register", (req,res) => {
//     res.render("register.ejs");
// })

router.get("/register", (req,res) => {
    console.log(print_all_records(db))

    res.render("register.ejs");
})

router.post("/register", async (req,res) => {

    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPass = req.body.password;

    userObj = {
        "name": userName,
        "email": userEmail,
        "password": userPass
    }

    console.log(userObj);
    let error;

    try {
        error = {};
        const emailExists = await find_user(db, userObj);
        console.log(emailExists)
        if(!emailExists) {
            msg = await insert_user(db, userObj)
            console.log(msg)
            res.render("index.ejs");
        }
        else {
            error.text = "User already exists!";
            console.log("User already exists!");

            res.render("register.ejs");
        }

    }

    catch(err) {
        console.log(err);
    }
});

module.exports = router