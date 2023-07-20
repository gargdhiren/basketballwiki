import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import React from 'react'
import { toast } from 'react-toastify'
import { db,storage } from '../firebaseConfig'
import { ref } from 'firebase/storage'
function DeleteArticle({id,imageUrl}) {
    const handleDelete=async ()=>{
        if(window.confirm('Do you want to delete this article?')){
            try{
                await deleteDoc(doc(db,"Articles",id))
                toast("Article Deleted successfully",{type:"success"})
                const storageRef=ref(storage,imageUrl)
                await deleteObject(storageRef);
            }catch(error){
                toast("Error Deleting Articles",{type:error});
            }
        }
    }
  return (
    <div>
        <button className="btn btn-danger" onClick={handleDelete}>
            Delete
        </button>
    </div>
  )
}

export default DeleteArticle