import React from 'react'
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai';
import Moment from 'react-moment'; 
import './popularPost.scss';

export const PopularPost = ({item}) => {
  return (
    <li key={item._id} className="popular-posts-main__item item-popular-posts">
        <div className={item.imgUrl ? "item-popular-posts__img" : "item-popular-posts__no-img"}>
            {item.imgUrl && <img src={`http://localhost:3002/${item.imgUrl}`} alt={`${item.title}`} />}
        </div>
        <div className="item-popular-posts__upper">
          <p className="item-popular-posts__author">{item.username}</p>
          <span className="item-popular-posts__date"><Moment date={item.createdAt} format="D MMM YYYY"/></span>
        </div>
        <h4 className="item-popular-posts__title">{item.title}</h4>
        <p className="item-popular-posts__text">{item.text}</p>
        <div className="item-popular-posts__footer">
            <span className="item-popular-posts__views recall">
              <AiFillEye className='icon'/> 
              {item.views}
            </span>
            <span className="item-popular-posts__comments recall"> 
              <AiOutlineMessage className='icon'/>
              {item.comments?.length}
            </span>
        </div>
    </li>
  )
}
