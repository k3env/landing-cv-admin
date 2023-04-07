import { useStore } from "effector-react";
import { esProjects } from "~stores";
import {
  Project as RouteSingle,
  Projects as Route,
  ProjectNew as RouteNew,
} from "~routes";
import { Loading } from "~components";
import { File, Project } from "~models";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLink } from "atomic-router-react";

export function PageProjects(props: {}) {
  const projects = useStore(esProjects.store);
  const isLoaded = useStore(Route.loaded.$isOpened);
  if (!isLoaded) return <Loading />;

  return <ProjectsGrid projects={projects} />;
}

function ProjectsGrid(props: { projects: Project[] }) {
  const { projects } = props;
  return (
    <Row>
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
      <Col>
        <Button variant="success" onClick={() => RouteNew.route.open()}>
          Add new
        </Button>
      </Col>
    </Row>
  );
}

function ProjectCard(props: { project: Project }) {
  const [imgUrl, setUrl] = useState("https://placehold.co/600x400");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/files/${props.project.cover}`)
      .then((r) => r.json())
      .then((v: { data: File }) => setUrl(v.data.url));
  }, []);
  const projectLink = useLink(RouteSingle.route, { id: props.project._id });
  return (
    <Col sm={4}>
      <Card>
        <Card.Header>
          <h4>{props.project.title}</h4>
        </Card.Header>
        <Card.Img src={imgUrl} />
        <Card.Footer>
          <Stack gap={2} direction="horizontal">
            <Button
              variant="danger"
              onClick={() => {
                if (props.project._id) esProjects.delete(props.project._id);
              }}
            >
              Delete
            </Button>
            <Button as="a" href={projectLink} variant="warning">
              Edit
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </Col>
  );
}
