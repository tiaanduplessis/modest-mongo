const Client = require('../')

test('should be new client', () => {
  expect(Client).toBeDefined()
  expect(new Client({ db: 'test' })).toBeInstanceOf(Client)
})
