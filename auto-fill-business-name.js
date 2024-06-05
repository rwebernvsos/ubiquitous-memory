// ==UserScript==
// @name         Auto-Fill Business Name and Search
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-fill the business name and submit the search form
// @match        https://esos.nv.gov/EntitySearch/OnlineEntitySearch*
// @match        https://esosuat.nv.gov/EntitySearch/OnlineEntitySearch*
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/auto-fill-business-name.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/auto-fill-business-name.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function autoFillForm() {
        const businessName = getQueryParameter('businessName');
        console.log("Business name retrieved from URL:", businessName);
        if (businessName) {
            const input = document.querySelector('#BusinessSearch_Index_txtEntityName');
            const searchButton = document.querySelector('#btnSearch');

            if (input && searchButton) {
                console.log("Setting business name and submitting the form.");
                input.value = businessName;
                searchButton.click();
            } else {
                console.error("Input field or search button not found.");
            }
        } else {
            console.warn("No business name found in URL parameters.");
        }
    }

    window.addEventListener('load', autoFillForm);
})();
