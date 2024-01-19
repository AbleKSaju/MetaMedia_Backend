import express from 'express'
import bodyparser from 'body-parser'

const app=express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

export {app}