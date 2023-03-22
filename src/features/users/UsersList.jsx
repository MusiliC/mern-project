import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <p className="text-lg my-5 font-semibold text-center">Loading...</p>
    );

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className=" w-[98%] md:w-3/4 border mx-auto text-left text-xs md:text-sm lg:text-base ">
        <thead className="uppercase border">
          <tr className="">
            <th className="border lg:px-6 px-2  py-1">Username</th>
            <th className="border lg:px-6 px-2  py-1">Roles</th>
            <th className="border lg:px-6 px-2  py-1">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return (
    <section className="w-full ">
      <div className="w-5/6 mx-auto min-h-[70vh]  text-sm md:text-base ">
        <p className="text-base md:text-lg my-5 font-bold text-center text-primary-500 uppercase">
          Users List
        </p>
        <div>{content}</div>
      </div>
    </section>
  );
};

export default UsersList;
