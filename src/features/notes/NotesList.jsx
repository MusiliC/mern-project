import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <p className="text-lg my-5 font-semibold text-center">Loading...</p>
    );

  if (isError) {
    content = <p className="errorClass">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteringIds;
    if (isManager || isAdmin) {
      filteringIds = [...ids];
    } else {
      filteringIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent = ids?.length
      ? filteringIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className=" w-[98%] md:w-3/4 border mx-auto text-left text-xs md:text-sm lg:text-base ">
        <thead className="uppercase border">
          <tr className="">
            <th className="border lg:px-6 px-2  py-1">Username</th>
            <th className="border  hidden lg:table-cell lg:px-6 px-2  py-1">
              Created
            </th>
            <th className="border hidden lg:table-cell lg:px-6 px-2  py-1">
              Updated
            </th>
            <th className="border lg:px-6 px-2  py-1">Title</th>
            <th className="border hidden lg:table-cell lg:px-6 px-2  py-1">
              Owner
            </th>
            <th className="border lg:px-6 px-2  py-1">Edit</th>
          </tr>
        </thead>
        {ids?.length < 1 ? (
          <td colSpan={6} className="text-center py-7 font-semibold">
            No notes for user {username}
          </td>
        ) : (
          <tbody>{tableContent}</tbody>
        )}
      </table>
    );
  }

  return (
    <section className="w-full ">
      <div className="w-5/6 mx-auto min-h-[70vh] text-sm md:text-base ">
        <p className="text-base md:text-lg my-5 font-bold text-center text-primary-500 uppercase">
          Notes List
        </p>
        <div>{content}</div>
      </div>
    </section>
  );
};

export default NotesList;
