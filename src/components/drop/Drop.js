import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { storage } from '../../conf/firebaseApi';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';




const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    width: '300px',
    height: '400px',
    display: "flex",
    flexDirection: 'column',
    flex: '2 2 1'
  },
  cardimage: {
    width: '100%',
    minHeight: '400px'
  },
  cardInfo: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));



function Drop(props) {
    const [ image, setImage ] = useState();
    const [ url, setUrl ] = useState("");
    const [ loaded, setLoaded ] = useState(false);

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles
    } = useDropzone({accept: 'image/*'});

    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);

    const classes = useStyles();

    const files = acceptedFiles.map(file => {

      const objectUrl = URL.createObjectURL(file);
      
      return (
          <Paper key={file.path} className={classes.paper} elevation={3}>
            <CardMedia
              image={ objectUrl }
              title="upload preview"
              className={classes.cardimage}
            />
            <div className={classes.cardInfo}>
              <Typography>  {file.path} </Typography>
              <Typography>  {file.size} bytes</Typography>
              <Button onClick={() => handleUpload(file) } variant="contained" color="primary" className={classes.button}>Upload</Button>
            </div>
            
          </Paper>
    )});

    const successLoaded = () => {
      return (
          <div>
            <Typography  variant="h4" color="inherit">Upload success </Typography>
            <Typography  variant="h6" color="inherit">your url :</Typography>
            <Typography  variant="overline" color="inherit" paragraph>{url}</Typography>
            <Button onClick={() => { setLoaded(false); setUrl('') } } variant="contained" color="primary" className={classes.button}>Back</Button>
          </div>
      )
    }


    const handleUpload = (file) => {
      
        const upload = storage.ref(`images/${file.name}`).put(file);

        upload.on(
            "state_changed",
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                        setLoaded(true) 
                    })
            }
        )
    }

    const zoneDrag = () => {
      return (
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )
    }


//finally
  return (
    <div className="container">
     { zoneDrag() }
      <div className={classes.root}>
        { !loaded  ? files : (
          successLoaded()
        )}
      </div>
    </div>
  );
}

export default Drop;
