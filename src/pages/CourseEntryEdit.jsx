//React

import { Controller, useForm } from "react-hook-form"; // React Hook Forms
import Joi from "joi"; // Joi Validation
import { joiResolver } from "@hookform/resolvers/joi"; // Joi Resolver for React Hook Forms
import { useParams, useNavigate } from "react-router-dom"; // React Router
//Apollo Client
import { useMutation, useQuery } from "@apollo/client"; // Apollo Client Hooks - useMutation
import { GET_COURSE } from "../graphQL/queries/queries"; // GraphQL Query
import { UPDATE_COURSE } from "../graphQL/mutations/mutatuins"; // GraphQL Mutation
//React Bootstrap
import { Card, Col, Form, Row, Button, Alert } from "react-bootstrap";
import { useEffect } from "react";

// This component is used to edit journal entries
function CourseEntryEdit(props) {
  const userData = props.user; // User Data from App.js
  const { CourseId } = useParams(); // Get the journal entry id from the url, 需要和App.js里的一样
  const navigate = useNavigate(); // Navigate function to navigate to a different page

  // GraphQL Query to get the journal entry
  // GET_JOURNAL_ENTRY - GraphQL Query
  // journalEntryId - The id of the journal entry to get
  // userData.token - The token from the user data
  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { getCourseId: CourseId },
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  // GraphQL Mutation for updating a journal entry
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    // update the cache to update the journal entry
    update(cache, { data: { updateCourse } }) {
      // read the journal entry from the cache

      const { course } = cache.readQuery({
        query: GET_COURSE,
        variables: { id: CourseId },
      }) || { course: null };

      // write the updated journal entry to the cache
      if (course) {
        // write the updated journal entry to the cache
        cache.writeQuery({
          query: GET_COURSE,
          variables: { id: CourseId },
          data: {
            course: {
              ...course,
              ...updateCourse,
            },
          },
        });
      }
    },
  });

  // onSubmit - Called when the form is submitted
  const onSubmit = async (formData) => {
    const { title, description, category, price } = formData;
    console.log(formData);

    try {
      // update the journal entry
      await updateCourse({
        variables: {
          updateCourseId: CourseId,
          input: { title, description, category, price, user: userData.id },
        },

        context: {
          headers: {
            authorization: `${userData.token}`,
          },
        },
      });

      // redirect to journal entry page
      navigate("/");
    } catch (error) {
      console.error(`Failed to update course: ${error.message}`);
    }
  };

  // JOI Validation for React-Hook-Forms
  const schema = Joi.object({
    title: Joi.string().min(2).max(100),
    description: Joi.string().min(2).max(2000),
    category: Joi.string(),
    price: Joi.number().integer().min(0).max(9999),
  });

  // React-Hook-Forms
  // control - React Hook Forms Controller this is used to control the input
  // watch - React Hook Forms watch function this is used to watch an input
  // handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  // setValue - React Hook Forms setValue function this is used to set the value of an input
  // formState - React Hook Forms formState this is used to access the form state
  // resolver - React Hook Forms resolver this is used to validate the form
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  //I need this as the mood loads in a few secs after the page loads and I need to set the value of the mood to the current mood
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <p>Loading... 🤔</p>;
  if (error) return <p>Error 😭</p>;

  return (
    <Card className="shadow text-white m-3 ">
      <Card.Body>
        <Form noValidate="noValidate" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center">
            {/* Title Text Box */}
            <div className="title w-100">
              <Controller
                name="title"
                control={control}
                defaultValue={data.getCourse.title}
                render={({ field }) => (
                  <Form.Control type="text" placeholder="Title" {...field} />
                )}
              />

              {errors.title && (
                <Alert variant="dark">{errors.title.message}</Alert>
              )}
            </div>
            {/* /Title Text Box */}
          </div>

          <Controller
            name="price"
            control={control}
            defaultValue={data.getCourse.price}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                type="number"
                placeholder="price"
                aria-label="why"
                className="bold mb-2 w-100 form-shadow"
                size="lg"
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            defaultValue={data.getCourse.category}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                type="text"
                placeholder="category"
                aria-label="why"
                className="bold mb-2 w-100 form-shadow"
                size="lg"
              />
            )}
          />

          {/* /Range Slider for Mood */}
          {/* Why Text Box */}
          <Controller
            name="description"
            control={control}
            defaultValue={data.getCourse.description}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                as="textarea"
                rows={3}
                placeholder="Why are you feeling this way? What happened?"
                aria-label="description"
                className="mb-2 w-100 form-shadow"
              />
            )}
          />
          {/* Error output */}
          {errors.body && (
            <Alert variant="dark" className="mt-2">
              {errors.body.message}
            </Alert>
          )}
          {/* /Why Text Box */}
          {/* Submit Button */}
          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100"
            type="submit"
          >
            Submit <i className="bi bi-send-fill"></i>
          </Button>
          {/* /Submit Button */}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseEntryEdit;
