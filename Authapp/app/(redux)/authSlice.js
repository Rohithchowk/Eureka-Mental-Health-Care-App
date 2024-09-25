import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit";

//now we'll write fucntion to get user from Asyncstorage
//next, we'll maintain iniital state
//Slices

const loadUserFromStorage=async()=>{
    try{
        const userInfo=await AsyncStorage.getItem("userInfo");
        return userInfo?JSON.parse(userInfo):null
    }
    catch(error){
        return null;
    }
}

const initialState={
    user:null,
    isLoading:true,
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginUserAction:(state,action)=>{
            state.user=action.payload;
            state.isLoading=false;
            AsyncStorage.setItem("userInfo",JSON.stringify(action.payload));

        },

        logoutAction:(state,action)=>{
            state.user=null;
            state.isLoading=false;
            AsyncStorage.removeItem("userInfo");
        },
        setUserAction:(state,action)=>{
            state.user=action.payload;
            state.isLoading=false;
        }
    }
})


//Generate the actions

export const {loginUserAction,logoutAction,setUserAction}=authSlice.actions;

export const authReducer=authSlice.reducer;

//loadUser

export const loadUser=()=>async(dispatch)=>{
    const userInfo=await loadUserFromStorage();
    if(userInfo){
        dispatch(setUserAction(userInfo))
    }
}

