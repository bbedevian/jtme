window.addEventListener("DOMContentLoaded", () => {
    function addJob() {
        // eslint-disable-next-line no-undef
        chrome.tabs.executeScript({file: "addJob.js"})
    }
    
    document.getElementById('submit-job-button').addEventListener('click', addJob)
})
