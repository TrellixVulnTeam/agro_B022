export const nameTheWrhsType = function (wrhs, types) {
  let name = ''
  types.forEach(wrhts => {
    if (wrhs.warehouses_type_id == wrhts.id) {
      name = wrhts.name
    }
  })
  return name
}