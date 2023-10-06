export const withoutProperty = function (obj, property) {  
    const { [property]: _, ...rest } = obj

  return rest
}