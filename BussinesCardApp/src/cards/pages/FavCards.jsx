import React, { useEffect } from 'react'
import useCards from '../hooks/useCards';
import CardsFeedback from '../components/CardsFeedback';
import PageHeader from '../../components/PageHeader';
import ROUTES from "../../routes/routesModel";
import { Container } from '@mui/material';
import { useUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function FavCards() {
    const { value, handleGetFavCards, handleDeleteCard } = useCards();
    const { cards, error, isLoading } = value;

    const { user } = useUser();
    const navigate = useNavigate();

      useEffect(() => {
    if (!user) {
      navigate(ROUTES.CARDS);
    } else {
      handleGetFavCards();
    }
  }, [user]);


    const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetFavCards();
  };

  return (
    <Container sx={{ mt: 2 }}>
        <PageHeader
          title="Favorite Cards"
          subtitle="On this page you can find all bussines cards from all categories"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={cards}
          handleDelete={handleDelete}
        />
      </Container>
  )
}
