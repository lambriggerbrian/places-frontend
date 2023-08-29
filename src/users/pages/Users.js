import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const USERS_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/users`;

const Users = () => {
  const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(USERS_URL);
        setUsers(responseData.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={hasError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </React.Fragment>
  );
};

export default Users;
