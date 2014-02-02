module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["public/js/app.min.js", ".tmp"],

        browserify: {
            dist: {
                files: {
                    '.tmp/scripts/app.js': ['app/scripts/main.js'] //, 'app/scripts/app/**/*.js']
                }
            }
        },

        uglify: {
            options: {
            },
            dist: {
                files: {
                    'public/js/app.min.js': ['app/scripts/vendor/*.js', '.tmp/scripts/app.js']
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
        }
    });

    grunt.registerTask('build', ['browserify', 'uglify', 'less']);
    grunt.registerTask('default', 'build');
};
