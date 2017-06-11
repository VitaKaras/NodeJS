var users = [
    {name: 'Jane', age: 23}, {name: 'John', age: 30}, {name: 'Vasya', age: 25},
    {name: 'Yvonne', age: 34}, {name: 'Will', age: 18}, {name: 'Jack', age: 26}
]
module.exports = {
    get: function (req, res) {
        res.send(users)

    },
    post: function (req,res) {
        users.push('{name:"Another Name", age: 30}')
        console.log('{name:"Another Name", age: 30}')

    },
    put:function (req, res) {
        users[req.params.index].name='Updated Name ';
        users[req.params.index].age='Some new value';
        console.log('updated: '+ users[req.params.index].name+ users[req.params.index].age)
        res.send('updated: '+ users[req.params.index]);
    },
    delete: function (req, res) {
        console.log('deleted: '+ users[req.params.index].name+ users[req.params.index].age)
        users.splice(req.params.index, 1)
        res.send('deleted: '+ users[req.params.index].age+" "+  users[req.params.index].name);
    }
    
}