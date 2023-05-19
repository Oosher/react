import { Box, CardActions, IconButton } from "@mui/material";
import React, {  useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { func, string } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";


export default function CardActionBar({
  handleDelete,
  handleLike,
  id,
  user_id,
  likes,
}) {
  const { user } = useUser();
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked,setIsLiked] = useState(false);
  const navigate = useNavigate();
  const handleDeleteCard = () => {
    handleDelete(id);
    setDialog(false);
  };

  
const changeLike = ()=> likes.findIndex((userId)=>userId===user?.id)!==-1?setIsLiked(true):setIsLiked(false);
  
useEffect(()=>{changeLike()},[])

  
  

  return (
    <>
      <CardActions sx={{ paddingTop: 0, justifyContent: "space-between" }}>
        <Box>
          {user?.isAdmin || user?.id === user_id ? (
            <>
              <IconButton
                aria-label="Delete Card"
                onClick={() => setDialog(true)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Edit Card"
                onClick={() => navigate(`${ROUTES.EDIT_CARD}/${id}`)}
              >
                <ModeEditIcon />
              </IconButton>
            </>
          ) : null}
        </Box>

        <Box>
          <IconButton aria-label="Call">
            <CallIcon />
          </IconButton>
          {user && (
            <IconButton sx={{color:isLiked?"red":null }}
              aria-label="Add to favorite"
              onClick={() => {handleLike(id,isLiked)
                              setIsLiked(!isLiked);
              }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => setDialog(false)}
        onDelete={handleDeleteCard}
      />
    </>
  );
}

CardActionBar.propTypes = {
  handleDelete: func.isRequired,
  handleLike: func.isRequired,
  id: string.isRequired,
};
