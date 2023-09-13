"use strict";

const userForm = new UserForm();

function loginFormCallback(data) {

	ApiConnector.login(data, (response) => {
		if (response.success) {

			location.reload();
		} else {

			userForm.setLoginErrorMessage(response.error);
		}
	});
}


userForm.loginFormCallback = loginFormCallback;


function registerFormCallback(data) {

	ApiConnector.register(data, (response) => {
		if (response.success) {

			location.reload();
		} else {

			userForm.setRegisterErrorMessage(response.error);
		}
	});
}

userForm.registerFormCallback = registerFormCallback;