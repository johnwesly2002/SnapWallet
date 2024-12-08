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

export const updateUserByUserId = async (
    userId: Realm.BSON.ObjectId,
    UserDataUpdate: {username?: string; profilePic?: string},
  ) => {
    const realm = await getDetailsfromRealm();
    try {
      realm.write(() => {
        const user = realm.objectForPrimaryKey('User', userId);
        if (user) {
          if (UserDataUpdate.username) {
            user.username = UserDataUpdate.username;
          }
          if (UserDataUpdate.profilePic) {
            user.profilePic = UserDataUpdate.profilePic;
          }
        } else {
          console.error('User not found.');
        }
      });
    } catch (error) {
      console.error('Error updating User:', error);
    }
  };