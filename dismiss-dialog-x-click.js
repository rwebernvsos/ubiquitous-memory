// ==UserScript==
// @name         Dismiss Dialog on x click
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Dismiss dialog by clicking the x
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/dismiss-dialog-x-click.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/dismiss-dialog-x-click.js
// ==/UserScript==

(function() {
    'use strict';

    function dismissDialogOnOutsideClick() {
        const dialog = document.querySelector('.ui-dialog[aria-labelledby="ui-dialog-title-perjuryConfirmMessage"]');

        if (dialog) {
            dialog.addEventListener('click', (event) => {
                if (!event.target.closest('.ui-dialog-content') && !event.target.closest('.ui-dialog-buttonpane')) {
                    const buttons = dialog.querySelectorAll('.ui-dialog-buttonpane button');
                    buttons.forEach(button => {
                        if (button.textContent.trim() === 'Cancel') {
                            button.click();
                        }
                    });
                }
            });

            console.log('Added click event to dismiss dialog on x click');
        } else {
            console.error('Dialog not found');
        }
    }

    // Run the function when the document is fully loaded
    window.addEventListener('load', () => {
        // Add a slight delay to ensure the dialog is fully loaded
        setTimeout(dismissDialogOnOutsideClick, 1000);
    });
})();
