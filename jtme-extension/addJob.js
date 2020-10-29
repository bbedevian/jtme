/* eslint-disable no-undef */

const addJob = (uid, newJob) => {
    const firestore = firebase.firestore();
    let date = new Date()
    const lastContacted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const job = {...newJob, lastContacted }
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(uid);
    const userJobs = userDoc.collection('jobs');
    userJobs.add(job);
}

export default addJob

      

