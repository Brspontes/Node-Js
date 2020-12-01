module.exports = function(app){

    app.get('/incluirnoticia', function(req, res){
        res.render("admin/form_add_noticia");
    });

    app.post('/noticias/salvar', function(req, res){
        var connection = app.config.dbcontext();
        var noticiasModel = new app.app.models.noticiasModel(connection);
        
        var noticia = req.body;

        noticiasModel.cadastrarNoticia(noticia, function(error, result){
            res.redirect('/noticias');
        });
    });
}
