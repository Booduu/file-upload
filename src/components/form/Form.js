import React, { useState } from 'react';
import { storage } from '../../conf/firebaseApi';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


const FirebaseFileUpload = () => {

    const [image, setImage] = useState(null);
    const [ url, setUrl ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ disabledButton, setdisabledButton ] = useState(true)

    const handleChange= (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            setdisabledButton(false)
        }
    }

    const handleUpload = () => {

        const upload = storage.ref(`images/${image.name}`).put(image);

        upload.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
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
                        console.log(image)
                    })
            }
        )
    }

  

    return (
        <Container maxWidth="xl" >
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "200px" }}>
                <Input onChange={ handleChange } type='file' style={{ width:"50%",  }}/>
                <Button onClick={ handleUpload } style={{ width:"50%" }} variant="contained" color="secondary" disabled={ disabledButton }>Upload</Button>
                <progress value={ progress } max="100"/>
                { url && (
                    <img src={ url } alt={ image.name }  width="200px"/>
                ) }
            </Box>
        </Container>
    )
}

export default (FirebaseFileUpload);