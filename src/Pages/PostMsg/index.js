import React, { useState, useEffect } from 'react';
import './postmsg.css';
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
export default function PostMsg() {
    const [images, setImages] = useState([]);
    const [filteredMessages, setfilteredMessages] = useState([]);


    const [selectedCount, setSelectedCount] = useState(0);

    function handleCheckboxChange(e) {
        const isChecked = e.target.checked;
        const count = isChecked ? selectedCount + 1 : selectedCount - 1;
        setSelectedCount(count);
        if (count > 5) {
            e.target.checked = false;
            setSelectedCount(5);
            toast.warn('Você so pode selecionar até 5 capas', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);

            reader.onload = (e) => {
                newImages.push({ url: e.target.result });
                setImages(newImages);
            };
        }
    };

    const messages = [
        {
            id: 1,
            author: 'Lidia',
            message: 'Hello',
            time: '10:00',
            picture: vitor,
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
        {
            id: 5,
            author: 'Carlos',
            message: 'I am doing well, thanks for asking',
            time: '10:03',
            picture: jr,
        },
        {
            id: 6,
            author: 'Joao',
            message: 'I am doing well, thanks for asking',
            time: '10:03',
            picture: vitor,
        },
        {
            id: 7,
            author: 'Joao',
            message: 'I am doing well, thanks for asking',
            time: '10:03',
            picture: luiz,
        },


    ];




    function handleSearch(event) {
        const searchValue = event.target.value.toLowerCase();
        const filtered = messages.filter((message) => {
            return message.author.toLowerCase().includes(searchValue);
        });
        setfilteredMessages(filtered);
    }



    return (
        <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
            <div className='row mb-4'>
                <strong>Publicar Mensagem</strong>
            </div>
            <div className='row'>
                <div className='row'>
                    <div className='col-12'>
                        <textarea class="form-control" aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div className='row mb-3 mt-2'>
                    <div className='col-12'>
                        <div class="input-group">
                            <span class="input-group-text">Procurar Contato</span>
                            <input type="text" class="form-control" onChange={handleSearch} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div style={{ height: '180px', overflowY: 'scroll' }}>
                            <ul className="list-group list-group-light mt-2 list-unstyled">
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map((message) => (

                                        <li key={message.id} data-name={message.author}>
                                            <li class="list-group-item">
                                                <img src={message.picture} class="rounded-circle" style={{ width: '30px', marginRight: '10px' }} alt="Avatar" />
                                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                                                {message.author}
                                            </li>
                                        </li>
                                    ))
                                ) : (
                                    messages.map((message) => (
                                        <li key={message.id} data-name={message.author}>
                                            <li class="list-group-item">
                                                <img src={message.picture} class="rounded-circle" style={{ width: '30px', marginRight: '10px' }} alt="Avatar" />
                                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                                                {message.author}
                                            </li>
                                        </li>
                                    ))
                                )}

                            </ul>
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='d-grid'>
                        <input
                            class="form-control"
                            type="file"
                            id="formFileMultiple"
                            multiple
                            onChange={handleFileInputChange}
                        />
                    </div>
                </div>
                {images.length > 0 && (
                    <div className='row mt-3'>
                        <div className='d-grid text-center'>
                            <span>Marque a checkbox para selecionar até 5 capas</span>
                        </div>
                    </div>
                )}



                <div className='row mt-3 col-20 d-grid'>

                    <div className='' style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>

                        {images.map((image, index) => (
                            <div className="col-1 m-3 p-2" key={image.url}>
                                <div className="d-flex flex-column align-items-center mb-3">
                                    <img
                                        src={image.url}
                                        className='m-2 img-fluid custom-img'
                                        style={{ minWidth: '50px' }}
                                        alt=""
                                    />

                                    <div className="form-check form-check-inline m-1">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            onClick={handleCheckboxChange}
                                        />


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>





                <div className='row mt-3'>
                    <div className='col-12 d-grid'>
                        <a className='btn btn-info text-white' href="#">Publicar para Todos</a>
                    </div>
                </div>
            </div>
        </div>
    )


}




/* {images.map((image) => (
                            <div className="col-1 m-2" key={image.url} >
                                <img
                                    src={image.url}
                                    style={{ width: "100px", height: "100px", paddingRight:'2px'}}
                                    alt=""
                                />
                            </div>
                        ))}*/