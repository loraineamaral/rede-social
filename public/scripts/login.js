$(document).ready(function () {

    $("#btn-login").click(function (event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                window.location = 'profile.html?id=' + response.user.uid;
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    });

    $(document).keypress(function(e) {
        if (e.which == 13) {
             $("#btn-login").trigger('click'); 
        }
    });

    $("#login-gmail").click(function (event) {
        event.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        signIn(provider);
    })

    $("#login-facebook").click(function (event) {
        event.preventDefault();
        let provider = new firebase.auth.FacebookAuthProvider();
        signIn(provider);
    })

    function signIn (provider) {
        firebase.auth().signInWithPopup(provider)
            .then(response =>{
            window.location = 'profile.html?id=' + response.user.uid;
            database.ref("users/" + response.user.uid).push({
                name: name,
                }); 
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            alert(errorCode, errorMessage, email, credential)
        })      
    }

})

