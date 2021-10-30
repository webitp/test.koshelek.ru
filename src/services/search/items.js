const condition = (search, item) => {
  return item.name.toLowerCase().split(search.toLowerCase()).length - 1
}

export default {
  sort: (items) => {
    return items.sort((prev, current) => current.entry - prev.entry)
  },

  search: (search, list) => {
    if (search != '') {
      const items = list.map((item) => {
        item.items.map((child) => {
          child.entry = condition(search, child)
          return child
        })

        const itemsEntries = item.items.length ? item.items.reduce((prev, current) => prev.entry + current.entry) : 0
        item.entry = condition(search, item) + (itemsEntries ? itemsEntries.entry : 0)

        return item
      })

      return items.filter(e => e.entry)
    }
    return list;
  }
}