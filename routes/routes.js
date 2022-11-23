function SpazaRouters(dataFactory, db) {

    async function defaultRoute(req, res) {
        res.render('index')
    }
    async function suggestRoute(req, res) {
        res.render('suggestions', {
            townships: await dataFactory.areas(),
        })
    }
    async function registerRoute(req, res) {
        res.render('register', {
            townships: await dataFactory.areas()
        })
    }
    async function regClient(req, res) {
        const userName = req.body.username;
        if (userName !== '') {
            const regUser = await dataFactory.registerClient(userName);
            req.flash('error', `Here is your password::${regUser}`);
            res.redirect('back')
        } else {
            req.flash('error', 'Please ensure that you fill in all fields');
            res.redirect('back')
        }
    }

    async function Login(req, res) {
        const password = req.body.password;
        if (password !== '') {
            const enter = await dataFactory.clientLogin(password);
            let sessionCode = enter.id
             req.session.code =  sessionCode;
            res.redirect('/suggestions');
        } else {
            req.flash('error', 'Invalid password');
            res.redirect('back')
        }
    }
    async function loginRoute(req, res) {
        res.render('login')
    }
    async function PostSuggestion(req, res) {
        const areaID = req.body.townships;
        const suggest = req.body.comment;
        let sessionId = req.session.code;
        try {
            await dataFactory.suggestProduct(areaID, sessionId, suggest);
            let data = await dataFactory.suggestions(sessionId);
            res.redirect('back')
            res.render('suggestions',{
                data
            })
        } catch (error) {
            console.log('Bug', error)

        }

    }


    return {
        defaultRoute,
        PostSuggestion,
        registerRoute,
        loginRoute,
        regClient,
        Login,
        suggestRoute
    }

}

export default SpazaRouters;