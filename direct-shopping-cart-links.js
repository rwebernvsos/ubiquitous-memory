// ==UserScript==
// @name         Direct Shopping Cart Links with POST Request and Status Check
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add direct links to shopping cart items from the report page, send POST request directly, and add business status
// @match        https://www.nvsilverflume.gov/admin/reports/commitdetail*
// @match        https://www.nvsilverflume.gov/queryCart*
// @match        https://nvsilverflumetest.nv.gov/admin/reports/commitdetail*
// @match        https://nvsilverflumetest.nv.gov/queryCart*
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/direct-shopping-cart-links.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/direct-shopping-cart-links.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const environments = {
        'www.nvsilverflume.gov': {
            baseUrl: "https://www.nvsilverflume.gov/queryCart",
            searchPageUrl: "https://esos.nv.gov/EntitySearch/OnlineEntitySearch"
        },
        'nvsilverflumetest.nv.gov': {
            baseUrl: "https://nvsilverflumetest.nv.gov/queryCart",
            searchPageUrl: "https://esosuat.nv.gov/EntitySearch/OnlineEntitySearch"
        }
    };

    const currentHost = window.location.host;
    const { baseUrl, searchPageUrl } = environments[currentHost] || {};

    function createLink(text, searchParams) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = text;
        link.addEventListener('click', (event) => {
            event.preventDefault();
            sendPostRequest(searchParams);
        });
        link.target = "_blank"; // Open link in a new window/tab
        return link;
    }

    function addStatusLink(entityNameCell, entityName) {
        const statusLink = document.createElement('a');
        statusLink.href = `${searchPageUrl}?businessName=${encodeURIComponent(entityName)}`;
        statusLink.textContent = 'Check Status';
        statusLink.style.marginLeft = '10px';
        statusLink.target = "_blank"; // Open link in a new window/tab
        entityNameCell.appendChild(statusLink);
    }

    function addLinks() {
        const rows = document.querySelectorAll('table tr');

        rows.forEach(row => {
            const usernameCell = row.cells[1]; // Adjust the cell index if necessary
            const entityNameCell = row.cells[2]; // Adjust the cell index if necessary
            const jobNumberCell = row.cells[3]; // Adjust the cell index if necessary
            const confirmationNumberCell = row.cells[6]; // Adjust the cell index if necessary

            if (usernameCell) {
                const userName = usernameCell.textContent.trim();
                const link = createLink(userName, { userName });
                usernameCell.innerHTML = ''; // Clear existing text
                usernameCell.appendChild(link); // Add link
            }

            if (entityNameCell) {
                const entityName = entityNameCell.textContent.trim();
                const link = createLink(entityName, { entityName });
                entityNameCell.innerHTML = ''; // Clear existing text
                entityNameCell.appendChild(link); // Add link
                addStatusLink(entityNameCell, entityName);
            }

            if (jobNumberCell) {
                const jobNumber = jobNumberCell.textContent.trim();
                const link = createLink(jobNumber, { agencyJobNumber: jobNumber });
                jobNumberCell.innerHTML = ''; // Clear existing text
                jobNumberCell.appendChild(link); // Add link
            }

            if (confirmationNumberCell) {
                const confirmationNumber = confirmationNumberCell.textContent.trim();
                const link = createLink(confirmationNumber, { confirmationId: confirmationNumber });
                confirmationNumberCell.innerHTML = ''; // Clear existing text
                confirmationNumberCell.appendChild(link); // Add link
            }
        });
    }

    function sendPostRequest(params) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = baseUrl;
        form.target = '_blank'; // Open form submission in a new tab

        // Add form fields
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = params[key];
                form.appendChild(input);
            }
        }

        // Add static hidden fields required for the form submission
        const hiddenFields = [
            { name: 'enterResults', value: 'Search' }
        ];

        hiddenFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    // Run the function to add links when on the report page
    if (window.location.href.startsWith('https://www.nvsilverflume.gov/admin/reports/commitdetail') ||
        window.location.href.startsWith('https://nvsilverflumetest.nv.gov/admin/reports/commitdetail')) {
        window.addEventListener('load', addLinks);
    }
})();
