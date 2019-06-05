module.exports = (app, passport, auth) => {

    const web = __dirname + '/web/'
    const css = web + 'css/'
    const html = web + 'html/'
    const js = web + 'js/'

    app.get(['/', 'login'], (req, res) => {
        if (req.originalUrl === '/') {
            res.sendFile(html + 'connexion.html')
            return
        }
        res.sendFile(html + req.path  + '.html')
    })

    app.post('/authenticate', passport.authenticate('local-login', {
        successRedirect: 'Defi.html',
        failureRedirect: '/Connexion.html?raté'
    }))

    app.get(['/welcome', '*.html'], auth.isLoggedInWeb, (req, res) => {
        res.sendFile(html + req.path)
    })

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    app.get('*.css', (req, res) => {
        res.sendFile(css + req.path)
    })
    
    app.get('*.html', (req, res) => {
        res.sendFile(html + req.path)
    })

    app.get('*.js', (req, res) => {
        res.sendFile(js + req.path)
    })

}