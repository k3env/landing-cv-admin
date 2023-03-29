import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";
import { Gallery } from "~routes";
import { File } from "~models";

export function ImageSelect(props: {
  imgs: File[];
  reg: UseFormRegisterReturn<string>;
  value: string;
  label?: string;
  usePreview: boolean;
}) {
  const { imgs, value, reg, label } = props;

  const selectedImage = imgs.find((v) => v._id === value);
  return (
    <Row>
      <Col sm={selectedImage && props.usePreview ? 6 : 12}>
        <Form.Group className="mb-3">
          <Form.Label>{label && label}</Form.Label>
          <Form.Select {...reg}>
            {imgs.map((v) => (
              <option value={v._id} key={v._id}>
                {v.name}
              </option>
            ))}
          </Form.Select>
          <Button
            onClick={() => Gallery.route.open()}
            variant={"success"}
            style={{ marginTop: "4px" }}
          >
            Add new image
          </Button>
        </Form.Group>
      </Col>
      {selectedImage && props.usePreview && (
        <Col sm={6}>
          <Card>
            <Card.Img src={selectedImage.url} />
          </Card>
        </Col>
      )}
    </Row>
  );
}
