const API = require('./api.js')
const express = require('express')
const { Router } = express
const PORT = 8080

const api = new API()
const app = express()
const router = Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

app.use('/api/productos', router)
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

router.get('/', (req, res) => {
    res.json(api.getAll())
})

router.get('/:id', (req, res) => {
    res.json(api.getById(parseInt(req.params.id)))
})

router.post('/', (req, res) => {
    let id = api.add(req.body)
    res.redirect('/api/productos/' + id)
})

router.delete('/:id', (req, res) => {
    res.json(api.deleteById(parseInt(req.params.id)))
})

router.put('/:id', (req, res) => {
    res.json(api.updateById(parseInt(req.params.id), req.body))
})