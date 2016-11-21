var gulp = require("gulp"), 
watch = require("gulp-watch"), 
autoprefixer = require("autoprefixer"), 
postcss = require("gulp-postcss"), 
cssImport = require("postcss-import"), 
cssNested = require("postcss-nested"), 
cssVars = require("postcss-simple-vars"),
browserSync = require("browser-sync").create();


gulp.task('html', function(){
        browserSync.reload();
});


gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});
    
//   .pipe(postcss([cssImport, autoprefixer, cssNested, cssVars]))


gulp.task("watch", function(){
    
    browserSync.init({
       server: {
           baseDir: "app"
       } 
    });
 
    watch('./app/index.html', function(){
     gulp.start("html");
     
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start("cssInject");
        
        }); 
     
 });
});


gulp.task("cssInject", ['styles'], function(){
   return gulp.src('./app/temp/styles/styles.css') 
   .pipe(browserSync.stream());
});