import creditCard from '../schemas/creditCardSchema';
import { Realm } from '@realm/react';
import User from '../schemas/userSchema';
import transactionGroups from '../schemas/transactionGroups';
import Expenses from '../schemas/expensesSchema';
import Country from '../schemas/countryScehma';

export const realmdb: Realm.Configuration = {
    schema: [creditCard, User, transactionGroups, Expenses, Country],
    schemaVersion: 1,
};
export const getDetailsfromRealm = async () => {
    try {
        return await Realm.open(realmdb);
    } catch (error) {
        console.error("Failed to open Realm:", error);
        throw error; 
    }
};