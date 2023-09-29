import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const UserCard = ({id,username,name,imageUrl,personType}:{id:string,username:string,name:string,imageUrl:string,personType:string}) => {
  return (
    <article className='user-card'>
      <div className="user-card_avatar relative ">
        <div className="h-11 w-11 relative ">
          <Image src={imageUrl} alt="profile photo" fill className='rounded-full' />
          

        </div>
        <div className="flex-1 text-ellipsis">
          <h4 className='text-base-semibold text-light-1'>{name} </h4>
          <div className="text-small-medium text-gray-1">{username}</div>
        </div>
      </div>
      <Button className='user-card_btn' >
View
      </Button>
    </article>
  )
}

export default UserCard