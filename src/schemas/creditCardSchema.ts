import { Realm } from "@realm/react";



class creditCard extends Realm.Object<creditCard>{
    _id!: Realm.BSON.ObjectId;
    name!: string;
    number!: string;
    type!: string;
    expiry!: string;
    cvc!: string;
    cardColor!: string;
    isFlipped!: boolean;
    cardStatus!: boolean
    static schema = {
        name: 'creditCard',
        properties: {
          _id: 'objectId',
          name: 'string',
          number: 'string',
          type: 'string',
          expiry: 'string',
          cvc: 'string',
          cardColor: 'string',
          isFlipped: 'bool',
          cardStatus: 'bool'
        },
        primaryKey: '_id',
      };
};
export default creditCard;