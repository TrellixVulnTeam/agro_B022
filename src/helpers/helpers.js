export const nameTheWrhsType = function (wrhs, types) {
  let name = ''
  types.forEach(wrhts => {
    if (wrhs.warehouses_type_id == wrhts.id) {
      name = wrhts.name
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
