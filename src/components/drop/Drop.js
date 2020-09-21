import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { storage } from '../../conf/firebaseApi';


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

function Drop(props) {

  const [ url, setUrl ] = useState("");

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

  const files = acceptedFiles.map(file => {
    return (
    <li key={file.path}>
      <span>{file.path} - {file.size} bytes</span>
      <button onClick={() => handleUpload(file) }>Upload</button>
    </li>
  )});


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
                    console.log(file)
                })
        }
    )
}

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export default Drop;
