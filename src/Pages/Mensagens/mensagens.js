import React, { useState, useEffect } from 'react';
import './mensagens.css';
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import { Image } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';


const messages = [
  {
    id: 1,
    author: 'Lidia',
    message: 'Hello',
    time: '10:00',
    picture: lidia,
  },
  {
    id: 2,
    author: 'Vitor',
    message: 'Hi, how are you?',
    time: '10:01',
    picture: vitor,
  },
  {
    id: 3,
    author: 'Luiz',
    message: 'I am good, thank you. How about you?',
    time: '10:02',
    picture: luiz,
  },
  {
    id: 4,
    author: 'Junior',
    message: 'I am doing well, thanks for asking',
    time: '10:03',
    picture: jr,
  },
];

function Mensagens() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [lastMessages, setLastMessages] = useState({});
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedLastMessages = {};

    messages.forEach((message) => {
      updatedLastMessages[message.author] = message.message;
    });

    setLastMessages(updatedLastMessages);
  }, []);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleContactClick(contact) {
    setSelectedContact(contact);
  }

  function handleMessageChange(event) {
    setNewMessage(event.target.value);
  }

  function handleSendMessage() {
    if (!newMessage || !selectedContact) {
      return;
    }

    const newId = selectedContact.messages.length + 1;
    const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessageObj = {
      id: newId,
      author: 'Me',
      message: newMessage,
      time: newTime,
    };

    const newMessages = [...selectedContact.messages, newMessageObj];
    setSelectedContact({ ...selectedContact, messages: newMessages });
    setNewMessage('');

    setLastMessages({
      ...lastMessages,
      [selectedContact.name]: newMessage,
    });
  }


  return (
    <div className="app">
      <div className={`contacts ${showMenu ? 'show' : ''}`}>
        <h2 style={{ textAlign: 'center' }}>Mensagens</h2>

        <div className='btn-postar text-center mb-2'>
          <a className='btn btn-info text-white' href="./postmsg">Postar Mensagem</a>
        </div>
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.author} data-name={message.author} onClick={() => {
              handleContactClick({ name: message.author, messages: [message] });
              setShowMenu(false);
            }}>
              <Image className='avatar-message' src={message.picture} alt={`${message.author}'s profile picture`} />
              <span className="author">{message.author}</span>
              <span className="last-message">
                {message.message.length > 10 ? message.message.slice(0, 10) + "..." : message.message}
              </span>

            </li>
          ))}
        </ul>

      </div>

      <button className="hamburger-menu" onClick={toggleMenu}>
        <span className="hamburger-icon"></span>
      </button>
      <div className="messages">
        {selectedContact ? (
          <div>
            <h2>{selectedContact.name}</h2>
            <div className="message-list-container">
              <ul>
                {selectedContact.messages.map((message) => (
                  <li key={message.id} className={message.author === 'Me' ? 'sent' : 'received'}>
                    <span className="message-content">{message.message}</span>
                    <span className="message-time">{message.time}</span>
                  </li>
                ))}

              </ul>
            </div>

            <div className="new-message">
              <input type="text" value={newMessage} onChange={handleMessageChange} />
              <IconButton>
                <AddPhotoAlternateIcon />
              </IconButton>
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <p>Selecione um contato para enviar uma mensagem!</p>
        )}
      </div>

    </div>
  );
}

export default Mensagens;
