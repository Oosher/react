
import React, {  useCallback,  useMemo, useState } from "react";
import useCards from "./useCards";




export default function CardsProvider() {
const [numberArray,setNumbersArray] = useState([]);
const {value, handleGetCards}= useCards();


const cardNumbers = useCallback( async ()=>{

    handleGetCards();
    const bizNum = await value.cards.map((card)=> card.bizNumber)
    setNumbersArray( await bizNum )
    return await bizNum
        

},[])

    const val = useMemo(
        () => ({ cardNumbers ,numberArray}),
        [cardNumbers,numberArray]
  );
  return {numberArray ,cardNumbers}
}




