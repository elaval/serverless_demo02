const randomNumber = Math.floor( Math.random() * 100);
const targetElement = document.getElementById('luckyNumber');
targetElement.textContent = randomNumber;


initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var uid = user.uid;
        user.getIdToken().then(function(accessToken) {
            document.getElementById('sign-in-status').textContent =`Signed in - ${displayName || email}`;
            document.getElementById('sign-in').textContent = 'Sign out';
            document.getElementById('sign-in').addEventListener('click', function() {
                firebase.auth().signOut();
            });
        })
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = '';
            document.getElementById('sign-in').addEventListener('click', () => {
                window.location.assign('/login.html');
            });
        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
});

