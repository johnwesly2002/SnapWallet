import { Realm } from "@realm/react";
import User from "./userSchema";



class creditCard extends Realm.Object<creditCard>{
    _id!: Realm.BSON.ObjectId;
    name!: string;
    number!: string;
    type!: string;
    expiry!: string;
    cvc!: string;
    user!: User | null;
    cardColor!: string;
    isFlipped!: boolean;
    cardStatus!: boolean;
    balance!: string;
    static schema = {
        name: 'creditCard',
        properties: {
          _id: 'objectId',
          name: 'string',
          number: 'string',
          type: 'string',
          expiry: 'string',
          cvc: 'string',
          user: 'User',
          cardColor: 'string',
          isFlipped: 'bool',
          cardStatus: 'bool',
          balance: 'string',
        },
        primaryKey: '_id',
      };
};
export default creditCard;