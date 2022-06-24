const UsersController = require('../controllers/users.controller')

module.exports = (app) => {
    app.post('/create', UsersController.createUser)
    app.get('/employees', UsersController.getUsers)
    app.get('/employees/:id', UsersController.getUserById)
    app.put('/employees/:id', UsersController.updateUserById)
    app.delete('/employees/delete/:id', UsersController.deleteUserById)
}