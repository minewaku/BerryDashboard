// Using on JsonHolder API for testing, can delete later
import * as httpRequest from "~/utils/httpRequest";

const get = async (params) => {
  try {
    const response = await httpRequest.get("posts", {}, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const post = async (params) => {
  try {
    const response = await httpRequest.post("posts", {}, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const put = async ({ id, ...params }) => {
  try {
    const response = await httpRequest.put(`posts/${id}`, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const del = async (ids = []) => {
  try {
    const response = await httpRequest.del("posts", ids);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { get, post, put, del };
