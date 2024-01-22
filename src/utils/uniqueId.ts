export const uniqueId = (preId: string, prefix = 'id-' ): string => {
    let temp = ''
    if(!preId || preId === null) temp = '0'
    temp = preId.replace(prefix, '')
    const newId = prefix + (1 + parseInt(temp))
    return newId
}