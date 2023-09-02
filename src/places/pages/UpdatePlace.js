import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const GET_PLACE_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/places`;
const PATCH_PLACE_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/places`;

const UpdatePlace = (props) => {
  const auth = useContext(AuthContext);
  const placeId = useParams().placeId;
  const history = useHistory();
  const [place, setPlace] = useState();
  const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      const getPlaceIdUrl = `${GET_PLACE_URL}/${placeId}`;
      try {
        const responseData = await sendRequest(getPlaceIdUrl);
        setPlace(responseData.place);
        setFormData(
          {
            title: { value: responseData.place.title, isValid: true },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPlace();
  }, [placeId, sendRequest, setFormData]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    const patchPlaceIdUrl = `${PATCH_PLACE_URL}/${placeId}`;
    try {
      await sendRequest(
        patchPlaceIdUrl,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!place) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={hasError} clearError={clearError} />
      <form className="place-form" onSubmit={updateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid title. (Min 5 characters)"
          onInput={inputHandler}
          value={place.title}
          isValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a description. (Min 5 characters)"
          onInput={inputHandler}
          value={place.description}
          isValid={true}
        />
        <Button type="submit" disabled={isLoading}>
          UPDATE PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
