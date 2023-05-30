
import axios from "axios";
export const ServerUrl = "http://localhost:9000/api";


export const getRequest = async (endPoint,params) => {
  try {
    const res = await axios.get(ServerUrl + endPoint,params);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const postRequest = async (endPoint, params) => {
  try {
    const res = await axios.post(ServerUrl + endPoint, params);
    console.log("RESPONSE DATA=>",res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const putRequest = async (endPoint, params) => {
  try {
    const res = await axios.put(ServerUrl + endPoint, params);
    return res.data;
  } catch (err) {
    return err;
  }
};



export const getRequestById = async (endPoint) => {
  try {
    const res = await axios.get(ServerUrl + endPoint);
    return res.data;
  } catch (err) {
    return err;
  }
};


export const loginRequest = async (endPoint, params) => {
  try {
    const res = await axios.post(ServerUrl + endPoint, params);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteRequest = async (endPoint) => {
  try {
    const res = await axios.delete(ServerUrl + endPoint);
    return res.data;
  } catch (err) {
    return err;
  }
};




