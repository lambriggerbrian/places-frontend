import React from "react";

import "./PlacesList.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="places-list center">
        <Card>
          <h2>No Places yet. Create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="places-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
