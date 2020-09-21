import React, { useState } from 'react';
import { storage } from '../../conf/firebaseApi';

const FirebaseFileUpload = () => {

    const [image, setImage] = useState(null);
    const [ url, setUrl ] = useState("");
    const [ progress, setProgress ] = useState(0);

    const handleChange= (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on(
            "state_changed",
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                    })
            }
        )
    }

    console.log('image:', image );

    return (
        <div>
            <input onChange={ handleChange } type='file'/>
            <button onClick={ handleUpload } type="button">Upload</button>
            { url }
        </div>
    )
}

export default FirebaseFileUpload;