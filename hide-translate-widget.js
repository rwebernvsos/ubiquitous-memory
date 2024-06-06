// ==UserScript==
// @name         Hide Google Translate Widget
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide the Google Translate widget on NV SilverFlume
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/hide-translate-widget.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/hide-translate-widget.js
// ==/UserScript==

(function() {
    'use strict';

    function hideTranslateWidget() {
        const widget = document.getElementById('google_translate_element');
        if (widget) {
            widget.style.display = 'none';
            console.log('Google Translate widget hidden');
        } else {
            console.log('Google Translate widget not found yet');
        }
    }

    // Check periodically for the widget and hide it
    const interval = setInterval(() => {
        hideTranslateWidget();
    }, 500); // Check every 500ms

    // Stop checking after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 10000); // Stop checking after 10 seconds

    // Initial check
    hideTranslateWidget();
})();
