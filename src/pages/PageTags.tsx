import { useStore } from "effector-react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Loading } from "~components";
import { Tag } from "~models";
import { Tags as Route } from "~routes";
import { esTags } from "~stores";

export function PageTags(props: {}) {
  const tags = useStore(esTags.store);
  const isLoaded = useStore(Route.loaded.$isOpened);
  if (isLoaded) {
    return <Tags tags={tags} />;
  } else {
    return <Loading />;
  }
}

function Tags(props: { tags: Tag[] }) {
  const { tags } = props;
  return (
    <Container>
      <Row>
        {tags.map((v) => (
          <Col xs={6} sm={6} md={4} lg={3} key={v._id}>
            <TagComponent tag={v} />
          </Col>
        ))}
        <Col xs={6} sm={6} md={4} lg={3}>
          <TagForm />
        </Col>
      </Row>
    </Container>
  );
}

function TagComponent(props: { tag: Tag }) {
  return (
    <Card style={{ marginBottom: "6px" }}>
      <Card.Body>
        <Stack gap={2} direction="horizontal">
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              value={props.tag.label}
              disabled
            />
          </Form.Group>
          <Button
            size="sm"
            variant="danger"
            onClick={() => esTags.delete(props.tag._id)}
          >
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
function TagForm(props: {}) {
  const [label, setLabel] = useState("");
  const handleSubmit = () => esTags.add(label).then(() => setLabel(""));
  return (
    <Card style={{ marginBottom: "6px" }}>
      <Card.Body>
        <Stack gap={2} direction="horizontal">
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter tag label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Form.Group>
          <Button size="sm" variant="success" onClick={handleSubmit}>
            Add
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
