import { getDetailsfromRealm } from "../utils/realmService";

export const LogoutALL = async () => {
  const realm = await getDetailsfromRealm();
  realm.write(() => {
    realm.deleteAll();
  });
};