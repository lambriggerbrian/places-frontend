import React, { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceItem.css";

const DELETE_PLACE_URL = `${process.env.REACT_APP_BACKEND_TARGET}/api/places/`;

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMapModal, setShowMap] = useState(false);
  const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteHandler = () => setShowDeleteModal(true);
  const closeDeleteHandler = () => {
    setShowDeleteModal(false);
  };
  const confirmDeleteHandler = async () => {
    closeDeleteHandler();
    const deletePlaceIdUrl = `${DELETE_PLACE_URL}/${props.id}`;
    try {
      await sendRequest(deletePlaceIdUrl, "DELETE");
      props.onDelete(props.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showMapModal}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note this can't
          be undone.
        </p>
      </Modal>
      <ErrorModal error={hasError} clearError={clearError} />
      <li className="place-item">
        <Card>
          {isLoading && <LoadingSpinner />}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={openDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
