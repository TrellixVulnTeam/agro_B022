export const nameTheWrhsType = function (wrhs, types) {
  let name = ''
  types.forEach(wrhts => {
    if (wrhs.warehouses_type_id == wrhts.id) {
      name = wrhts.name
      console.log(name)
    }
  })
  return name
}

export const nameTheGrdnsType = function (garden, types) {
  let name = ''
  types.forEach(type => {
    if (garden.garden_type_id == type.id) {
      name = type.name
      console.log(name)
    }
  })
  return name
}

export const nameTheLandingSchemas = function (block, landing_schemas) {
  let landing_schema_name = ''
  landing_schemas.forEach(schema => {
    if (block.landing_schemas_id == schema.id) {
      landing_schema_name = schema.name
    }
  })
  return landing_schema_name
}
