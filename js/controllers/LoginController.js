angular.module('Come2HelpController')
	.controller('LoginController', ['Abilities', '$route', '$auth', '$window', function(Abilities, $route, $auth, $window) {
		var vm = this;

		vm.errors = null;
		vm.user = {};
		vm.isSignup = false;

		Abilities.query(function(data) {
			vm.abilities = data;
		});

		vm.startSignup = function() {
			vm.isSignup = true;
			$window.document.getElementById('email').focus();
		};

		vm.submit = function() {
			if (vm.isSignup) {
				signup();
			} else {
				login();
			}
		};

		vm.authenticate = function(provider) {
			$auth.authenticate(provider)
				.then(handleResponse)
				.catch(handleError);
		};

		function login() {

			// user transport object
			var transUser = {
				email: vm.user.email || '',
				password: vm.user.password || ''
			};

			$auth.login(transUser)
				.then(handleResponse)
				.catch(handleError);
		};

		function signup() {
			alert('signup');

			// abilities transport array
			var transAbilities = [];
			for (var abilityId in vm.user.abilities) {
				if (vm.user.abilities.hasOwnProperty(abilityId) && vm.user.abilities[abilityId] === true) {
					transAbilities.push({
						id: parseInt(abilityId)
					});
				}
			}

			// user transport object
			var transUser = {
				abilities: transAbilities,
				address: {
					zipCode: vm.user.zipCode || ''
				},
				adult: vm.user.adult === true,
				email: vm.user.email || '',
				givenName: vm.user.givenName || '',
				phone: vm.user.phone || '',
				surname: vm.user.surname || ''
			};

			$auth.signup(transUser)
				.then(handleResponse)
				.catch(handleError);
		};

		function handleResponse(response) {
			var token = response.data.token;
			if (!token) {
				throw new Error('The server sent an unintelligible response!');
			}
			$auth.setToken(response.data.token);
			$route.reload();
		}

		function handleError(response) {
			vm.errors = {};

			if (response.data.clientErrors) {
				vm.errors.badData = true;
				for (var i = 0; i < response.data.clientErrors.length; i++) {
					var errorData = response.data.clientErrors[i];
					vm.errors[errorData.path] = true;
				}
			} else {
				vm.errors.message = response.data;
			}
		}
	}]);