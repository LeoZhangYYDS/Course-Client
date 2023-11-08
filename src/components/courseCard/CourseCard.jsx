import { Card, Button } from "react-bootstrap"; //import the Card and Button components from react bootstrap
import { useMutation, gql } from "@apollo/client"; //import the useMutation hook from apollo client
import { Link } from "react-router-dom"; //import the Link component
import { DELETE_COURSE } from "../../graphQL/mutations/mutatuins"; //import the delete journal entry mutation

//This component is used to display the journal entries on the home page
function CourseCard({ data, user, refetch }) {
  //useMutation hook to delete journal entries
  console.log(data);
  const [deleteJournalEntry] = useMutation(DELETE_COURSE, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    //update the cache to remove the deleted journal entry
    update(cache) {
      cache.modify({
        fields: {
          //remove the deleted journal entry from the journalEntries array
          //existingEntries is the array of journal entries
          //readField is a function that reads a field from the cache
          Courses(existingEntries = [], { readField }) {
            //find the journal entry that was deleted and remove it from the array
            return existingEntries.filter(
              (entryRef) => data.id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });

  //handle delete function for journal entries
  const handleDelete = async () => {
    console.log(data.id);
    try {
      //delete the journal entry
      //deleteJournalEntryId is the id of the journal entry to be deleted
      const result = await deleteJournalEntry({
        variables: { deleteCourseId: data.id },
      });
      refetch();
      if (result.errors) {
        //if there are errors, throw an error
        throw new Error(result.errors[0].message);
      }
    } catch (error) {
      console.error(`Failed to delete journal entry: ${error.message}`);
    }
  };

  return (
    <Card className="text-black m-3">
      <Card.Body>
        <div className="d-flex">
          {/* /Displays the mood emoji */}
          {/* Displays the title and date of the journal entry */}
          <div className="title">
            <Card.Title className="bold">{data.title}</Card.Title>
          </div>
          {/* /Displays the title and date of the journal entry */}
          {/* Displays the edit and delete buttons */}
          <div className="ms-auto">
            <Link
              to={`course/edit/${data.id}`}
              variant="dark"
              size="sm"
              className="btn btn-dark rounded-circle inner-shadow mx-2"
            >
              <i className="bi bi-scissors text-white"></i>
            </Link>
            <Button
              variant="dark"
              size="sm"
              className="rounded-circle inner-shadow"
              onClick={handleDelete}
            >
              <i className="bi bi-trash2-fill text-white"></i>
            </Button>
            {/* /Displays the edit and delete buttons */}
          </div>
        </div>
        {/* Displays the body of the journal entry */}
        <Card.Text className="mt-2">Description: {data.description}</Card.Text>
        <Card.Text className="mt-2">${data.price}</Card.Text>
        <Card.Text className="mt-2">Category: {data.category}</Card.Text>
        {/* /Displays the body of the journal entry */}
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
