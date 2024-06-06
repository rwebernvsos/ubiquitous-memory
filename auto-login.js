// ==UserScript==
// @name         Auto Login for SilverFlume
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically log in when logged out for different environments
// @match        https://nvsilverflumetest.nv.gov/login*
// @match        https://www.nvsilverflume.gov/login*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/auto-login.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/auto-login.js
// ==/UserScript==

(function() {
    'use strict';

    const environments = {
        'nvsilverflumetest.nv.gov': 'test',
        'www.nvsilverflume.gov': 'prod'
    };

    const currentHost = window.location.host;
    const currentEnv = environments[currentHost];

    // Function to set credentials
    function setCredentials() {
        const user = prompt(`Enter your username for ${currentEnv}:`);
        const pass = prompt(`Enter your password for ${currentEnv}:`);
        GM_setValue(`username_${currentEnv}`, user);
        GM_setValue(`password_${currentEnv}`, pass);
    }

    // Register Tampermonkey menu command
    GM_registerMenuCommand('Set Credentials', setCredentials);

    // Get credentials
    const username = GM_getValue(`username_${currentEnv}`);
    const password = GM_getValue(`password_${currentEnv}`);

    function autoLogin() {
        const loginForm = document.querySelector('form[action="/j_spring_security_check"]');
        if (loginForm) {
            console.log('Login form found'); // Logging

            const usernameInput = document.querySelector('input[name="j_username"]');
            const passwordInput = document.querySelector('input[name="j_password"]');
            const submitButton = document.querySelector('button#submit');

            if (usernameInput && passwordInput && submitButton) {
                usernameInput.value = username;
                passwordInput.value = password;

                console.log('Filled in username and password'); // Logging

                submitButton.click();
                console.log('Form submitted'); // Logging
            }
        }
    }

    function checkIfLoggedOut() {
        // Check for the presence of the login form to detect a logged-out state
        const loginPageIndicator = document.querySelector('form[action="/j_spring_security_check"]');
        if (loginPageIndicator) {
            console.log('Detected logged out state'); // Logging
            autoLogin();
        } else {
            console.log('Not logged out'); // Logging
        }
    }

    // Check if credentials are set
    if (!username || !password) {
        alert(`Please set your login credentials for ${currentEnv} via the Tampermonkey menu.`);
        setCredentials();
    }

    // Run the check periodically
    setInterval(checkIfLoggedOut, 30000); // Check every 30 seconds

    // Initial check
    checkIfLoggedOut();
})();
