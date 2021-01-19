import { axiosApiService } from "../../../api/apiService";
import baseActions from "../../../utils/actionsBase";

const adminTagsActions = {};

adminTagsActions.delete = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}`;
  const response = await axiosApiService(accessToken).delete(apiUrl, {})
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw error;
    });
  return response;
};

adminTagsActions.cancel = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}/reset/`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.update = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagDataDto.getData("_id")}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.getAllTags = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tags";
  const urlParams = {
    params: {
      size: 10000,
      page: 1,
    },
  };
  const response = await axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.getTags = async (tagFilterDto, getAccessToken) => {
  let sortOption = tagFilterDto.getData("sortOption");
  let type = tagFilterDto.getData("type");
  let status = tagFilterDto.getData("status");

  const apiUrl = "/tags";
  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: tagFilterDto.getData("pageSize"),
      page: tagFilterDto.getData("currentPage"),
      type: type ? type.value : undefined,
      status: status ? status.value : undefined,
      search: tagFilterDto.getData("search")
    },
  };

  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

adminTagsActions.getProjectTags = async (getAccessToken) => {
  const apiUrl = "/tags";
  const urlParams = {
    params: {
      size: 10000,
      page: 1,
      sort: "type",
      type: "project"
    },
  };
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

adminTagsActions.getVisibleTags = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tags?status=active";
  const urlParams = {
    params: {
      size: 100,
      page: 1,
    },
  };
  const response = await axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.get = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.create = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/tags/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

adminTagsActions.getRelevantPipelines = async (tagDto, getAccessToken) => {
  const postBody = [
    ...tagDto.getData("tags")
  ];

  const apiUrl = `/reports/pipelines/tags`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

adminTagsActions.getRelevantTools = async (tagDto, getAccessToken) => {
  const postBody = [
    ...tagDto.getData("tags")
  ];

  const apiUrl = `/reports/tools/tags`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

// TODO: Implement if necessary
// adminTagsActions.duplicate = async (tagId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/pipelines/${tagId}/duplicate/`;
//   const response = await axiosApiService(accessToken).put(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

adminTagsActions.configurationOptions = [
  {id: "costCenter", label: "Cost Center"}
];

export default adminTagsActions;