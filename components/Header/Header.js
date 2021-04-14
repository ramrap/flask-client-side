import { useAuth } from "../../context/auth";
import { loadFirebase } from "../../context/firebase";

// import axiosInstance from "../../util/axios";

export default function Header() {
  const { setFirebaseUser, token, setToken } = useAuth()
  const handleSignIn = async () => {
    var firebase = await loadFirebase();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        console.log("login success =>", provider)
        setToken(true)
        console.log(token)
      })
      .catch(err => {
        alert('Error Processing request, try again.');
        console.log(err);
      });
  }
  const handleLogout = async () => {
    var firebase = await loadFirebase();
    firebase.auth().signOut().then(function () {
      setFirebaseUser(null)
      setToken(null)
      // delete axiosInstance.defaults.headers.common['Authentication']
    }).catch(function (err) {
      alert('Error Processing request, try again.');
      console.log(err);
    });
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between w-100 p-3">
        <div>
          <div className="font-weight-bold">
            Deep <span className="text-monospace">Learning</span>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div className="p-2">
              Hackathons
            </div>
            {token ? 
              <div className="p-2" onClick={() => handleLogout()}>
                Logout
              </div>
              :
              <div className="p-2" onClick={() => handleSignIn()}>
                Login with Google
              </div>
            }
          </div>
        </div>
      </div>
      <style jsx>{`

      `}</style>
    </div>
  )
}