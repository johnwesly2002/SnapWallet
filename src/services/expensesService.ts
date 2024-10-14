import creditCard from "../schemas/creditCardSchema";
import Expenses from "../schemas/expensesSchema";
import transactionGroups from "../schemas/transactionGroups";
import { getDetailsfromRealm } from "../utils/realmService"
import {Realm} from '@realm/react';


export const createExpenses =async (userId: any,
    Description: string,
    amount: number,
    transactionGroup: transactionGroups,
    card: any,
    date: string,

) => {
    const realm = await getDetailsfromRealm();
    try{
        realm.write(()=>{
            const user = realm.objectForPrimaryKey('User', userId);
            if (user) {
                realm.create('Expenses' , {
                    _id: new Realm.BSON.ObjectId(),
                    Description: Description,
                    amount: amount,
                    transactionGroup: transactionGroup,
                    card: card,
                    user:user,
                    date: date,
                })
            }else{
                console.log("User not Found");
            }
        })

    }catch(Error){
        console.log("error while creating expense",Error);
    }
}


export const getExpensesData =async(userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    try{
        const expenses = realm.objects<Expenses>('Expenses');
        console.log("userId",userId);
        const expensesByUserId = Array.from(expenses).filter(expense => {
            return expense?.user?._id.equals(userId);
          });
        console.log("expenses",expenses);
        return expensesByUserId;
    }catch(error){
        console.log("error while fetching Expenses");
    }
}