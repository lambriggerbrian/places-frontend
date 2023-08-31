import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const USER_PLACES_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/places/user`;

const UserPlaces = () => {
  const userId = useParams().userId;
  const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState();
  const userIdUrl = `${USER_PLACES_URL}/${userId}`;
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const responseData = await sendRequest(userIdUrl);
        setPlaces(responseData.places);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, [userIdUrl, sendRequest]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={hasError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlacesList items={places} onDelete={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
