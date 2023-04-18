import privateClient from "../client/private.client";

const filmEndpoints = {
  add: "films",   
  getAll: "films/all",
  remove: ({ filmId }) => `films/${filmId}`
};

const filmApi = {
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    moviesname,
    mediaRate
    
  }) => {
    try {
      const response = await privateClient.post(
        filmEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          moviesname,
          mediaRate
        }
      );
      console.log("create film ");
      return { response };
    } catch (err) { return { err }; }
  },

  getAll: async () => {
    try {
      const response = await privateClient.get(filmEndpoints.getAll);
      return { response };
    } catch (err) { return { err }; }
  },

  remove: async ({ filmId }) => {
    try {
      const response = await privateClient.delete(filmEndpoints.remove({ filmId }));
  
      return { response };
    } catch (err) { return { err }; }
  },
}



export default filmApi;