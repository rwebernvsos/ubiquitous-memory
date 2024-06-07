// ==UserScript==
// @name         Fix Popup Scroll Issue
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add CSS to fix a popup that can't be scrolled
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/fix-popup-scroll.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/fix-popup-scroll.js
// ==/UserScript==

(function() {
    'use strict';

    function addCustomCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .ui-dialog {
                max-height: 80vh;
                overflow-y: auto;
            }
        `;
        document.head.appendChild(style);
        console.log('Custom CSS for .ui-dialog added');
    }

    // Add the custom CSS when the document is fully loaded
    window.addEventListener('load', addCustomCSS);
})();
