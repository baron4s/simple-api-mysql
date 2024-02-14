const { product } = require('../models')

exports.getAllProduct = async (req, res) => {
  try {
    const products = await product.findAll()
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

exports.getDetailProduct = async (req, res) => {
  console.log(req.params)
  try {
    const { id } = req.params
    const detail = await product.findByPk(id)
    if (!detail) {
      return res.status(404).json({
        status: 'fail',
        message: 'data tidak ditemukan',
      })
    }
    return res.status(200).json({
      status: 'success',
      message: 'ok',
      data: detail,
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something wrong',
    })
  }
}

exports.storeProduct = async (req, res) => {
  console.log(req.body)
  try {
    const { nama, harga } = req.body
    const newProduct = await product.create({
      nama,
      harga,
    })

    res.status(201).json({
      status: 'ok',
      message: 'Berhasil menyimpan data',
      data: newProduct,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.errors,
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { nama, harga } = req.body
    const { id } = req.params
    const productId = await product.findByPk(id)
    if (!productId) {
      return res.status(404).json({
        status: 'fail',
        message: 'data tidak ditemukan',
      })
    }
    await product.update(
      {
        nama,
        harga,
      },
      {
        where: {
          id,
        },
      },
    )
    res.status(201).json({
      status: 'ok',
      message: 'updated product',
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'server down',
    })
  }
}

exports.destroyProduct = async (req, res) => {
  const { id } = req.params
  try {
    const productId = await product.findByPk(id)
    if (!productId) {
      return res.status(404).json({
        status: 'fail',
        message: 'data tidak ditemukan',
      })
    }
    await product.destroy({
      where: {
        id,
      },
    })
    res.status(200).json({
      status: 'ok',
      message: 'success delete',
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something wrong',
    })
  }
}
