module.exports = function(app){
    app.get('/noticiadetalhe', function(req, res){
        
        var connection = app.config.dbcontext();
        var noticiasModel = new app.app.models.noticiasModel(connection);

        noticiasModel.getNoticia(function(error, result){
            res.render("noticias/noticia", { noticia: result });
        });
    });
};

