module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({

        clean: ["public/js/app.min.js", "public/css/app.css", "public/index.html", ".tmp"],

        browserify: {
            dist: {
                src: [ 'app/scripts/**/*.js', 'app/scripts/**/*.coffee' ],
                dest: '.tmp/scripts/app.js',
                options: {
                    transform: ['coffeeify']
                }
            }
        },

        uglify: {
            options: {
            },
            dist: {
                files: {
                    'public/js/app.min.js': ['app/vendor/scripts/*.js', '.tmp/scripts/app.js']
                }
            }
        },

        less: {
            dist: {
                options: {
                    paths: ["app/styles"],
                    cleancss: true,
                    compress: true,
                    ieCompat: false
                },
                files: {
                    "public/css/app.css": "app/styles/app.less"
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 8000,
                    base: 'public'
                }
            }
        },

        watch: {
            files: ['app/**/*'],
            tasks: ['build']
        },

        jade: {
            compile: {
                options: {
                    data: function(dest, src) {
                        return require('package.json');
                    }
                },
                files: {
                    "public/index.html": ["app/views/index.jade"]
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'public'
            },
            src: '**/*'
        }

    });

    grunt.registerTask('build', ['browserify', 'uglify', 'less', 'jade']);
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

    grunt.registerTask('default', 'serve');
};
