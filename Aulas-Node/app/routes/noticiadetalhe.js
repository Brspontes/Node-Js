module.exports = function(app){
    app.get('/noticiadetalhe', function(req, res){
        
        var connection = app.config.dbcontext();
        var noticiasModel = app.app.models.noticiasModel();

        noticiasModel.getNoticia(connection, function(error, result){
            res.render("noticias/noticia", { noticia: result });
        });
    });
};

