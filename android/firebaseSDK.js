import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyArizw_wFnf95RTjrByf1YLFtqmrOQc2HI',
        authDomain: '<your-auth-domain>',
        databaseURL: 'https://<your-db-url>.firebaseio.com',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>.appspot.com',
        messagingSenderId: '<your-sender-id>'
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;