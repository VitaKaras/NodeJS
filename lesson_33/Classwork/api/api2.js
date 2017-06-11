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

    }
}