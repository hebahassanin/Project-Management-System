import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Confirmation({ show, onClose, onConfirm, title, message }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> Delete {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {message}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
