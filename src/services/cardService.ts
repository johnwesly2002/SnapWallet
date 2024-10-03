import {Realm} from '@realm/react';
import { getDetailsfromRealm } from '../utils/realmService';
import creditCard from '../schemas/creditCardSchema';

export const CardAdd = async (cardDetails: any, userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    try{
       realm.write(() => {
        const user = realm.objectForPrimaryKey('User', userId);
        if (user) {
        realm.create('creditCard', {
        _id: new Realm.BSON.ObjectId(),
        number: cardDetails.number,
        name: cardDetails.name,
        expiry: cardDetails.expiry,
        cvc: cardDetails.cvc,
        type: cardDetails.type,
        cardColor: cardDetails.cardColor,
        user: user,
        isFlipped: cardDetails.isFlipped,
        cardStatus: true
        });
        console.log("card Added Successfully");
    }else{
        console.log("User Not Found");
    }
       })

    }catch(error){
        console.log("error while Adding the Card");
    }
}

export const deletecreditCard = async(CardId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    console.log(CardId);
    try{
        realm.write(() => {
            const card = realm.objectForPrimaryKey('creditCard',CardId);
            if(card){
                if(card.cardStatus){
                    card.cardStatus = false;
                }else{
                    console.log("Card not found");
                }
            }
        });

    }catch(error){
        console.log("Error While deleting the card");
    }
}

export const getAllCardsByUserId = async (userId: Realm.BSON.ObjectId): Promise<creditCard[]> => {
    const realm = await getDetailsfromRealm();
    try {
      const cards = realm.objects<creditCard>('creditCard');
      
      console.log('Fetched cards from Realm:', cards);
      console.log("userId:", userId);
  
      const cardsByUser = Array.from(cards).filter(card => {
        // Ensure card.user is not null before accessing its properties
        return card.user && card.user._id && card.user._id.equals(userId);
      });
  
      console.log('Filtered cards by user:', cardsByUser);
      return cardsByUser;
    } catch (error) {
      console.log("Error while getting cards:", error);
      return [];
    }
  };
  

