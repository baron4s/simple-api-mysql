const asyncHandler = require('../middleware/asyncHandler')
const { Category } = require('../models')
const category = require('../models/category')

exports.getAllCategory = async (req, res) => {
  const datas = await Category.findAll()
  res.status(200).json({
    status: 'success',
    message: 'ok',
    datas,
  })
}

exports.getDetailCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await Category.findByPk(id)
  if (!data) {
    res.status(404)
    throw new Error('kategori tidak ditemukan')
  }
  res.status(200).json({
    status: 'success',
    message: 'ok',
    data,
  })
})

exports.storeCategory = asyncHandler(async (req, res) => {
  const { nama, description } = req.body
  const category = await Category.create({ nama, description })
  res.status(201).json({
    status: 'success',
    message: 'berhasil menambah kategori',
    data: {
      id: category.id,
      nama: category.nama,
      description: category.description,
    },
  })
})

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { nama, description } = req.body
  const categoryId = await Category.findByPk(id)
  if (!categoryId) {
    res.status(404)
    throw new Error('kategori tidak ditemukan')
  }
  await Category.update(
    {
      nama,
      description,
    },
    {
      where: {
        id,
      },
    },
  )
  res.status(201).json({
    status: 'success',
    message: 'updated product',
  })
})

exports.destroyCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const categoryId = await Category.findByPk(id)
  if (!categoryId) {
    res.status(404)
    throw new Error('kategori tidak ditemukan')
  }
  await Category.destroy({
    where: {
      id,
    },
  })
  res.status(201).json({
    status: 'success',
    message: 'berhasil menghapus kategori',
  })
})
