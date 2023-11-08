import { useQuery } from "@apollo/client"; // The useQuery hook allows send a query and get the response
import CourseEntry from "../components/courseEntry/CourseEntry"; // Import JournalEntry component
import CourseCard from "../components/courseCard/CourseCard"; // Import JournalCard component
import { useEffect } from "react";
import { GET_COURSES } from "../graphQL/queries/queries"; // Import GET_JOURNAL_ENTRIES query

function Course({ user }) {
  //The useQuery hook allows send a query and get the response
  //Loading = true while the request is in progress
  //Error = true if the request fails
  //Data = the response from the server
  //Refetch = a function that refetches the query

  //This query is protected by the JWT token. A valid token must be sent in the request header
  const { loading, error, data, refetch } = useQuery(GET_COURSES, {
    context: {
      headers: {
        authorization: user.token,
      },
    },
  });

  useEffect(() => {
    refetch(); // Refetch the query
  }, []);

  if (loading) return <p>Loading... 🤔</p>; //If the request is in progress, display a loading message
  if (error) return <p>Error 😭</p>; //If the request fails, display an error message
  console.log(data);
  return (
    <>
      {/* JournalEntry component */}
      <CourseEntry user={user} refetch={refetch} />
      {/* Allows the user to add new entices */}
      {/* Display the journal entries in the JournalCard Component */}
      {data.getCourses.map((data) => (
        <CourseCard key={data.id} data={data} user={user} refetch={refetch} />
      ))}
    </>
  );
}

export default Course;
