import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Profile } from "../models/Profile.model";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useStore } from "effector-react";
import { $profile, fx_updateProfile } from "../stores/storeProfile";
import { RouteProfileImagesLoaded } from "../routes/routes/RouteProfile";
import { Loading } from "../components/Loading";
import { $images } from "../stores/storeImages";
import { File } from "../models/File.model";
import { RouteGallery } from "../routes/routes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function PageProfile(props: {}) {
  const pdata = useStore($profile);
  const pageLoaded = useStore(RouteProfileImagesLoaded.$isOpened);
  if (!pageLoaded) {
    return <Loading />;
  }
  if (pdata === null) {
    const profile: Profile = {
      name: "",
      profilePhoto: "",
      about_header: "",
      about_photo: "",
      about_summary: "",
      address: "",
      degree: "Intern",
      birth: "",
      email: "",
      experience: "",
      phone: "",
      isFreelance: false,
    };
    return <ProfileForm profile={profile} />;
  }
  return <ProfileForm profile={pdata} />;
}

export function ProfileForm(props: { profile: Profile }) {
  const form = useForm<Profile>({
    defaultValues: props.profile,
  });
  const imgs = useStore($images);
  const onSubmit: SubmitHandler<Profile> = (data) => fx_updateProfile(data);
  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Row>
        <Col sm={8}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...form.register("name")}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className="mb-3">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              {...form.register("birth")}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <ImageSelect
            usePreview
            label="Select profile photo"
            imgs={imgs}
            reg={form.register("profilePhoto")}
            value={form.watch("profilePhoto")}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>About me (header)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter some text"
              {...form.register("about_header")}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>About me (summary)</Form.Label>
            <ReactQuill
              theme="snow"
              value={form.watch("about_summary")}
              onBlur={(range, src, editor) => {
                form.setValue("about_summary", editor.getHTML());
              }}
              style={{ minHeight: "17rem" }}
            />
          </Form.Group>
          {/* <div>{ReactHtmlParser(form.watch("about_summary"))}</div> --- as rendering sample */}
        </Col>
        <Col>
          <ImageSelect
            usePreview
            label="Select About photo"
            imgs={imgs}
            reg={form.register("about_photo")}
            value={form.watch("about_photo")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>My degree</Form.Label>
            <Form.Select {...form.register("degree")}>
              <option>Select degree</option>
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>My experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter some text"
              {...form.register("experience")}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...form.register("email")}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Phone number"
              {...form.register("phone")}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              {...form.register("address")}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="I'm freelancer"
          {...form.register("isFreelance")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

function ImageSelect(props: {
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
            onClick={() => RouteGallery.open()}
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
