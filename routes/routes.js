function SpazaRouters(dataFactory, db){
    async function defaultRoute(req,res){
        res.render('index',{
            townships: await dataFactory.areas()
        }
        )
    }
    async function registerRoute(req,res){
        res.render('register')
    }
    async function PostSuggestion(req, res){

    }


    return {
        defaultRoute,
        PostSuggestion,
        registerRoute
    }

}

export default SpazaRouters;