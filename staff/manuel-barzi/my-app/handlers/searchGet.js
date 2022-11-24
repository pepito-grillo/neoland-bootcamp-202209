const retrieveUser = require('../logic/retrieveUser')
const searchHttpCats = require('../logic/searchHttpCats')
const renderPage = require('./helpers/renderPage')

module.exports = (req, res) => {
    const { cookie } = req.headers // id=user-2

    if (!cookie) {
        res.redirect('/login')

        return
    }

    const [, userId] = cookie.split('=')

    try {
        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(500)
                res.send(error.message)

                return
            }

            const { q } = req.query

            searchHttpCats(q, (error, cats) => {
                if (error) {
                    res.status(500)
                    res.send(error.message)

                    return
                }

                res.status(200)
                res.setHeader('Content-Type', 'text/html')
                res.send(renderPage(`hello ${user.name}!
                    <form action="/logout" method="post">
                        <button>Logout</button>
                    </form>
                    <form action="/search">
                        <input type="text" name="q" value="${q}">
                        <button>Search</button>
                    </form>
                    <h1>Results</h1>
                    <ul>
                        ${cats.reduce((lis, cat) => {
                    return lis + `<li>
                                <img src="${cat.imageUrl}" />
                                <h2>${cat.code}</h2>
                                <p>${cat.text}</p>
                            </li>`
                }, '')}
                    </ul>`))
            })
        })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}