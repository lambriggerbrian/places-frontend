import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "./PlaceForm.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

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

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );
  const updateSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  const selectedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (selectedPlace) {
      setFormData(
        {
          title: { value: selectedPlace.title, isValid: true },
          description: { value: selectedPlace.description, isValid: true },
        },
        true
      );
    }
    setIsLoading(false);
  }, [selectedPlace, setFormData, setIsLoading]);

  if (!selectedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid title. (Min 5 characters)"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        isValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description. (Min 5 characters)"
        onInput={inputHandler}
        value={formState.inputs.description.value}
        isValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
