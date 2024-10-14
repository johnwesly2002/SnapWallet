import {Realm} from "@realm/react";
import { getDetailsfromRealm } from "../utils/realmService";
import transactionGroups from "../schemas/transactionGroups";

export const transactionGroupsAdd = async( Details: any, userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    try{
        realm.write(() => {
            const user = realm.objectForPrimaryKey('User', userId);
            if (user) {
                Details.forEach((category: any) => {
                    realm.create('transactionGroups', {
                        _id: new Realm.BSON.ObjectId(),
                        name: category.name,
                        icon: category.icon,
                        Color: category.Color,
                        status: true,
                        user: user, 
                    });
                });
            }else{
                console.log("User Not Found");
            } 
        })

    }catch(error){
        console.log("Error While Adding TransactionGroups",error);
    }
};

export const getTransactionGroupsById = async(userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    try{
        const TransactionGroups = realm.objects<transactionGroups>('transactionGroups');
        const TransactionsGroupsByUser = TransactionGroups.filter((Group) => {
            return Group.user && Group.user._id && Group.user._id.equals(userId);
        })
    return TransactionsGroupsByUser;
    }catch(error){
        console.log("error while fetching the TransactionGroups");
    }
};

export const deletetransactionGroups = async(Details: any) => {
    const realm = await getDetailsfromRealm();
    try{
        realm.write(() => {
            Details.forEach((Group: any) => {
            const transactionGroups = realm.objectForPrimaryKey('transactionGroups',Group._id);
            if(transactionGroups){
                if(Group.status){
                    Group.status = false;
                }else{
                    console.log("Group not found");
                }
            }
        });
        });

    }catch(error){
        console.log("Error While deleting the Groups");
    }
}