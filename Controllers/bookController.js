var bookController = function(Book){
    var post = function(req, res){
        var book = new Book(req.body); // se crea un objeto con la petición

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else{
            book.save(); //se guarda
            res.status(201);// 201 significa que se creo
            res.send(book); //se puede hacer en cadena pero por el mock se separa
        }        
    };

    var get = function(req, res){
        var query = {}; 
        if(req.query.genre){ // validación de los parametros para que no pongan cualquier cosa
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books){
            if (err)
                res.status(500).send(err);
            else {
                var returnBooks = [];
                books.forEach(function(element, index, array) {
                    var newBook = element.toJSON();   
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
                
        });        
    };

    return {
        post: post,
        get: get
    }
}

module.exports = bookController;