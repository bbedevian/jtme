/* eslint-disable no-undef */

const addJob = (uid) => {
    const firestore = firebase.firestore();
    const company = document.getElementById("company-name-field").innerText
    const jobTitle = document.getElementById("job-title-field").value
    const status = document.getElementById("job-status-field").value
    let date = new Date()
    const lastContacted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const newJob = {company, jobTitle, status, lastContacted }
    console.log('newJob :>> ', newJob);
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(uid);
    const userJobs = userDoc.collection('jobs');
    userJobs.add(newJob);
    document.getElementById("company-name-field").value = ""
    document.getElementById("job-title-field").value = ""
    document.getElementById("job-status-field").value = null
}

export default addJob

      

