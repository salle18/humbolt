/*
 The build is provided by the Modern Web Dev Build: https://github.com/dsebastien/modernWebDevBuild
 */
"use strict";

import gulp from "gulp";
import typedoc from "gulp-typedoc";

import modernWebDevBuild from "modern-web-dev-build";
let options = {};

options.minifyProductionHTML = false; // HTML minification is not supported by Angular 2 anymore: https://github.com/dsebastien/modernWebDevBuild/issues/67

modernWebDevBuild.registerTasks(gulp, options);

gulp.task("docs", function () {
	return gulp
		.src(["app/**/*.ts"])
		.pipe(typedoc({
			module: "commonjs",
			target: "es5",
			out: "docs/",
			name: "Humbolt Client",
			experimentalDecorators: true
		}));
});
