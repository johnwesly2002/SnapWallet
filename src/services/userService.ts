import { getDetailsfromRealm } from "../utils/realmService";
import { Realm } from '@realm/react';
export const createUser = async (username: string, profilePic: string) => {
    console.log('Creating user:', { username, profilePic });
    const realm = await getDetailsfromRealm();
    let Newuser = null;
    try {
        realm.write(() => {
            const primaryId = new Realm.BSON.ObjectId();
            Newuser = realm.create('User', {
                _id: primaryId,
                username,
                profilePic,
            });
        });
        console.log('User created:', Newuser);
        return Newuser;
    } catch (error) {
        console.error('Error while creating user:', error);
        throw error;
    }
};

export const getUsers = async() => {
    const realm = await getDetailsfromRealm();
    const user = realm.objects('User');
    return Array.from(user);
}
