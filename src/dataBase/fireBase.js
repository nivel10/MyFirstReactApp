import fireBse from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1u6cu8M98HKjCt2jyZ8gpDdeP8wYVxMg",
    authDomain: "myfirstreactapp-dac12.firebaseapp.com",
    databaseURL: "https://myfirstreactapp-dac12-default-rtdb.firebaseio.com",
    projectId: "myfirstreactapp-dac12",
    storageBucket: "myfirstreactapp-dac12.appspot.com",
    messagingSenderId: "619789876269",
    appId: "1:619789876269:web:4d33cd4c476bf735e94ca4",
    measurementId: "G-JQFV460RX1"
  };

  export const fireBaseApp = fireBse.initializeApp(firebaseConfig);