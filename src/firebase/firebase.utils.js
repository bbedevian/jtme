import firebase from 'firebase/app';
import 'firebase/firestore';
import {store} from '../redux/store'
import { addJobToState } from '../redux/jobs/jobs.actions';


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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();

  const state = store.getState();
  const currentUserID = state.user.currentUser.id;

  export const addJobToUserJobsCollection = (job) => {
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
  export const addInteractionToJob = (jobID, interaction) => {
    const collectionRef = firestore.collection('users');
    const userDoc = collectionRef.doc(currentUserID);
    const interactions = userDoc.collection('jobs').doc(jobID).collection('interactions')

    interactions.add(interaction)
    .then(function(docRef) {
      console.log("Interaction written with ID: ", docRef.id);
      return docRef.id

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  export const updateJob = ()  => {

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
      const { activity, date } = doc.data();

      return {
        id: doc.id,
        activity,
        date
      };
    });
  
    return transformedInteractions
  }