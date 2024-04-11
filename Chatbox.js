import React from 'react';
import Contact from '../../Contact/Contact';
import ChatContainer from '../../ChatContainer/ChatContainer';

function Chatbox(props) {
  const donatorId = props.location.state.donatorId;

  console.log("donator data: ", donatorId);

  console.log("user data : ", props.userData);

  return (
    <div style={{ display: 'flex' }}>

      <Contact  donatorId={donatorId} />
      
      
    </div>
  );
}

export default Chatbox;


// import React from 'react';
// import Contact from '../../Contact/Contact';
// import ChatContainer from '../../ChatContainer/ChatContainer';

// function Chatbox({ userData, location }) {
//   const donatorId = location?.state?.donatorId;

//   return (
//     <div style={{ display: 'flex' }}>
//       <ChatContainer userData={userData} donatorId={donatorId} />
//       <Contact userData={userData} donatorId={donatorId} />
//     </div>
//   );
// }

// export default Chatbox;