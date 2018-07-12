import React from 'react'


const User = (props) => {
   return (
      <div>
         <div>{props.name}</div>
         <img src={props.picture} alt="" srcset="" />
         <button>Send Invite</button>
      </div>
   )
}

export default User;
