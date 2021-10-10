const tempList = [
  {
    id: '17',
    status: 'accepted',
    donor: 'Anja',
    description: 'laptop',
    date: '19/9/2021',
    itemCount: 1
  },
  {
    id: '23',
    status: 'accepted',
    donor: 'Anja',
    description: 'laptop',
    date: '19/9/2021',
    itemCount: 1
  }
]

const Donations = () => ({
  list: () => tempList,
  details: id => tempList.find(it => it.id === id)
})

export { Donations }
