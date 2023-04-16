import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  all: "favorite/all",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  getAll: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.all);

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
        favoriteEndpoints.add,
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
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));
      console.log("favorileAPI",response);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default favoriteApi;