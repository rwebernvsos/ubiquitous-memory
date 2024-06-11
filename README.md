# Ubiquitous Memory
Tampermonkey scripts for NV Silverflume.

## Setup Instructions
Follow the instructions in this [Gist](https://gist.github.com/jesterjunk/0344f1a7c1f67f52ffc716b17ee7f240) to set up Tampermonkey. When you get to step 5, install any or all of the scripts below. If you install them using the URL, and have Tampermonkey configured to check for updates, you will be notified when there is an update for the script. 

## Available Scripts
Make sure you review the scripts before using them


1. **Hide the Google Translate Widget**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/hide-translate-widget.js)
   * This script hides the Google Translate widget on the NV Silverflume site.

2. **Automatically Log in to NV Silverflume**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/auto-login.js)
   * **Note:** Use at your own risk. This stores your password in the Tampermonkey local storage, so do not use this on a shared computer.

3. **Fix Dialog Boxes to Close with the 'X' Button**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/trigger-cancel-or-no-on-x-click.js)
   * This script ensures that dialog boxes with a "Cancel" or "No" button close when the 'X' button is clicked.

4. **Add a Reload Button to Dialog Boxes without a Cancel Button**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/add-reload-fein-info-dialog.js)
   * This script adds a reload button to dialog boxes that do not have a cancel button, allowing you to reload the page to close the dialog.

5. **Auto-Fill Business Name in Search**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/auto-fill-business-name.js)
   * Use a query parameter to search for a business. For example, `https://esos.nv.gov/EntitySearch/OnlineEntitySearch?businessName=amazon` fills in "amazon" as the business name and submits the search form.

6. **Fix Dialog Box to Access OK and Cancel Buttons**
   * [RAW URL](https://github.com/rwebernvsos/ubiquitous-memory/raw/main/fix-popup-scroll.js)
   * This script ensures that you can access the OK and Cancel buttons on dialog boxes when the window is not tall enough.

7. **Replace horizontal menu with side menu**
   * [RAW URL](https://raw.githubusercontent.com/rwebernvsos/ubiquitous-memory/main/replace-menu.js)
   * This script moves the menu to the left side, adds an extra menu item to get to in progress filings, and shows the version number.


## Additional Information
* Ensure you have Tampermonkey installed in your browser before attempting to install any of the scripts.
* Follow the provided setup instructions carefully to ensure proper installation and functioning of the scripts.
  

