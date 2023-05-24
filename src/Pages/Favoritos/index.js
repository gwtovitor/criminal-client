import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const images = [
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        profile: 'Lidia Beatriz',
        date: '05/02/2023',
        price: 'R$ 15,00',
        hora: '22:00',
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        profile: 'Luiz',
        date: '01/01/2020',
        price: 'R$ 50,00',
        hora: '18:10',
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        profile: 'Junior Martins',
        date: '05/05/2022',
        price: 'R$ 7,00',
        hora: '15:30',
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        profile: 'Vitor Augusto',
        date: '10/05/2022',
        price: 'R$ 30,00',
        hora: '15:22',
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        profile: 'Vitor Augusto',
        date: '10/05/2022',
        price: 'R$ 30,00',
        hora: '15:22',
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        profile: 'Vitor Augusto',
        date: '10/05/2022',
        price: 'R$ 30,00',
        hora: '15:22',
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        profile: 'Jose',
        date: '09/04/2023',
        price: 'R$ 50,00',
        hora: '16:40',
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        profile: 'Vinicius',
        date: '07/11/2023',
        price: 'R$ 15,00',
        hora: '19:58',
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        profile: 'Lucas',
        date: '04/08/2023',
        price: 'R$ 10,00',
        hora: '14:10',
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        profile: 'Carlos',
        date: '15/05/2023',
        price: 'R$ 5,00',
        hora: '16:30',
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        profile: 'Joao',
        date: '05/12/2022',
        price: 'R$ 10,00',
        hora: '00:22',
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
];

const MyGallery = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const openModal = (index) => {
        setSelectedImage(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="ms-4 mb-5 mt-3">

            <div className='mb-5'>
                <strong>Galeria de compras</strong>
            </div>


            <div class="row">
                {images.map((images, index) => {
                    return (
                        <div class="col-lg-4 col-md-12">
                            <img
                                src={images.src}
                                class="w-100 shadow-1-strong rounded mb-1"
                                alt="Boat on Calm Water"
                                style={{margin:'0', padding:'0', cursor:'pointer'}}
                                width={images.width}
                                height={images.height}
                                onClick={()=>{openModal(index)}}
                                
                            />
                            <div>
                                <p style={{margin:'0'}}>Autor: {images.profile}</p>
                                <p style={{margin:'0'}}>Data: {images.date}</p>
                                <p style={{margin:'0'}}>Horário da compra: {images.hora}</p>
                                <p className='mb-4' >Valor: {images.price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>


            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <img src={images[selectedImage].src} className="img-fluid" alt="Imagem Modal" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyGallery;
