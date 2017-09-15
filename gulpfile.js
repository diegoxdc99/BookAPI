var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    open = require('gulp-open'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('open', function(){  //abre el navegador
    var options = {
    uri: 'http://localhost:8000'
  };
  gulp.src('')
  .pipe(open(options));
});

gulp.task('default', ['open'], function(){
    nodemon({
        script: 'app.js',   //que va a correr
        ext: 'js',    //que extenciones va a ver
        env: {          //variables de ambiente
            PORT: 8000    
        },
        ignore: ['./node_modules/**'] //ignora archivos
    })
    .on('restart', function(){
        console.log('Restarting')
    });
});

gulp.task('test', function(){    
    env({vars: {ENV: 'Test'}});
    gulp.src('Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});

