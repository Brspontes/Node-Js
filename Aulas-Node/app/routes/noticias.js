const dbcontext = require('../../config/dbcontext');
var dbContext = require('../../config/dbcontext');

module.exports = function(app){
    app.get('/noticias', function(req, res){
        
        var connection = dbcontext();

        connection.query('select * from noticias', function(error, result){
            console.log(error);
            console.log(result);

            res.render("noticias/noticias", { noticias: result });
        });
    });
};

