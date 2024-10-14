
import {Realm} from '@realm/react';
import transactionGroups from './transactionGroups';
import User from './userSchema';
import creditCard from './creditCardSchema';


class Expenses extends Realm.Object<Expenses>{
    _id!: Realm.BSON.ObjectId;
    Description!: string;
    amount!: number;
    transactionGroup!: transactionGroups;
    user!: User;
    card!: creditCard;
    date!: string;
    
    static schema = {
        name: 'Expenses',
        properties: {
        _id: 'objectId',
        Description: 'string',
        amount: 'double',
        transactionGroup: 'transactionGroups',
        user: 'User',
        card: 'creditCard',
        date: 'string', 
        },
        primaryKey: '_id',
    };
}
export default Expenses;