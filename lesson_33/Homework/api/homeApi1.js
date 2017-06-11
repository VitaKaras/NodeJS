var path = require('path')

var todos = [
    {id: 1, name: 'Work', description: 'Stuff to do'}, {
        id: 2,
        name: 'Walk the dog',
        description: 'Need to get up early'
    },
    {id: 3, name: 'Finish project', description: 'An important task'}, {
        id: 4,
        name: 'Earn a lot of money',
        description: 'As soon as possible'
    },
    {id: 5, name: 'Go to sleep', description: 'late at night'}
]
var table_rows = ""
var tableIns = function () {
    for (i = 0; i <= todos.length - 1; i++) {

        table_rows +=  (`<tr>
<td>${todos[i].id}</td>
<td>${todos[i].name}</td>
<td>${todos[i].description}</td>
</tr>`)

    }
}
module.exports = {
    table: function (req, res) {
        res.send(path.join(__dirname, './../views/index.html'))
        document.getElementsByTagName('tbody')[0]=table_rows;
    }
}