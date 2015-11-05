require('date-format-lite');

/*
 * This file is first imported by the outer protractor process. Setting the env
 * here results in it being set in all its child processes.
 */
if (!process.env.BUILDNAME) {
	process.env.BUILDNAME = new Date().format('D.M.YY h:mm');
}

exports.config = {
	// Run more error prone browsers first!
	multiCapabilities: [{
		'browser': 'IE',
		'browser_version': '10.0',
		'os': 'Windows',
		'os_version': '7'
	}, {
		'browser': 'IE',
		'browser_version': '11.0',
		'os': 'Windows',
		'os_version': '7'
	}, {
		'browser': 'Edge',
		'browser_version': '12.0',
		'os': 'Windows',
		'os_version': '10'
	}, {
		'browserName': 'android',
		'platform': 'ANDROID',
		'device': 'Samsung Galaxy S5'
	}, {
		'browser': 'Firefox',
		'browser_version': '41.0',
		'os': 'Windows',
		'os_version': '10'
	}, {
		'browser': 'Chrome',
		'browser_version': '46.0',
		'os': 'Windows',
		'os_version': '10'
	}].map(renameBrowser),
	maxSessions: 1,

	beforeLaunch: require('protractor/lib/driverProviders/browserstack').launchLocal(key()),
	afterLaunch: require('protractor/lib/driverProviders/browserstack').stopLocal(),

	browserstack: {
		local: true,
		key: key(),
		user: user(),
		reportResults: false,
		build: process.env.BUILDNAME,
		project: process.env.TRAVIS === 'true' ? 'Travis tests for ' + process.env.TRAVIS_REPO_SLUG : 'Local tests of ' + user(),
		name: 'behaviour test'
	},

	framework: 'mocha',
	specs: ['**/*.js']
};

function key() {
	return process.env.BROWSERSTACK_KEY || require('./.browserstackrc').key;
}

function user() {
	return process.env.BROWSERSTACK_USER || require('./.browserstackrc').user;
}

function renameBrowser(capability) {
	if (capability.browser && !capability.browserName) {
		capability.browserName = capability.browser;
		delete capability.browser;
	}
	return capability;
}