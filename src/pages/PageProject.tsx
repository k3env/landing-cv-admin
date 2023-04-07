import { useStore } from "effector-react";
import { esImages, esProjects, esTags } from "~stores";
import { Project } from "../models/Project.model";
import { Project as Route, Projects, ProjectNew as New } from "~routes";
import { Loading } from "../components/Loading";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  FormSelect,
  Row,
  Stack,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { File, Tag } from "~models";
import { useState } from "react";

export function PageProject(props: {}) {
  const project = useStore(esProjects.single);
  const isLoaded = useStore(Route.loaded.$isOpened);
  if (!isLoaded || project === null) return <Loading />;
  return <ProjectForm project={project} />;
}

export function PageProjectNew(props: {}) {
  const isLoaded = useStore(New.loaded.$isOpened);
  const empty: Project = {
    cover: "",
    description: "",
    images: [],
    tags: [],
    title: "",
  };
  if (!isLoaded) return <Loading />;
  return <ProjectForm project={empty} />;
}

function ProjectForm(props: { project: Project }) {
  const { project } = props;
  const imgs = useStore(esImages.store);
  const tags = useStore(esTags.store);
  const form = useForm<Project>({
    defaultValues: project,
  });
  const onSubmit: SubmitHandler<Project> = (data) =>
    esProjects.post(data).then(() => Projects.route.open());
  const filteredImages = imgs.filter(
    (i) => form.getValues("images").findIndex((v) => i._id === v) === -1
  );
  const filteredTags = tags.filter(
    (t) => form.getValues("tags").findIndex((v) => t._id === v) === -1
  );
  return (
    <Container>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                {...form.register("title")}
              />
            </Form.Group>
          </Col>
          <Col sm={8}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                theme="snow"
                value={form.watch("description")}
                onBlur={(range, src, editor) => {
                  form.setValue("description", editor.getHTML());
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Card>
                <Card.Img
                  src={
                    imgs.find((i) => i._id === form.watch("cover"))?.url ??
                    "https://placehold.co/600x400?text=Select%20Image"
                  }
                />
                <Card.Footer>
                  <Stack direction="horizontal" gap={1}>
                    <Form.Select {...form.register("cover")} size="sm">
                      <option>Pick image</option>
                      {imgs.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Stack>
                </Card.Footer>
              </Card>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Row>
                {form.watch("images").map((iid) => (
                  <Col sm={3} key={iid}>
                    <PhotoCard
                      img={imgs.find((v) => v._id === iid)!}
                      onDelete={() => {
                        const imgs = form.getValues("images");
                        form.setValue(
                          "images",
                          imgs.filter((v) => v !== iid)
                        );
                      }}
                    />
                  </Col>
                ))}
                <Col sm={3}>
                  <AddImageForm
                    images={filteredImages}
                    onAdd={(id) => {
                      const imgs = form.getValues("images");
                      form.setValue("images", [...imgs, id]);
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Stack direction="horizontal" gap={2}>
                {form.watch("tags").map((tid) => (
                  <TagBadge
                    key={tid}
                    tag={tags.find((v) => v._id === tid)!}
                    onDelete={() =>
                      form.setValue(
                        "tags",
                        form.getValues("tags").filter((v) => v !== tid)
                      )
                    }
                  />
                ))}
                <AddTagForm
                  tags={filteredTags}
                  onAdd={(id) =>
                    form.setValue("tags", [...form.getValues("tags"), id])
                  }
                />
              </Stack>
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group className="mb-3">
              <Button type="submit">Save</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

function PhotoCard(props: { img: File; onDelete: () => void }) {
  return (
    <Card>
      <Card.Img src={props.img.url} alt={props.img.name} />
      <Card.ImgOverlay>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => props.onDelete()}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}
function TagBadge(props: { tag: Tag; onDelete: () => void }) {
  return (
    <ButtonGroup>
      <Button variant="primary">{props.tag.label}</Button>
      <Button variant="danger" onClick={() => props.onDelete()}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </ButtonGroup>
  );
}
function AddTagForm(props: { tags: Tag[]; onAdd: (id: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <ButtonGroup>
      <FormSelect value={value} onChange={(e) => setValue(e.target.value)}>
        <option>Pick tag</option>
        {props.tags.map((v) => (
          <option key={v._id} value={v._id}>
            {v.label}
          </option>
        ))}
      </FormSelect>
      <Button variant="success" onClick={() => props.onAdd(value)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </ButtonGroup>
  );
}

function AddImageForm(props: { images: File[]; onAdd: (id: string) => void }) {
  const [value, setValue] = useState("");
  const selected = props.images.find((v) => v._id === value);
  return (
    <Card>
      <Card.Img
        src={
          selected?.url ?? "https://placehold.co/600x400?text=Select%20Image"
        }
      />
      <Card.Footer>
        <Stack direction="horizontal" gap={1}>
          <Form.Select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            size="sm"
          >
            <option>Pick image</option>
            {props.images.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </Form.Select>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              if (value !== "") props.onAdd(value);
              setValue("");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}
