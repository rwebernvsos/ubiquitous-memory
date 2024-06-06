// ==UserScript==
// @name         Add Reload Button to FEIN Info Dialog
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Add a reload button to the FEIN Info dialog when it appears
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/add-reload-fein-info-dialog.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/add-reload-fein-info-dialog.js
// ==/UserScript==

(function() {
    'use strict';

    function addReloadButton(dialog) {
        const buttonPane = dialog.querySelector('.ui-dialog-buttonpane');
        if (!buttonPane) {
            const newButtonPane = document.createElement('div');
            newButtonPane.className = 'ui-dialog-buttonpane ui-widget-content ui-helper-clearfix';

            const buttonSet = document.createElement('div');
            buttonSet.className = 'ui-dialog-buttonset';

            const reloadButton = document.createElement('button');
            reloadButton.className = 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only';
            reloadButton.innerHTML = '<span class="ui-button-text">Reload</span>';
            reloadButton.type = 'button';
            reloadButton.role = 'button';

            reloadButton.addEventListener('click', () => {
                location.reload();
            });

            buttonSet.appendChild(reloadButton);
            newButtonPane.appendChild(buttonSet);
            dialog.appendChild(newButtonPane);

            console.log('Added Reload button to FEIN Info dialog');
        }
    }

    function observeDialogs() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches('.ui-dialog[aria-labelledby="ui-dialog-title-feinInfo-popup"]')) {
                            addReloadButton(node);
                        }
                    });
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Start observing the DOM for dynamically added dialogs
    observeDialogs();
})();
