import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { auth, db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'

function AddArticles() {
    const [user]=useAuthState(auth);
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        image:"",
        createAt: Timestamp.now().toDate(),
    })
    const [progress,setProgress]=useState(0);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image) {
          alert("Please fill all the fields");
          return;
        }
    
        const storageRef = ref(
          storage,
          `/images/${Date.now()}${formData.image.name}`
        );
    
        const uploadImage = uploadBytesResumable(storageRef, formData.image);
    
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const progressPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progressPercent);
          },
          (err) => {
            console.log(err);
          },
          () => {
            setFormData({
              title: "",
              description: "",
              image: "",
            });
    
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
              const articleRef = collection(db, "Articles");
              addDoc(articleRef, {
                title: formData.title,
                description: formData.description,
                imageUrl: url,
                createdAt: Timestamp.now().toDate(),
                createdBy:user.displayName,
                userId:user.uid,
                likes:[],
                comments:[]
              })
                .then(() => {
                  toast("Article added successfully", { type: "success" });
                  setProgress(0);
                })
                .catch((err) => {
                  toast("Error adding article", { type: "error" });
                });
            });
          }
        );
      };
  return (
    <div className="border p-3 mt-3 bg-light" style={{position:"fixed"}}>
    {
        !user?
        (
            <>
                <h2><Link to='/signin'>Login to create article</Link></h2>
                Don't have an account?<Link to='/register'> Sign Up</Link>
            </>
        ):(
            <>
            <h2>Create article</h2>
        <label htmlFor="">Title</label>
        <input type="text" name="title" className="form-control" id="" value={formData.title} onChange={(e)=>handleChange(e)}
        />

        <label htmlFor="">Description</label>
        <textarea name="description" id="" className="form-control" value={formData.description} onChange={(e)=>handleChange(e)}/>

        <label htmlFor="">Image</label>
        <input type="file" name="image" className='form-control' accept="image" id="" onChange={(e)=>handleImageChange(e)}/>
        {progress===0 ?null:(
            <div className="progress">
            <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}%`}}>
                {`uploading image ${progress}%`}
            </div>
            </div>
        )}
        <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
            </>
        )
    }
    </div>
  )
}

export default AddArticles