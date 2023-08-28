import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const USERS_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/users`;

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(USERS_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUsers(responseData.users);
      } catch (error) {
        setHasError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setHasError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={hasError} onClear={errorHandler} />
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
