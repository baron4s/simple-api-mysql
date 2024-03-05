const errorHandler = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.errors || err.name == 'sequelizeValidationError') {
    const errorList = err.errors.map((err) => {
      let obj = {}
      obj[err.path] = err.message
      return obj
    })
    message = errorList
    statusCode = 400
  }

  res.status(statusCode).json({
    message,
    stack: err.stack,
  })
}

module.exports = errorHandler
