function NotFoundHandler(app) {
    app.use((req, res, next) => {
        res.status(404).json({
            message: 'not found route'
        })
    })
}

module.exports = NotFoundHandler;