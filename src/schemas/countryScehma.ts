import { Realm } from "@realm/react";
import User from "./userSchema";


class Country extends Realm.Object<Country> {
    _id!: Realm.BSON.ObjectId;
    code!: string;
    symbol!:string;
    name!: string;
    country!: string;
    user!: User | null;

    static schema = {
        name: 'Country',
        properties:{
            _id: 'objectId',
            country: 'string',
            code: 'string',
            symbol:'string',
            name:'string',
            user: 'User',
        },
        primaryKey: '_id',
    }
}
export default Country;