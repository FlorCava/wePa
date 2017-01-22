class Tools {
  constructor (req, res) {
    Object.assign(this, {
      req,
      res
    })
  }

  setJson (status = 200, code = 0, message, data) {
    this.res.status(status)
    return this.res.json({
      meta: {
        code: code,
        message: message || null
      },
      data: data || null
    })
  }
}

module.exports = Tools