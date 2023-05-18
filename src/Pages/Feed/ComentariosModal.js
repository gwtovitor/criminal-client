import React, { useState } from 'react';
import { Avatar } from '@mui/material';

const CommentModal = ({ comments, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div>
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Comentários</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="comment-list">
                {comments.map(([nome, comentario, id, picture]) => (
                  <div style={{ display: 'flex', flexDirection: 'row', margin: '5px', alignItems: 'center' }} key={id}>
                    <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Avatar style={{ marginRight: '6px' }} src={comentario.picture} />
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p style={{ fontWeight: 'bold' }}>{nome} </p>
                        <p>: {comentario.comentario}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add-comment">
                <input type="text" value={newComment} onChange={handleCommentChange} />
                <button className="btn btn-primary" onClick={handleAddComment}>Adicionar Comentário</button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
