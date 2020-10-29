// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMaarRN0olc8PyrRur92EaZ5P7hmgzFS8",
    databaseURL: "https://jtme-8027c.firebaseio.com",
    storageBucket:"jtme-8027c.appspot.com",
    projectId: "jtme-8027c",
  };
  firebase.initializeApp(config);
  let uid = null
  
  /**
   * initApp handles setting up the Firebase context and registering
   * callbacks for the auth status.
   *
   * The core initialization is in firebase.App - this is the glue class
   * which stores configuration. We provide an app name here to allow
   * distinguishing multiple app instances.
   *
   * This method also registers a listener with firebase.auth().onAuthStateChanged.
   * This listener is called when the user is signed in or out, and that
   * is where we update the UI.
   *
   * When signed in, we also authenticate to the Firebase Realtime Database.
   */
  function initApp() {
    // Listen for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        uid = user.uid;
        // [START_EXCLUDE]
        document.getElementById('quickstart-button').textContent = 'Sign out';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-account-Name').textContent = JSON.stringify(displayName, null, '  ');
        document.getElementById('quickstart-account-ID').textContent = JSON.stringify(uid, null, '  ');
        document.getElementById("new-job-form").hidden = false
        document.getElementById('submit-job-button').addEventListener('click', () =>  chrome.runtime.sendMessage({command: 'post'}))
        // [END_EXCLUDE]
      } else {
        // Let's try to get a Google auth token programmatically.
        // [START_EXCLUDE]
        document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-account-Name').textContent = "null"
        document.getElementById('quickstart-account-ID').textContent = "null"
        document.getElementById("new-job-form").hidden = true

        // [END_EXCLUDE]
      }
      document.getElementById('quickstart-button').disabled = false;
    });
    // [END authstatelistener]
  
    document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
  }
  
  /**
   * Start the auth flow and authorizes to Firebase.
   * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
   */
  function startAuth(interactive) {
    // Request an OAuth token from the Chrome Identity API.
    chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if(chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Authorize Firebase with the OAuth Access Token.
        var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // The OAuth token might have been invalidated. Lets' remove it from cache.
          if (error.code === 'auth/invalid-credential') {
            chrome.identity.removeCachedAuthToken({token: token}, function() {
              startAuth(interactive);
            });
          }
        });
      } else {
        console.error('The OAuth Token was null');
      }
    });
  }
  
  /**
   * Starts the sign-in process.
   */
  function startSignIn() {
    document.getElementById('quickstart-button').disabled = true;
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      startAuth(true);
    }
  }

  function addJob(uid){
        console.log("in add job")
        const firestore = firebase.firestore();
        const company = document.getElementById("company-name-field")
        const jobTitle = document.getElementById("job-title-field")
        const status = document.getElementById("job-status-field")
        let date = new Date()
        const lastContacted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        let appliedOn = window.location.href
        const newJob = {company: company.value, jobTitle: jobTitle.value, status: status.value, lastContacted, appliedOn }
        console.log("newJob", newJob)
        const collectionRef = firestore.collection('users');
        const userDoc = collectionRef.doc(uid);
        const userJobs = userDoc.collection('jobs');
        userJobs.add(newJob)
        .then(() => {
          document.getElementById("company-name-field").value = ""
          document.getElementById("job-title-field").value = ""
          document.getElementById("job-status-field").value = null
        })
  }
  
  window.onload = function() {
    initApp();
    chrome.runtime.onMessage.addListener((msg, sender, resp) => {
      if(msg.command === "post"){
        addJob(uid)
      }
    })
  };