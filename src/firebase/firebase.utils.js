import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBwEGszJkNioZFfu2Ry-boQFe3WC79APZA",
	authDomain: "e-commerce-b9c45.firebaseapp.com",
	databaseURL: "https://e-commerce-b9c45.firebaseio.com",
	projectId: "e-commerce-b9c45",
	storageBucket: "e-commerce-b9c45.appspot.com",
	messagingSenderId: "224756064595",
	appId: "1:224756064595:web:c7210bfbadaf997c19c1a6",
	measurementId: "G-VK7TNFG3J6",
};

export const createUserProfileDocument = async(userAuth, additionalData ) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`); 
	
	const snapShot = await userRef.get();
	
	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;

};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// const helloFather();