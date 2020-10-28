window.addEventListener("DOMContentLoaded", () => {
    function addJob() {
        chrome.tabs.executeScript({file: "addJob.js"})
    }
    
    document.getElementById('submit-job-button').addEventListener('click', addJob)
})
