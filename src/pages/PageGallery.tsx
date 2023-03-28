import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { useStore } from "effector-react";
import { esImages } from "../stores";
import { File } from "../models";
import { Gallery as Route } from "../routes/routes";
import { Loading } from "../components";

export function PageGallery(props: {}) {
  const imgs = useStore(esImages.store);
  const routeLoaded = useStore(Route.loaded.$isOpened);
  if (!routeLoaded) {
    return <Loading />;
  }
  return (
    <Row>
      {imgs.map((img) => (
        <Col lg={4} sm={12} key={img._id} style={{ padding: "0.2em" }}>
          <GalleryCard file={img} />
        </Col>
      ))}
      <Col lg={4} sm={12} style={{ padding: "0.2em" }}>
        <UploadForm />
      </Col>
    </Row>
  );
}

function GalleryCard(props: { file: File }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    setShow(false);
    esImages.delete(props.file._id);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Card>
        <Card.Img variant="top" src={props.file.url} />
        <Card.ImgOverlay>
          <Button variant="outline-danger" size="sm" onClick={handleShow}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.ImgOverlay>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure delete image</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function UploadForm(props: {}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    const files = ((e.target as HTMLFormElement)[0] as HTMLInputElement)
      .files as FileList;

    fd.append("file", files[0], files[0].name);
    esImages.add(fd);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Card>
        <Card.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload new file</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Card.Body>
      </Card>
    </form>
  );
}
