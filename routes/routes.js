function SpazaRouters(dataFactory, db){
    async function defaultRoute(req,res){
        res.render('index',{
            townships: await dataFactory.areas()
        }
        )

    }
    return {
        defaultRoute
    }

}

export default SpazaRouters;