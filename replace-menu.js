// ==UserScript==
// @name         Replace Navbar with Sidebar Menu
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  Replace the horizontal navbar with a vertical sidebar menu and move logout/profile links and search bar
// @match        https://www.nvsilverflume.gov/*
// @match        https://nvsilverflumetest.nv.gov/*
// @updateURL    https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/replace-menu.js
// @downloadURL  https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/replace-menu.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggleMenu';
        toggleButton.className = 'menu-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle Button');
        toggleButton.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        toggleButton.addEventListener('click', () => {
            document.querySelector('.sidemenu').classList.toggle('open');
        });
        return toggleButton;
    }

    function createSearchBar() {
        const searchBarContainer = document.createElement('div');
        searchBarContainer.className = 'search-container';

        const searchForm = document.createElement('form');
        searchForm.className = 'custom-search-form';
        searchForm.action = `${window.location.origin}/results`;
        searchForm.method = 'GET';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.name = 'q';
        searchInput.className = 'custom-search-input';
        searchInput.placeholder = 'Search...';

        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.className = 'custom-search-button';
        searchButton.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';

        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
        searchBarContainer.appendChild(searchForm);

        return searchBarContainer;
    }

    function createAuthLinks() {
        const authLinksContainer = document.querySelector('#top-nav > div.col-md-7.pr-0');
        const authList = document.createElement('ul');
        authList.className = 'nav navbar-nav';

        if (authLinksContainer) {
            const authLinks = authLinksContainer.querySelectorAll('a');
            authLinks.forEach(link => {
                const listItem = document.createElement('li');
                listItem.className = 'nav-item';
                listItem.appendChild(link.cloneNode(true));
                authList.appendChild(listItem);
            });
        }

        return authList;
    }

    function createVersionInfo() {
        const versionInfo = document.querySelector('#footer-copyright > div:nth-child(4) > p:nth-child(1)');
        if (versionInfo) {
            const versionText = versionInfo.textContent.trim();
            const versionItem = document.createElement('div');
            versionItem.className = 'menu-item version-info';
            versionItem.textContent = versionText;
            return versionItem;
        }
        return null;
    }

    function createMenuItems() {
        const menuList = document.createElement('ul');
        menuList.className = 'nav navbar-nav';

        const existingMenuItems = document.querySelectorAll('.navbar-nav > li');
        existingMenuItems.forEach(menuItem => {
            const listItem = document.createElement('li');
            listItem.className = menuItem.className;
            listItem.innerHTML = menuItem.innerHTML;
            menuList.appendChild(listItem);
        });

        // Add dropdown functionality for existing menu items
        menuList.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
            dropdownToggle.addEventListener('click', (event) => {
                event.preventDefault();
                const dropdownMenu = dropdownToggle.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('open');
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        });

        return menuList;
    }

    function createCustomMenu() {
        const customMenuList = document.createElement('ul');
        customMenuList.className = 'nav navbar-nav';

        const customMenuItem = document.createElement('li');
        customMenuItem.className = 'nav-item';
        customMenuItem.innerHTML = '<a href="/dashboard/resume" class="menu-item">In Progress Filings</a>';
        customMenuList.appendChild(customMenuItem);

        return customMenuList;
    }

    function applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .sidemenu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 250px;
            background-color: #333;
            color: white;
            z-index: 1000;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
        .sidemenu .menu-toggle {
            position: absolute;
            top: 10px;
            right: -40px;
            background-color: #333;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            display: none;
        }
        .navbar-vertical {
            padding: 20px;
            flex-grow: 1;
            overflow-y: auto;
        }
        .nav.navbar-nav {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        .nav.navbar-nav li {
            padding-left: 10px;
        }
        .nav.navbar-nav li a {
            color: white;
            text-decoration: none;
            display: block;
            font-size: 14px;
        }
        .nav.navbar-nav li a:hover {
            text-decoration: underline;
        }
        .dropdown-menu {
            list-style-type: none;
            padding-left: 15px;
            margin: 5px 0 0 0;
            display: none;
        }
        .dropdown-menu .submenu-item {
            font-size: 12px;
        }
        .dropdown-menu.open {
            display: block;
        }
        .search-container {
            padding: 10px;
            margin-bottom: 10px;
        }
        .custom-search-form {
            display: flex;
            align-items: center;
        }
        .custom-search-input {
            flex: 1;
            padding: 5px 10px;
            border: none;
            border-radius: 4px 0 0 4px;
            font-size: 14px;
            background-color: #444;
            color: white;
        }
        .custom-search-input::placeholder {
            color: #bbb;
        }
        .custom-search-button {
            padding: 5px 10px;
            border: none;
            border-radius: 0 4px 4px 0;
            background-color: #555;
            color: white;
            cursor: pointer;
        }
        .version-info {
            margin-top: auto;
            padding: 10px;
            color: #ccc;
            font-size: 12px;
        }
        .menu-section-title {
            padding: 10px 10px 0 10px;
            font-weight: bold;
            color: #ccc;
            font-size: 14px;
        }
        @media (max-width: 768px) {
            .sidemenu {
                transform: translateX(-100%);
            }
            .sidemenu.open {
                transform: translateX(0);
            }
            .sidemenu .menu-toggle {
                display: block;
            }
            body {
                margin-left: 0;
            }
        }
        @media (min-width: 769px) {
            .sidemenu {
                transform: translateX(0);
            }
            body {
                margin-left: 250px;
            }
        }
        #logo img {
            height: auto;
            width: 40%; /* Maintain aspect ratio */
        }
    `;
        document.head.appendChild(style);
    }

    function createSidebarMenu() {
        const sidebar = document.createElement('div');
        sidebar.className = 'sidemenu';

        const toggleButton = createToggleButton();

        const navbar = document.createElement('nav');
        navbar.id = 'navbar';
        navbar.className = 'navbar-vertical';
        navbar.setAttribute('aria-label', 'Main Menu');

        const searchBar = createSearchBar();
        const menuItems = createMenuItems();
        const customMenu = createCustomMenu();
        const authLinks = createAuthLinks();
        const versionInfo = createVersionInfo();

        // Append elements to the navbar with section titles
        navbar.appendChild(searchBar);

        const mainMenuSection = document.createElement('div');
        mainMenuSection.className = 'menu-section';
        const mainMenuTitle = document.createElement('div');
        mainMenuTitle.className = 'menu-section-title';
        mainMenuTitle.textContent = 'Main Menu';
        mainMenuSection.appendChild(mainMenuTitle);
        mainMenuSection.appendChild(menuItems);

        const customMenuSection = document.createElement('div');
        customMenuSection.className = 'menu-section';
        const customMenuTitle = document.createElement('div');
        customMenuTitle.className = 'menu-section-title';
        customMenuTitle.textContent = 'Custom Menu';
        customMenuSection.appendChild(customMenuTitle);
        customMenuSection.appendChild(customMenu);

        const authSection = document.createElement('div');
        authSection.className = 'menu-section';
        const authTitle = document.createElement('div');
        authTitle.className = 'menu-section-title';
        authTitle.textContent = 'Authentication';
        authSection.appendChild(authTitle);
        authSection.appendChild(authLinks);

        navbar.appendChild(mainMenuSection);
        navbar.appendChild(customMenuSection);
        navbar.appendChild(authSection);

        if (versionInfo) {
            navbar.appendChild(versionInfo);
        }

        sidebar.appendChild(toggleButton);
        sidebar.appendChild(navbar);

        document.body.appendChild(sidebar);

        // Apply CSS styles
        applyStyles();

        // Toggle sidebar visibility on small screens
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    function removeHorizontalNavbar() {
        const horizontalNavbar = document.querySelector('.navbar-collapse');
        if (horizontalNavbar) {
            horizontalNavbar.remove();
        }
    }

    function hideExistingMenu() {
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) {
            mainMenu.style.display = 'none';
        }
    }

     function hideExistingSearch() {
        const searchBar = document.querySelector('.searchBtn');
        if (searchBar) {
            searchBar.remove();
        }
    }

    function init() {
        createSidebarMenu();
        removeHorizontalNavbar();
        hideExistingMenu();
        hideExistingSearch();
    }

    window.addEventListener('load', init);
})();
