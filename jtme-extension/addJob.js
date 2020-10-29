/* eslint-disable no-undef */


        console.log('click listener working!! ');

        // var config = {
        //     apiKey: "AIzaSyDMaarRN0olc8PyrRur92EaZ5P7hmgzFS8",
        //     databaseURL: "https://jtme-8027c.firebaseio.com",
        //     storageBucket:"jtme-8027c.appspot.com"
        // };

        var config = {
            apiKey: "AIzaSyDMaarRN0olc8PyrRur92EaZ5P7hmgzFS8",
            authDomain: "jtme-8027c.firebaseapp.com",
            databaseURL: "https://jtme-8027c.firebaseio.com",
            projectId: "jtme-8027c",
            storageBucket: "jtme-8027c.appspot.com",
            messagingSenderId: "291493867044",
            appId: "1:291493867044:web:cbe215bf50330a03e972b1",
            measurementId: "G-Y0Q7G60SNY"
          };
        
        firebase.initializeApp(config);
        
        const firestore = firebase.firestore();
        
        const userID = document.getElementById('quickstart-account-ID').textContent
        const company = document.getElementById("company-name-field").value
        const jobTitle = document.getElementById("job-title-field").value
        const status = document.getElementById("job-status-field").value
        let date = new Date()
        const lastContacted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const newJob = {company, jobTitle, status, lastContacted }
        const collectionRef = firestore.collection('users');
        const userDoc = collectionRef.doc(userID);
        const userJobs = userDoc.collection('jobs');
        userJobs.add(newJob);
        document.getElementById("company-name-field").value = ""
        document.getElementById("job-title-field").value = ""
        document.getElementById("job-status-field").value = null

