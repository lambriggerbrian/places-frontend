import React from "react";
import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom";

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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlacesList items={loadedPlaces} />;
};

export default UserPlaces;
