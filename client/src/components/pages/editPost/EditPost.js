import React, {useState, useCallback, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost } from '../../../redux/features/post/postSlice';


export const EditPost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImg, setOldImg] = useState('');
  const [newImg, setNewImg] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async() => {
    const resp = await fetch(`http://localhost:3002/api/posts/${params.id}`);
    const respJSON = await resp.json();
    setTitle(respJSON.title);
    setText(respJSON.text);
    setOldImg(respJSON.imgUrl);

}, [params.id])

  useEffect(() => {
    fetchPost();
  }, [fetchPost])

  const clearForm = () => {
    setText(''); setTitle('')
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImg);
      dispatch(editPost(updatedPost));
      navigate('/myPosts');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addPost">
      <form onSubmit={(e) => onSubmitHandler(e)} className="addPost__form">
        <label className="addPost__label labelForFile">
          Attach Image
          <input 
            onChange={e => {setNewImg(e.target.files[0]); setOldImg('')}}
            type="file" 
            name='image' 
            className='addPost__input inputForFile'/>
        </label>
        <div className="addPost__img">
          {oldImg && <img src={`http://localhost:3002/${oldImg}`} alt="old"/>}
          {newImg && <img src={URL.createObjectURL(newImg)} alt="new"/>}
        </div>
        <label className="addPost__label">
          Post Title:
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text" 
            name='title' 
            className='addPost__input' 
            placeholder='Title'/>
        </label>
        <label className="addPost__label">
          Post Text:
          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            name="text" 
            id="text" 
            cols="30" 
            rows="10" 
            className="addPost__textarea" 
            placeholder='Text' />
        </label>
        <div className="addPost__btns">
          <button type='submit' className="addPost__btn btn-submit">Save</button>
          <button onClick={clearForm} className="addPost__btn btn-danger">Cancel</button>
        </div>
      </form>
    </div>
  )
}
