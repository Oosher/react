import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";

import Maps from "../components/card/Maps";


export default function CardDetailsPage() {
  const { id } = useParams();
  const {value,handleGetCard}= useCards();
  const {card} = value;

  useEffect(()=>{

  handleGetCard(id);


  },[])

  return (
    <Container >
      <PageHeader
        title="Business details"
        subtitle="Here you can find all the details about specific business"
      />
    
      <Container sx={{width:"fit-content",marginBottom:"20px"}}>
        <Typography>Business name :{card?.title} {card?.subtitle}</Typography>
        <Typography>Website :{card?.web}</Typography>
        <Typography>Business email :{card?.email}</Typography>
        <Typography>Business phone number :{card?.phone}</Typography>
        <Typography>Business number :{card?.bizNumber}</Typography>
        <Typography>Business description :{card?.description}</Typography>
        <Box sx={{width: "50vw",height: "40vh", // Adjust as needed
                  margin: "2vh auto",}}>
          <Maps address={`${card?.address.city} ${card?.address.street} ${card?.address.houseNumber} `} zoom={13} center={[51,-0.09]}/>
        </Box>
      </Container>
    </Container>
  );
}
