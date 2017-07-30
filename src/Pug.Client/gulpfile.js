/// <binding AfterBuild='build-dev' ProjectOpened='dev-server' />
var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var del = require("del");
var browserSync = require("browser-sync").create();
var args = require("yargs").argv;

var config = require("./gulp.config")();
var tsProject = $.typescript.createProject("tsconfig.json");

var karmaServer = require("karma").Server;
var karmaRunner = require("karma").runner;

gulp.task("clean-styles", function () {

    log("Cleaning styles from output");

    return del(config.styles.output + config.all.css);
});

gulp.task("styles", ["clean-styles"], function () {

    log("Compiling general styles into sass and adding them to the output");

    return gulp.src(config.styles.sass)
        .pipe($.sass().on("error", $.sass.logError))
        .pipe(gulp.dest(config.styles.output))
        .pipe(browserSync.stream());
});

gulp.task("clean-typescript", function () {

    log("Cleaning typescript from output");

    return del([
        config.app.output + config.all.js,
        config.app.output + config.all.jsMaps
    ]);

});

gulp.task("lint-typescript", function () {

    log("Checking Typescript Code Quality");

    return gulp.src(config.app.typescript)
        .pipe($.tslint({
            formatter: "verbose"
        }))
        .pipe($.tslint.report());

});

gulp.task("typescript", ["clean-typescript", "lint-typescript"], function () {

    log("Compiling typescript and adding them to the output");

    var tsSource = [
        config.app.typescript,
        config.typings
    ];

    return gulp.src(tsSource)
        .pipe($.sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(config.app.output));

});

gulp.task("sync-typescript", ["typescript"], function () {
    runKarmaTests();
    browserSync.reload();
});

gulp.task("clean-templates", function () {

    log("Cleaning templates from output");

    return del(config.app.output + config.all.html);

});

gulp.task("templates", ["clean-templates"], function () {

    log("Copying templates to output");

    return gulp.src(config.app.templates)
        .pipe(gulp.dest(config.app.output));

});

gulp.task("sync-templates", ["templates"], function () {
    runKarmaTests();
    browserSync.reload();
});

gulp.task("clean-component-styles", function () {

    log("Cleaning angular styles from output");

    return del(config.app.output + config.all.css);

});

gulp.task("component-styles", function () {

    log("Compiling and copying angular styles to output");

    return gulp.src(config.app.styles)
        .pipe($.sass({
            includePaths: [config.styles.imports]
        }))
        .pipe(gulp.dest(config.app.output));

});

gulp.task("sync-component-styles", ["component-styles"], function () {
    browserSync.reload();
});

gulp.task("clean-dynamic-libs", function () {

    log("Cleaning angular files from output");

    return del([
        config.libs.output + "@angular",
        config.libs.output + "rxjs",
        config.libs.output + "@ngx-translate"
    ]);

});

gulp.task("dynamic-libs", ["clean-dynamic-libs"], function () {

    log("Copying dynamic library files to output");

    return gulp.src(config.libs.dynamicSrc, { base: "./node_modules/" })
        .pipe(gulp.dest(config.libs.output));

});

gulp.task("clean-libs", function () {

    log("Cleaning libs from output");

    return del([
        config.libs.output + "**/*",
        "!" + config.libs.output + "@angular/**/*",
        "!" + config.libs.output + "@angular",
        "!" + config.libs.output + "rxjs",
        "!" + config.libs.output + "@ngx-translate"
    ]);

});

gulp.task("libs", ["dynamic-libs", "clean-libs"], function () {

    log("Copying libs to output");

    var libs = gulp.src(config.libs.src);

    var libsCopyStream = libs
       .pipe(gulp.dest(config.libs.output));

    //Inject the libs here so they are in the correct order
    return gulp.src(config.index)
        .pipe($.inject(libsCopyStream,
        {
            ignorePath: "wwwroot/",
            name: "libs"
        }))
        .pipe(gulp.dest(config.home));

});

gulp.task("clean-fonts", function () {

    log("Cleaning fonts from output");

    del(config.fonts.output + "**/*");

});

gulp.task("fonts", ["clean-fonts"], function () {

    log("Copying fonts to output");

    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.output));

});

gulp.task("test", ["typescript", "templates", "component-styles"], function (done) {
    log("Testing clientside code");

    new karmaServer({
        configFile: __dirname + "/" + config.karmaConfig,
        singleRun: true
    }, done).start();
});

gulp.task("build-dev", ["libs", "typescript", "styles", "templates", "component-styles", "fonts", "test"], function () {

    log("Building for development");

    var sources = gulp.src(config.styles.output + config.all.css, { read: false });

    return gulp.src(config.index)
        .pipe($.inject(sources, { ignorePath: "wwwroot/" }))
        .pipe(gulp.dest(config.home));
});

gulp.task("dev-server", function () {

    log("Starting up Browsersync server");

    if (browserSync.active) {
        return;
    }

    browserSync.init({
        proxy: "localhost:" + config.port,
        port: 3000,
        ghostMode: {
            click: true,
            scrolling: true,
            location: false,
            forms: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: "info",
        logPrefix: "Assessment Playground",
        notify: true,
        open: false
    });

    gulp.watch(config.styles.sass, { cwd: "./" }, ["styles"]);
    gulp.watch(config.app.typescript, { cwd: "./" }, ["sync-typescript"]);
    gulp.watch(config.app.templates, { cwd: "./" }, ["sync-templates"]);
    gulp.watch(config.app.styles, { cwd: "./" }, ["sync-component-styles"]);

    log("Starting up Karma server");

    new karmaServer({
        configFile: __dirname + "/" + config.karmaConfig,
        singleRun: false
    }).start();
});

function log(message) {
    $.util.log($.util.colors.yellow(message));
}

function runKarmaTests() {
    karmaRunner.run({ port: 9876 }, function () { });
}
