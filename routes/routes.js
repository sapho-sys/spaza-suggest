// import express from "express";
// import ShortUniqueId from "short-unique-id";
// const uid = new ShortUniqueId({ length: 5 });
function SpazaRouters(dataFactory, db){
    // var code = '';
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
    async function regClient(req, res){
        const userName = req.body.username;
        if(userName !== ''){ 
            const regUser = await dataFactory.registerClient(userName);
             console.log(`Here is the code`, regUser);
             req.flash('error', `Here is your password::${regUser}`);
             res.redirect('back')
        }else{
            req.flash('error', 'Please ensure that you fill in all fields');
            res.redirect('back')
        }
    }

    async function Login(req, res){
        const password = req.body.password;
        if(password !== ''){
            const enter = await dataFactory.clientLogin(password);
            console.log('Here is the client', enter);
            req.session.enter = enter;
            res.redirect('/');
        }else{
            req.flash('error', 'Invalid password');
            res.redirect('back')
        }
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
        loginRoute,
        regClient,
        Login
    }

}

export default SpazaRouters;