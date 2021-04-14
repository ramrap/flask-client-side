
import Footer from '../components/Footer/Footer';
import { useAuth } from "../context/auth";
import { loadFirebase } from "../context/firebase";
import axiosInstance from "../util/axios";
import { Nav, Container, Tabs, Tab, Col, Card, Row, ListGroupItem, Image, CardDeck, CardGroup } from 'react-bootstrap';
import { useState } from 'react';

const Upload_Image = () => {
    const { setFirebaseUser, token, setToken } = useAuth()
    const [image , setImage] = useState(null)
    const [url , setUrl] = useState(null)
    const [progress, setProgress] = useState(0)

    


    const handleSignIn = async () => {
        var firebase = await loadFirebase();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        firebase.auth().signInWithPopup(provider)
          .then(() => {
            console.log("login success")
            setToken(true)
          })
          .catch(err => {
            alert('Error Processing request, try again.');
            console.log(err);
          });
      }

      const handleChange = e => {
          if(e.target.files[0]){
            setImage(e.target.files[0]);
          }
      };
      const handleUpload = () => {
            let firebase = loadFirebase()
            const storage = firebase.storage();
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred/ snapshot.totalBytes) *100
                    );
                    setProgress(progress)
                },
                error => {
                    console.log(error);
                },
                ()=>{
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url =>{
                            console.log("url of image => ",url)
                            setUrl(url)
                        })
                }
            )
    };

      
    
    return (
        <div>
            {token ? 
              <>Image Upload
              <br/>
              <progress value={progress} max="100" />
              <input type="file" onChange={handleChange}/>
              <br/>
              <button onClick ={handleUpload}>Upload</button>
              </>
              
              :
              <div className="btn btn-lg btn-google btn-block  btn-outline" onClick={() => handleSignIn()}>
                Login with Google
              </div>
            }
            <footer
                className="footer"
                style={{ backgroundColor: "#EAEAEA", height: 120 }}>
                <Container>
                    <div className="row pt-3 justify-content-center">
                        <div className="col-auto">
                            <h6 className="text-center">
                                Startup Name
                            </h6>
                            <div className="row">
                                <a className="ml-0">Home</a>
                                <a className="ml-3">About Us</a>
                                <a className="ml-3">FAQ</a>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>


    );
}

export default Upload_Image;
