import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../../redux/features/post/postSlice';
import "./addPost.scss";

export const AddPost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', img);
      dispatch(createPost(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  }

  const clearForm = () => {
    setText(''); setTitle(''); setImg(null);
  }

  return (
    <div className="addPost">
      <form onSubmit={(e) => onSubmitHandler(e)} className="addPost__form">
        <label className="addPost__label labelForFile">
          Attach Image
          <input 
            onChange={e => setImg(e.target.files[0])}
            type="file" 
            name='image' 
            className='addPost__input inputForFile'/>
        </label>
        <div className="addPost__img">
          {img && <img src={URL.createObjectURL(img)} alt="some"/>}
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
          <button type='submit' className="addPost__btn btn-submit">Add Post</button>
          <button onClick={clearForm} className="addPost__btn btn-danger">Cancel</button>
        </div>
      </form>
    </div>
  )
}
