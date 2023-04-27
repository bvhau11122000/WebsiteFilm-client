import privateClient from "../client/private.client";

const viewEndpoints = {
  add: "views/view",
  all: "views/all",
  remove: ({ viewId }) => `views/${viewId}`
};

const viewApi = {
  getAll: async () => {
    try {
      const response = await privateClient.get(viewEndpoints.all);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate
  }) => {
    try {
      const response = await privateClient.post(
        viewEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ viewId }) => {
    try {
      const response = await privateClient.delete(viewEndpoints.remove({viewId }));
      console.log("view",response);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default viewApi;