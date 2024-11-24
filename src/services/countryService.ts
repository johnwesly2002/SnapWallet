import Country from "../schemas/countryScehma";
import { getDetailsfromRealm } from "../utils/realmService";
import {Realm} from '@realm/react';

export const handleCreationCountry = async(CountryDetails: any, userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    try{
        realm.write(() => {
            const user = realm.objectForPrimaryKey('User', userId);
            if (user) {
                realm.create('Country', {
                    _id: new Realm.BSON.ObjectId(),
                    code: CountryDetails.currency.code,
                    country: CountryDetails.country,
                    symbol: CountryDetails.currency.symbol,
                    name: CountryDetails.currency.name,
                    user: user,
                });
            console.log("Country Added Successfully");
            }else{
                console.log("User Not Found");
            }
        })
    }catch(error) {
        console.log("Error while Creating the Country Selection");
    }
};
export const getCurrencyById = async (currencyId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    const currency = realm.objectForPrimaryKey('Currency', currencyId);
    return currency;
  };
  
  export const getCurrencyByUserId = async (userId: Realm.BSON.ObjectId) => {
    const realm = await getDetailsfromRealm();
    const countries = realm.objects<Country>('Country');
  
    const countriesByUserId = Array.from(countries).filter(country => {
      return country?.user?._id.equals(userId);
    });
  
    return countriesByUserId;
  };
  
  export const getAllCurrencies = async () => {
    const realm = await getDetailsfromRealm();
    const currencies = realm.objects('Currency');
    return Array.from(currencies);
  };