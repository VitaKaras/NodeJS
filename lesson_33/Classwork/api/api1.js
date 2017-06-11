module.exports = {
    ShowHeaders: function (req, res) {
        res.send(req.headers)

    },
    ShowBody: function (req, res) {
        res.send(req.body)
        console.log(req.body)
    }

}