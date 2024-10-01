import {Realm} from '@realm/react';
class User extends Realm.Object<User>{
    _id!: Realm.BSON.ObjectId;
    profilePic!: string; 
    username!: string;

    static schema = {
        name: 'User',
        properties: {
            _id: 'objectId',
            profilePic: 'string',
            username: 'string',
        },
        primaryKey: '_id',
    };  
}
export default User;