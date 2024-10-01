// userSagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { createUserRequest, createUserSuccess, createUserFailure } from '../slices/userSlice';
import { createUser, getUsers } from '../../services/userService'; // Import your Realm service
import { PayloadAction } from '@reduxjs/toolkit';

// Define the structure of action payload
interface CreateUserAction {
  username: string;
  profilePic: string;
}
function* handleUserdetails(): Generator<any, void, any> {
    try {
      yield put(createUserRequest());
      const users = yield call(getUsers); // Call to fetch users
      console.log('Fetched Users:', users); // Log the fetched users
  
      if (users.length === 0) {
        throw new Error("No users found."); // Handle empty result
      }
  
      yield put(createUserSuccess(users)); // Dispatch success action with users
    } catch (error: any) {
      console.error('Error fetching users:', error.message); // Log any error
      yield put(createUserFailure(error.message)); // Dispatch failure action
    }
  }
  

export default function* watchUserCreation() {
  yield takeLatest('fetchUsers', handleUserdetails);
}
