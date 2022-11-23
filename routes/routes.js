function SpazaRouters(dataFactory, db){
    async function defaultRoute(req,res){
        res.render('index',{
            townships: await dataFactory.areas()
        }
        )
    }
    async function registerRoute(req,res){
        res.render('register',{
            townships: await dataFactory.areas()
        })
    }
    async function loginRoute(req, res){
        res.render('login')
    }
    async function PostSuggestion(req, res){

    }


    return {
        defaultRoute,
        PostSuggestion,
        registerRoute,
        loginRoute
    }

}

export default SpazaRouters;