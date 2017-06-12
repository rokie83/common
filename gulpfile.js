const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const bump = require('gulp-bump');
const shell = require('gulp-shell');
const git = require('gulp-git');
const gutil = require("gulp-util");
const argv = require('yargs').argv;
const runSequence = require('run-sequence');
const conventionalChangelog = require('gulp-conventional-changelog');
const ngc = require('@angular/compiler-cli/src/main').main;
const inlineResources = require('./scripts/inline-resources');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');



const rootDir = './src/common';

const includedFiles = [
    'src/common/README.md',
    'src/common/package.json'
];

/**
 *  Run the Angular compiler, ngc. This will output all
 *  compiled modules to the /dist folder.
 */
gulp.task('ngc', () => {
    return ngc({
        project: `${rootDir}/tsconfig.aot.json`
    });
});

/**
 *  Copy all relevant resource files.
 */
gulp.task('copy-files', () => {
    return gulp.src(includedFiles)
        .pipe(gulp.dest('dist'));
});

/**
 *  Copy html files into dist/components.
 */
gulp.task('copy-html', () => {
    return gulp.src('src/common/components/**/*.html')
        .pipe(gulp.dest('dist/components'));
});

/**
 *  Compile scss into css and copy those files into dist/components.
 */
gulp.task('compile-scss-copy-css', () => {
    return gulp.src('src/common/components/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/components'));
});

/**
 *  Inline template (.html) and style (.css) files into the the component .ts files.
 */
gulp.task('inline-resources', () => inlineResources('dist/components'));


let semRelease = () => {

    let version;
    switch (argv.type) {
        case 'major':
            return version = 'major';
            break;
        case 'minor':
            return version = 'minor';
            break;
        case 'patch':
            return version = 'patch';
            break;
        default:
            console.log(`
        🦄  🌈     PLEASE ADD A SEMVER RELEASE TYPE    🌈  🦄

        Following flags are valid
        
        gulp release    
            
            --type=major        💥  A RELEASE WITH BREAKING CHANGES                    
            --type=minor        ✨  A FEATURE RELEASE WITHOUT BREAKING CHANGES  
            --type=patch        🐞  A BUGFIX RELEASE

            `);
            return false;
    }
};

/**
 * Parse the relevant package.json for the version
 */
let getPackageJsonVersion = () => {
    return JSON.parse(fs.readFileSync(`${rootDir}/package.json`, 'utf8')).version;
};

/**
 * Execute linting and testing tasks to validate the package
 */
gulp.task('validate', shell.task([
    'npm run validate'
]));

/**
 * Update package.json version depending on argument
 */
gulp.task('update-packagejson', () => {
    if (semRelease()) {
        return gulp.src(`${rootDir}/package.json`)
            .pipe(bump({type: semRelease()}))
            .pipe(gulp.dest(rootDir));
    } else {
        throw new gutil.PluginError({
            plugin: 'semRelease()',
            message: 'A SemVer Release Type was not provided!'
        })
    }
});

/**
 *  Deletes the dist directory
 */
gulp.task('clean', () => {
    return del('dist/**', {force: true});
});

/**
 * Publish package to npm
 */
gulp.task('npm-publish', shell.task([
    'cd dist && npm publish --access=public'
]));

/**
 * Generate changelog based on the
 * conventional changelog package (https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)
 */
gulp.task('write-changelog', () => {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
        .pipe(conventionalChangelog({
            pkg: {path: rootDir},
            preset: 'angular',
            releaseCount: 0,
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Commit changes for the release
 */
gulp.task('commit-changes', () => {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(`[RELEASE] ${getPackageJsonVersion()}`));
});

/**
 * Read new release version from package.json
 * and push version tag to master branch
 */
gulp.task('create-new-tag', (cb) => {
    let version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, (error) => {
        if (error) {
            return cb(error);
        }
    });
    git.push('origin', 'master', {args: '--tags'}, cb);
});

/**
 * Push changes to master branch
 */
gulp.task('push-changes', (cb) => {
    git.push('origin', 'master', cb);
});

gulp.task('finished', () => {
    console.log(`
    
    🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉   You just successfully released ${getPackageJsonVersion()}   🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉

    `);
});

gulp.task('release', () => {
    runSequence(
        'validate',
        'update-packagejson',
        'clean',
        'ngc',
        'copy-files',
        'copy-html',
        'compile-scss-copy-css',
        'inline-resources',
        'npm-publish',
        'write-changelog',
        'commit-changes',
        'create-new-tag',
        'push-changes',
        'finished'
    )
});


gulp.task('build', () => {
    runSequence(
        'validate',
        'clean',
        'ngc',
        'copy-files',
        'copy-html',
        'compile-scss-copy-css',
        'inline-resources'
    )
});

