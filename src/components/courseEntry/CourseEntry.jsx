// React
import { Controller, useForm } from "react-hook-form"; //React Hook Form
import Joi from "joi"; //Joi Validation Library
import { joiResolver } from "@hookform/resolvers/joi"; //Joi Resolver for React Hook Form. - This is needed to use Joi with React Hook Form
// Apollo Client
import { useMutation, gql } from "@apollo/client"; //Apollo Client Hooks - useMutation
import { CREATE_COURSE } from "../../graphQL/mutations/mutatuins"; //GraphQL Mutation
// React Bootstrap
import {
  Card,
  Col,
  Form,
  Row,
  Button,
  Alert,
  FormControl,
} from "react-bootstrap"; //React Bootstrap

function CourseEntry(props) {
  const userData = props.user; //User Data from App.js
  //Joi Validation
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(2).max(2000).required(),
    category: Joi.string().required(),
    price: Joi.number().integer().min(0).max(9999).required(),
  });

  //useForm
  //control - React Hook Forms Controller this is used to control the input
  //handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  //formState - React Hook Forms formState this is used to access the form state
  //reset - React Hook Forms reset function this is used to reset the form
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      title: "",
      price: "Price",
      description: "",
      category: "",
    },
  });

  //onSubmit
  const onSubmit = async (data) => {
    data.user = userData.id; //Add the user id to the data object
    const { title, description, category, price, user } = data; //Destructure the data object
    const token = userData.token; //Get the token from the user data
    await createJournal({ title, description, category, price, user }, token); //Call the createJournal function and pass in the data object and the token
    props.refetch();
  };

  //GraphQL Mutation for creating a journal entry
  const [createJournalEntry] = useMutation(CREATE_COURSE, {
    //update the cache to add the new journal entry
    update(cache, { data: { createJournalEntry } }) {
      cache.modify({
        fields: {
          //add the new journal entry to the journalEntries array
          Courses(existingEntries = []) {
            //create a new journal entry reference
            const newEntryRef = cache.writeFragment({
              data: createJournalEntry,
              fragment: gql`
                fragment NewCourse on Course {
                  id
                  title
                  description
                  category
                  price
                  createdAt
                  updatedAt
                  user
                }
              `,
            });
            //return the new journal entry reference and the existing journal entries
            return [...existingEntries, newEntryRef];
          },
        },
      });
    },
  });
  //This function is used to create a journal entry
  const createJournal = async (data, token) => {
    //Destructure the data object
    const { title, description, category, price, user } = data;

    try {
      //Send the mutation request with data as input
      const result = await createJournalEntry({
        variables: {
          input: {
            title,
            description,
            category,
            price,
            user,
          },
        },
        context: {
          headers: {
            authorization: `${token}`,
          },
        },
      });
      console.log(result.data.createJournalEntry);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className={"shadow text-white m-3 "}>
      <Card.Body>
        <Form noValidate="noValidate" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center">
            {/* Displays emoji based on mood score */}

            {/* /Displays emoji based on mood score */}
            <div className="title w-100">
              {/* Why Text Box */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  // Boostrap input text box component
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Enter title"
                    aria-label="why"
                    aria-describedby="why do you feel this way"
                    className="bold mb-2 w-100 form-shadow"
                    size="lg"
                  />
                )}
              />
              {/* Error output */}
              {/* /Why Text Box */}

              {/* Date */}
              <Card.Subtitle className="pt-1 text-muted bold">
                <i className="bi bi-calendar-event"></i>{" "}
                {new Date().toLocaleString()}
              </Card.Subtitle>
              {/* /Date */}
            </div>
          </div>
          {/* Error output */}
          {errors.title && (
            <Alert variant="dark" className="mt-2 mb-0">
              {errors.title.message}
            </Alert>
          )}
          {/* Error output */}
          <Controller
            name="price"
            control={control}
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
          {/* Why Text Box */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                as="textarea"
                rows={3}
                placeholder="Write a description of the course"
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
          {/* /Error output */}
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
          {/* Submit Button */}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseEntry;
