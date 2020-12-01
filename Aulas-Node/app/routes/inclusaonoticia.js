module.exports = function(app){

    app.get('/incluirnoticia', function(req, res){
        res.render("admin/form_add_noticia");
    });

    app.post('/noticias/salvar', function(req, res){
        var noticia = req.body;
        
        req.assert('titulo', 'Titulo obrigatório').notEmpty();
        req.assert('resumo', 'Resumo obrigatório').notEmpty();
        req.assert('resumo', 'Resumo deve estar entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor', 'Autor obrigatório').notEmpty();
        req.assert('datanoticia', 'data obrigatório').notEmpty().isDate({ format: 'YYYY-MM-DD' });

        var errors = req.validationErrors();

        if(errors){
            console.log(errors);
            return;
        }
            

        var connection = app.config.dbcontext();
        var noticiasModel = new app.app.models.noticiasModel(connection);
    
        noticiasModel.cadastrarNoticia(noticia, function(error, result){
            res.redirect('/noticias');
        });
    });
}
