/**
* Dependencies.
*/
var Hapi = require("hapi"),
    Async = require('async'),
    gulp = require("gulp"),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

//load config
var config = require('./server/config');

// assets is where you define your application assets and you can pass them into gulp.
var assets = require('./server/config/assets');

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new util.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}

// the default task that is run with the command 'gulp'
gulp.task('default', function(){

    // change the working directory to the public folder, where your assets are located.
    var gulpFileCwd = __dirname +'/public';
    process.chdir(gulpFileCwd);

    // print the working directory
    util.log('Working directory changed to', util.colors.magenta(gulpFileCwd));

    // concat and minify your css
    gulp.src(assets.development.css)
        .pipe(concat("styles.min.css"))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));

    // concat and minify your js
    gulp.src(assets.development.js)
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));

    // optimize your images
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images/'));
});

gulp.task('static', function(){

    gulp.src('./public/**').pipe(gulp.dest('./static'));

    var server = Hapi.createServer(config.host, config.port, config.hapi.options);
        
    server.pack.register([{ plugin: require("./index") }], function(err) {

        var options = {
            method: "GET",
            url: "/"
        };
     
        server.inject(options, function(response) {

            var result = response.result;

            string_src("index.html", result).pipe(gulp.dest('./static/'));

            //console.log(result);
        });
    });

    server.stop();
})