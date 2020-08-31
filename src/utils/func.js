export const isNull = x => {
    return x !== null
}

export const getPageCount = (d, c) => {
    const x = isNull(d) ? d : []
    let pageCount = parseInt(x.length / c)
    if (x.length % c > 0) {
        pageCount++;
    }

    return pageCount
}
