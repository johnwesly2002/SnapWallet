import {Realm} from '@realm/react';
import User from './userSchema';

class transactionGroups extends Realm.Object<transactionGroups>{
    _id!: Realm.BSON.ObjectId;
    name!: string;
    icon!: string;
    Color!: string;
    status!: boolean;
    user!: User;
    static schema = {
        name: "transactionGroups",
        properties: {
            _id: "objectId",
            name: "string",
            icon: "string",
            Color: "string",
            status: "bool",
            user: "User",
        },
        primaryKey: "_id",
    }

};
export default transactionGroups;