import { Container } from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import CreateCardButton from "../components/CreateCardButton";

export default function CardPage() {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { filteredCards, error, isLoading } = value;


  useEffect(() => {
    handleGetCards();
  }, []);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetCards();
  };
  return (
    <div>
      <Container sx={{ mt: 2 }}>
        <PageHeader
          title="Cards"
          subtitle="On this page you can find all bussines cards from all categories"
        />
        <Container>
          <CardsFeedback 
            isLoading={isLoading}
            error={error}
            cards={filteredCards}
            handleDelete={handleDelete}
          />
          <CreateCardButton/>
        </Container>
      </Container>
    </div>
  );
}
