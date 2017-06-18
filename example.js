const Client = require('./')

const mongo = new Client({ db: 'example' })
const dudes = mongo.collection('dudes')

const dude = { name: 'Tiaan', surname: 'du Plessis' }
const otherDude = { name: 'Evan', surname: 'du Plessis' }
const anotherDude = { name: 'Paul', surname: 'du Plessis' }

// Save
dudes
  .save(dude)
  .then(res => {
    console.log(res)
    const id = res[0]._id.toString()
    dudes.find(id).then(console.log).catch(console.log)
    dudes.update(id, { surname: 'Du Plessis' }).then(console.log).catch(console.log)
  })
  .catch(console.log)
dudes.save([otherDude, anotherDude]).then(console.log).catch(console.log)

// Find
dudes.find({ name: 'Tiaan' }).then(console.log).catch(console.log)

dudes.find(
  {},
  {
    limit: 2,
    skip: 1,
    fields: ['name']
  }
)

// Count
dudes.count().then(console.log).catch(console.log)

// Update
dudes.update({ name: 'Paul' }, { surname: 'Du Plessis' }).then(console.log).catch(console.log)

// Remove
dudes.remove({ name: 'Evan' }).then(console.log).catch(console.log)
// dudes.remove().then(console.log).catch(console.log)
