const firebaseConfig = {
    apiKey: "AIzaSyCOoHmBdtQPKvG0G7GsQThsepdOcC0ozMU",
    authDomain: "todo-9e69d.firebaseapp.com",
    databaseURL: "https://todo-9e69d-default-rtdb.firebaseio.com",
    projectId: "todo-9e69d",
    storageBucket: "todo-9e69d.appspot.com",
    messagingSenderId: "346218289269",
    appId: "1:346218289269:web:3a97333c97c7d23ec7803c",
    measurementId: "G-KKNP8GZH0L"
  };

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();