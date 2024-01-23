exports.extractFields = (line) => {
  const order_id = Number(line.substring(55, 65).trim())

  let date = line.substring(87, 95).trim()
  const dateFormatted = this.date(date)

  const user_id = Number(line.substring(0, 10).trim())
  const userName = line.substring(10, 55).trim()

  const product_id = Number(line.substring(65, 75).trim())
  const value = Number(line.substring(75, 87).trim())

  return {
    order_id,
    date: dateFormatted,
    user_id,
    userName,
    product_id,
    value,
  }
}

exports.date = (date) => {
  const year = parseInt(date.substring(0, 4))
  const month = parseInt(date.substring(4, 6)) - 1
  const day = parseInt(date.substring(6, 8))

  return new Date(year, month, day)
}
