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
  export const updateCountryById = async (
    currencyId: Realm.BSON.ObjectId,
    newCurrencyData: {code?: string; symbol?: string; name?: string;country?: string},
  ) => {
    const realm = await getDetailsfromRealm();
    try {
      realm.write(() => {
        const currency = realm.objectForPrimaryKey('Country', currencyId);
        if (currency) {
          if (newCurrencyData.code) {
            currency.code = newCurrencyData.code;
          }
          if (newCurrencyData.symbol) {
            currency.symbol = newCurrencyData.symbol;
          }
          if (newCurrencyData.name) {
            currency.name = newCurrencyData.name;
          }
          if (newCurrencyData.country) {
            currency.country = newCurrencyData.country;
          }
        } else {
          console.error('Currency not found.');
        }
      });
    } catch (error) {
      console.error('Error updating Currency:', error);
    }
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