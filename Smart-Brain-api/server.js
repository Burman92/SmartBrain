import express from "express";
import bcrypt from "bcrypt-nodejs"
import cors from 'cors'
import knex from "knex";

const pg = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'burman',
        password : 'test',
        database : 'smart-brain'
        }
    });


const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send('success')
})
app.post("/signin", (req, res)=>{
    pg.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data =>{
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(isValid){
            return pg.select('*').from('users').where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('Wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res)=>{
    const {email, name, password}= req.body
    const hash = bcrypt.hashSync(password);
        pg.transaction(trx => {
            return trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail =>{
                trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user =>{
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    .catch(err => res.status(400).json("unable to register"))
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params
    pg.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(404).json('not found')
        }
    })
    .catch(err=> res.status(400).json('error getting user'))
})

app.put('/image', (req, res)=>{
    const {id} = req.body;
    pg('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
})






app.listen(3000, ()=>{
    console.log('app is listening on port 3000')
})

