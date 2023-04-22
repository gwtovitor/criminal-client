import React, { useState } from 'react';
import './menssagens.css';
import vocesabia from './Images/vocesabia.jpg';
import luiz from './Images/luiz.jpg';
import vitor from './Images/profile.png';
import lidia from './Images/lidia.jpg';
import jr from './Images/junior.jpg';

function Menssagens() {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const messages = [
        {
            _id: '1',
            profile: vitor,
            author: 'Vitor Augusto',
            user: 'gwtovitor_',
            msg: 'Ola Bom dia',
        },
        {
            _id: '2',
            author: 'Joseraldo Martins',
            profile: jr,
            user: 'joseraldo_martins',
            msg: 'Oii boa tarde',
        },
        {
            _id: '3',
            author: 'Luiz',
            profile: luiz,
            user: 'luiz_',
            msg: 'ASKDASDSAD',
        },
        {
            _id: '4',
            author: 'Lidia Beatriz',
            profile: lidia,
            user: 'lidiabzz',
            msg: 'dale, manda a boa',
        },
        {
            _id: '5',
            author: 'Voce Sabia?',
            profile: vocesabia,
            user: 'vc_sabia',
            msg: 'Entre em contato',
        },
        {
            _id: '6',
            author: 'Voce Sabia?',
            profile: vocesabia,
            user: 'vc_sabia',
            msg: 'Qual valor?',
        },
    ];

    const handleSelectMessage = (id) => {
        setSelectedMessage(id);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        // Aqui você pode enviar a mensagem digitada pelo usuário
    };

    return (
        <div className="messages-container">
            <div className="messages-list">
                {messages.map((message) => (
                    <div
                    key={message._id}
                    className={`message-item ${selectedMessage === message._id ? 'selected-message' : ''}`}
                    onClick={() => handleSelectMessage(message._id)}
                  >
                  
                        <div className="message-profile">
                            <img className="profile-img" src={message.profile} alt="" />
                            <div className="profile-info">
                                <h6 className="profile-name">{message.author}</h6>
                                <p className="profile-user">{message.user}</p>
                       
                            </div>
                        </div>
                    
                    </div>
                ))}
            </div>
            <div className="message-details">
                {selectedMessage ? (
                    <>
                        <div className="message-header">
                        <img className="profile-img-selected" src= {messages.find((m) => m._id === selectedMessage).profile}alt="" />
                            <h3 className="profile-name">
                                {messages.find((m) => m._id === selectedMessage).author}
                            </h3>
                        </div>
                        <div className="message-content">
                            <p>
                                {messages.find((m) => m._id === selectedMessage).msg}
                            </p>
                        </div>
                        <footer>
                            <form className='menssagem' onSubmit={handleSendMessage}>
                            <textarea
                                className="message-input"
                                placeholder="Digite sua mensagem..."
                            />
                            <button ctype="button" id='btn-home' class="btn btn-secondary">
                                Enviar
                            </button>
                        </form>
                        </footer>
                    </>
                ) : (
                    <p className="no-message-selected">Nenhuma mensagem selecionada</p>
                )}
            </div>
        </div>
    );
}

export default Menssagens;
