import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "testTitle",
    description: "testDescription",
    imageUrl:
      "https://44.media.tumblr.com/861e92925735e9f700eb2f236ae6c435/tumblr_ol3bsnt8rg1vni15go1_400.gif",
    address: "testAddress",
    creator: "u1",
    location: { lat: 30, lng: -97 },
  },
  {
    id: "p2",
    title: "testTitle",
    description: "testDescription",
    imageUrl:
      "https://44.media.tumblr.com/861e92925735e9f700eb2f236ae6c435/tumblr_ol3bsnt8rg1vni15go1_400.gif",
    address: "testAddress",
    creator: "u2",
    location: { lat: 30, lng: -97 },
  },
];

const USER_PLACES_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/places/user`;

const UserPlaces = () => {
  const userId = useParams().userId;
  const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState();
  const userId_url = `${USER_PLACES_URL}/${userId}`;
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const responseData = await sendRequest(userId_url);
        setPlaces(responseData.places);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, [userId_url, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={hasError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlacesList items={places} />}
    </React.Fragment>
  );
};

export default UserPlaces;
