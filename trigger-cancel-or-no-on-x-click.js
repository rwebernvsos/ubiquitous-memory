// ==UserScript==
// @name         Trigger Cancel or No on X Click for Dialogs with Cancel or No Button
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  Trigger the cancel or no button on X click for dialogs with a cancel or no button
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/trigger-cancel-or-no-on-x-click.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/trigger-cancel-or-no-on-x-click.js
// ==/UserScript==

(function() {
    'use strict';

    const dialogSelectors = [
        '.ui-dialog[aria-labelledby="ui-dialog-title-perjuryConfirmMessage"]',
        '.ui-dialog[aria-labelledby="ui-dialog-title-saveCartMessage"]',
        '.ui-dialog[aria-labelledby="ui-dialog-title-confirmMessage"]',
        '.ui-dialog[aria-labelledby="ui-dialog-title-feinInfo-popup"]'
    ];

    function triggerCancelOrNoOnXClick(dialog) {
        const closeButton = dialog.querySelector('.ui-dialog-titlebar-close');
        const cancelButton = Array.from(dialog.querySelectorAll('.ui-dialog-buttonpane button')).find(button => button.textContent.trim() === 'Cancel');
        const noButton = Array.from(dialog.querySelectorAll('.ui-dialog-buttonpane button')).find(button => button.textContent.trim() === 'No');

        if (closeButton) {
            closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                if (cancelButton) {
                    cancelButton.click();
                } else if (noButton) {
                    noButton.click();
                }
            });
            console.log(`Added click event to trigger cancel or no on X click for ${dialog}`);
        } else {
            console.error('Close button not found for dialog');
        }
    }

    function observeDialogs() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            dialogSelectors.forEach(selector => {
                                if (node.matches(selector) || node.querySelector(selector)) {
                                    triggerCancelOrNoOnXClick(node.matches(selector) ? node : node.querySelector(selector));
                                }
                            });
                        }
                    });
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Initial run for dialogs already present in the DOM
    window.addEventListener('load', () => {
        dialogSelectors.forEach(selector => {
            const dialog = document.querySelector(selector);
            if (dialog) {
                triggerCancelOrNoOnXClick(dialog);
            }
        });

        // Start observing the DOM for dynamically added dialogs
        observeDialogs();
    });
})();
