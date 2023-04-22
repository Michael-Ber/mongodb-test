import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'; 
import './postItem.scss';

export const PostItem = ({item}) => {
  return (
    <Link to={`/myPosts/${item._id}`} className = "posts-main__link">
      <li key={item._id} className="posts-main__item item-posts">
        <div className={item.imgUrl ? "item-posts__img" : "item-posts__no-img"}>
          {item.imgUrl && <img src={`http://localhost:3002/${item.imgUrl}`} alt={`${item.title}`} />}
        </div>
        <div className="item-posts__upper">
          <p className="item-posts__author">{item.username}</p>
          <span className="item-posts__date"><Moment date={item.createdAt} format="D MMM YYYY"/></span>
        </div>
        <h4 className="item-posts__title">{item.title}</h4>
        <p className="item-posts__text">{item.text}</p>
        <div className="item-posts__footer">
            
            <span className="item-posts__views recall">
              <AiFillEye className='icon'/> 
              {item.views}
            </span>
            <span className="item-posts__comments recall"> 
              <AiOutlineMessage className='icon'/>
              {item.comments.length}
            </span>
        </div>
      </li>
    </Link>
  )
}
