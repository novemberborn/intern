/* jshint node:true, es3:false */
if (typeof process !== 'undefined' && typeof define === 'undefined') {
	(function () {
		require('dojo/loader')((this.__internConfig = {
			baseUrl: process.cwd(),
			packages: [
				{ name: 'intern', location: __dirname }
			],
			map: {
				intern: {
					dojo: 'intern/node_modules/dojo',
					benchmark: 'intern/node_modules/benchmark/benchmark',
					chai: 'intern/node_modules/chai/chai',
					diff: 'intern/node_modules/diff/diff',
					lodash: 'intern/node_modules/lodash-amd/main',
					platform: 'intern/node_modules/platform/platform'
				},
				'*': {
					'intern/dojo': 'intern/node_modules/dojo'
				}
			}
		}), [ 'intern/client' ]);
	})();
}
else {
	define([
		'./lib/executors/PreExecutor',
		'dojo/has!host-node?./lib/exitHandler'
	], function (PreExecutor, exitHandler) {
		var executor = new PreExecutor({
			defaultLoaderOptions: (function () {
				return this;
			})().__internConfig,
			executorId: 'client'
		});

		var promise = executor.run();

		if (exitHandler) {
			exitHandler(process, promise, 10000);
		}
	});
}
