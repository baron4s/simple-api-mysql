const fs = require('fs')
const { Product } = require('../models')
const asyncHanler = require('../middleware/asyncHandler')

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json({
      status: 'success',
      message: 'ok',
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something wrong',
    })
  }
}

exports.getDetailProduct = asyncHanler(async (req, res) => {
  const { id } = req.params
  const detail = await Product.findByPk(id)
  if (!detail) {
    res.status(404)
    throw new Error('produk tidak ditemukan')
  }
  return res.status(200).json({
    status: 'success',
    message: 'ok',
    data: detail,
  })
})

exports.storeProduct = asyncHanler(async (req, res) => {
  let { nama, harga, stock, description, category_id } = req.body
  const file = req.file
  if (!file) {
    res.status(404)
    throw new Error('tidak ada file yang di upload')
  }
  const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${
    file.filename
  }`

  const newProduct = await Product.create({
    nama,
    harga,
    stock,
    description,
    image: pathFile,
    category_id,
  })

  res.status(201).json({
    status: 'ok',
    message: 'Berhasil menyimpan data',
    data: newProduct,
  })
})

exports.updateProduct = asyncHanler(async (req, res) => {
  const { id } = req.params
  const { nama, harga, description, stock, category_id } = req.body
  const data = await Product.findByPk(id)
  if (!data) {
    res.status(404)
    throw new Error('produk tidak ditemukan')
  }

  const file = req.file
  if (file) {
    const oldImage = data.image.replace(
      `${req.protocol}://${req.get('host')}`,
      '.',
    )
    fs.unlink(oldImage, (err) => {
      if (err) {
        res.status(404)
        throw new Error('file tidak di temukan')
      }
    })

    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${
      file.filename
    }`
    data.image = pathFile
  }

  data.nama = nama || data.nama
  data.description = description || data.description
  data.harga = harga || data.harga
  data.stock = stock || data.stock
  data.category_id = category_id || data.category_id

  data.save()
  res.status(201).json({
    status: 'berhasil mengupdate product',
    message: 'ok',
  })
})

exports.destroyProduct = asyncHanler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) {
    res.status(404)
    throw new Error('produk tidak ditemukan')
  }

  const oldImage = product.image.replace(
    `${req.protocol}://${req.get('host')}`,
    '.',
  )
  fs.unlink(oldImage, (err) => {
    if (err) {
      res.status(404)
      throw new Error('file tidak di temukan')
    }
  })
  await Product.destroy({
    where: {
      id,
    },
  })
  res.status(200).json({
    status: 'success delete',
    message: 'ok',
  })
})
