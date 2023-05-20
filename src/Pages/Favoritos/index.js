import React, { useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const images = [
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 212,
        tags: [
            { value: "Verts", title: "Verts" },

        ],
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Feed", title: "Feed" },
        ],
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        tags: [

            { value: "Mensagem", title: "Mensagem" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212,
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


            <Gallery images={images} onClick={openModal} enableImageSelection={false} />

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
