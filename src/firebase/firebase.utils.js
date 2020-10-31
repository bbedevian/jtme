import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {store} from '../redux/store'
import { addJobToState, updateJobInState } from '../redux/jobs/jobs.actions';
import {addInteractionToState, updateInteractionInState} from '../redux/interactions/interactions.actions'

// add your own firebase application information below to connect to a new firebase firestore project
var firebaseConfig = {
    apiKey: "AIzaSyDMaarRN0olc8PyrRur92EaZ5P7hmgzFS8",
    authDomain: "jtme-8027c.firebaseapp.com",
    databaseURL: "https://jtme-8027c.firebaseio.com",
    projectId: "jtme-8027c",
    storageBucket: "jtme-8027c.appspot.com",
    messagingSenderId: "291493867044",
    appId: "1:291493867044:web:dce46199dea42f98e972b1",
    measurementId: "G-EBS3HKN53C"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShop = await userRef.get()

    if(!snapShop.exists){
      const { displayName, email} = userAuth
      const createdAt = new Date ()
      try {
        await userRef.set({
          displayName, email, createdAt, ...additionalData
        })
      } catch(err){
          console.log('error!...', err.message)
      }
    }
    return userRef;
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  export const addJobToUserJobsCollection = (job) => {
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(currentUserID);
    const userJobs = userDoc.collection('jobs');
    userJobs.add(job)
    .then(function(docRef) {
      console.log("Job written with ID: ", docRef.id);
      store.dispatch(addJobToState({...job, id: docRef.id}))
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  export const addInteractionToJob = (interaction) => {
    console.log("interaction", interaction)
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    const currState = store.getState();
    const selectedJob = currState.jobs.selectedJob;
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(currentUserID);
    const interactions = userDoc.collection('jobs').doc(selectedJob.id).collection('interactions')
    // const time = new Date()
    // const dateStamp = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
    interactions.add({...interaction})
    .then(function(docRef) {
      console.log("Interaction written with ID: ", docRef.id);
      const currLastContacted = new Date(selectedJob.lastContacted)
      const interactionDate = new Date(interaction.date)
      const finalDate = currLastContacted > interactionDate? selectedJob.lastContacted : interaction.date
      store.dispatch(addInteractionToState({...interaction, id: docRef.id}))
      userDoc.collection('jobs').doc(selectedJob.id).update({lastContacted: finalDate})
      // last step is to update the jobs last touch on the frontend which can be done with an action from reducer
      .then(() => {
        let modal = true
        store.dispatch(updateJobInState(selectedJob, selectedJob.id, finalDate, modal))
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  export const updateJob = (job, modal)  => {
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    const selectedJobID = state.jobs.selectedJob.id;
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(currentUserID);
    userDoc.collection('jobs').doc(selectedJobID).update({...job})
    .then(() => {
      store.dispatch(updateJobInState(job, selectedJobID, job.lastContacted, modal))
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  export const updateInteraction = (interaction)  => {
    const state = store.getState();
    const currentUserID = state.user.currentUser.id;
    const selectedJob = state.jobs.selectedJob;
    const selectedInteractionID = state.interactions.selectedInteraction.id
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(currentUserID);
    const jobsRef = userDoc.collection('jobs')
    const jobDoc = jobsRef.doc(selectedJob.id)
    const interactionsRef = jobDoc.collection('interactions')
    const interactionDoc = interactionsRef.doc(selectedInteractionID)
    interactionDoc.update({...interaction})
    .then(() => {
      store.dispatch(updateInteractionInState(interaction, selectedInteractionID))
      const currLastContacted = new Date(selectedJob.lastContacted)
      const interactionDate = new Date(interaction.date)
      const finalDate = currLastContacted > interactionDate? selectedJob.lastContacted : interaction.date
      const job = {...selectedJob, lastContacted: finalDate}
      updateJob(job, true)
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }

  export const convertJobsSnapshotToMap = jobs => {
    const transformedJobs = jobs.docs.map(doc => {
      const { company, status, jobTitle,  lastContacted } = doc.data();
      return {
        id: doc.id,
        company,
        status,
        lastContacted,
        jobTitle
      };
    });
    return transformedJobs
  }

  export const convertInteractionsSnapshotToMap = interactions => {
    const transformedInteractions = interactions.docs.map(doc => {
      const { type, date, nextSteps } = doc.data();
      return {
        id: doc.id,
        type,
        date,
        nextSteps
      };
    });
    return transformedInteractions
  }

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe()
        resolve(userAuth)
      }, reject)
    })
  }

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);