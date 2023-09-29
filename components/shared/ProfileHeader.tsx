import Image from 'next/image'
import React from 'react'


interface Props{
  accountId: string,
  authUserId: string,
  name: string,
  username: string,
  image: string,
  bio:string
}
function ProfileHeader({accountId,authUserId,name,username,image,bio}:Props) {
  return (
    <div className='flex flex-col w-full justify-start'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-20">
            <Image src={image} alt='profile photo' fill className='rounded-full object-cover shadow-2xl'/>
          </div>
          <div className="flex-1">
            <h2 className='text-left text-heading2-bold text-light-1'>{name}</h2>
            <p className="text-base-medium text-gray-1">
              @{username}
            </p>
          </div>
        </div>
        </div>
        {/* Community */}
        <p className="mt-6 max-w-lg text-base-regular text-light-2">
        {bio}
        </p> 

    </div>
  )
}

export default ProfileHeader