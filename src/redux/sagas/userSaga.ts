// userSagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { createUserRequest, createUserSuccess, createUserFailure } from '../slices/userSlice';
import { createUser, getUsers } from '../../services/userService'; // Import your Realm service
import { PayloadAction } from '@reduxjs/toolkit';
import { setLoginId } from '../slices/LoginIdSlice';
import { setUserName } from '../slices/usernameSlice';
import { setprofilePic } from '../slices/userPictureSlice';

// Define the structure of action payload
interface CreateUserAction {
  username: string;
  profilePic: string;
}
function* handleUserdetails(): Generator<any, void, any> {
    try {
      yield put(createUserRequest());
      const users = yield call(getUsers); 
      console.log('Fetched Users:', users);
      if (users.length === 0) {
        throw new Error("No users found.");
      }
      yield put(setLoginId(String(users[0]?._id)));
      yield put(setUserName(users[0]?.username));
      yield put(setprofilePic(users[0]?.profilePic));
      yield put(createUserSuccess(users));
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      yield put(createUserFailure(error.message));
    }
  }
  

export default function* watchUserCreation() {
  yield takeLatest('fetchUsers', handleUserdetails);
}
function fetchCardDetails(arg0: string): any {
  throw new Error('Function not implemented.');
}

