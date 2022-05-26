import firebase from 'firebase';
class FirebaseCode {

    constructor() {
        this.init(); 
    }

    init = () => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp({
                apiKey: "AIzaSyCF7C1W0Jim_JIBdUOM2-zlQdia5PSUWUk",
                authDomain: "react-native-demo-277b7.firebaseapp.com",
                databaseURL: "https://react-native-demo-277b7-default-rtdb.europe-west1.firebasedatabase.app",
                projectId: "react-native-demo-277b7",
                storageBucket: "react-native-demo-277b7.appspot.com",
                messagingSenderId: "87325373920",
                appId: "1:87325373920:web:9ba7285bbabea7a179e785"
            })
        }
    }

    createUser = () => {
        for (let index = 1; index < 10; index++) {
            var d = new Date().getTime();
            var t = index + 1;
            var user_data = {
                chat_list: {
                    [t]: {
                        last_message: "hi",
                        sender_id: "2",
                        created_on: d
                    }
                },
                user_messages: ""
            }
            this.db.child(index).set(user_data);
        }
    }

    listMyChat = (own_id, setData) => {
        this.db.child(own_id).child("chat_list").on('value', function (snapshot) {
            setData(snapshot)
            return snapshot;
        });
    }

    sendMessage = (own_id, user_id, msg) => {
        var d = new Date().getTime();
        const message = {
            chat_type: "single",
            created_on: d,
            message_type: "text",
            sender_id: own_id,
            text: msg
        };
        this.db.child(own_id).child("messages").child(user_id).push(message);

        const message_re = {
            chat_type: "single",
            created_on: d,
            message_type: "text",
            sender_id: own_id,
            text: msg
        };
        this.db.child(user_id).child("messages").child(own_id).push(message_re);

        const message1 = {
            created_on: d,
            last_message: msg,
            sender_id: own_id,
            receiver_id: user_id
        };
        this.db.child(own_id).child("chat_list").child(user_id).update(message1);

        const message_re1 = {
            created_on: d,
            last_message: msg,
            sender_id: own_id,
            receiver_id: own_id
        };
        this.db.child(user_id).child("chat_list").child(own_id).update(message_re1);


    }

    loadMessages = (own_id, user_id, setData) => {
        this.db.child(own_id).child("messages").child(user_id).orderByChild("created_on").on('value', function (snapshot) {
            setData(snapshot)
            return snapshot;
        });
    }

    get db() {
        return firebase.database().ref("users");
    }

    async signWithPhone(phoneNumber) {
        const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
        return confirmation;
    }

    createSubscribe(onAuthStateChanged) {
        return firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }

}

export default new FirebaseCode();