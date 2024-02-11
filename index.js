const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connect = require('./config/db')
const response = require('./utils/respons')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM barang'
  connect.query(sql, (err, result) => {
    if (err) throw err
    response('Succses', 'ok,', result, res)
  })
})

app.post('/', (req, res) => {
  const { namaBarang, harga } = req.body
  const sql = `INSERT INTO barang (nma_brang,harga) VALUES ("${namaBarang}","${harga}")`
  connect.query(sql, (err, result) => {
    if (err) throw err
    response('succses', 'succses added', result, res)
  })
})

app.put('/', (req, res) => {
  const { id } = req.query
  const { namaBarang, harga } = req.body
  const sql = `UPDATE barang SET nma_brang='${namaBarang}', harga='${harga}' WHERE id='${id}'`
  connect.query(sql, (err, result) => {
    if (err) throw err
    response('ok', 'Succses Update', result, res)
  })
})

app.delete('/', (req, res) => {
  const { id } = req.query
  const sql = `DELETE FROM barang WHERE id='${id}'`
  connect.query(sql, (err, result) => {
    if (err) throw err
    response('ok', 'Succses deleted', result, res)
  })
})

app.listen(300, () => {
  console.log('server is runing....')
})
