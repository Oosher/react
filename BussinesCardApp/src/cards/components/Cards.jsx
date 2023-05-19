import { Grid } from "@mui/material";
import { arrayOf } from "prop-types";
import React from "react";
import cardType from "../models/types/cardType";
import CardBussinesComponent from "./card/CardBussinesComponent";
import useCards from "../hooks/useCards";

export default function Cards({ cards, handleDelete }) {


  const {handleLikeCard} = useCards();

  return (
    <>
      <Grid container spacing={2} > 
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <CardBussinesComponent
              card={card}
              key={card._id}
              handleDelete={handleDelete} 
              handleLike={handleLikeCard}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

Cards.propTypes = {
  cards: arrayOf(cardType),
};
