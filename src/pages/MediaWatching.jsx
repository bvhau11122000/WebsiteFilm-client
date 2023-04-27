 import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/common/Container";

import tmdbConfigs from '../api/configs/tmdn.configs.js'
import mediaApi from "../api/moudules/media.api.js"
import favoriteApi from "../api/moudules/favorite.api.js"

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";

import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

const MediaWatching = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite success");
    }
  };

  return (
    media ? (
      <>
        <Box >
          {/* media videos */}
          <div ref={videoRef} style={{ paddingTop: "2rem" }}>
            <Container >
              <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
            </Container>
          </div>
          {/* media videos */}

          {/* media reviews */}
          <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />
          {/* media reviews */}

          {/* media backdrop */}
          {media.images.backdrops.length > 0 && (
            <Container header="backdrops">
              <BackdropSlide backdrops={media.images.backdrops} />
            </Container>
          )}
          {/* media backdrop */}

          {/* media posters */}
          {media.images.posters.length > 0 && (
            <Container header="posters">
              <PosterSlide posters={media.images.posters} />
            </Container>
          )}
          {/* media posters */}

          {/* media recommendation */}
          <Container header="you may also like">
            {media.recommend.length > 0 && (
              <RecommendSlide medias={media.recommend} mediaType={mediaType} />
            )}
            {media.recommend.length === 0 && (
              <MediaSlide
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            )}
          </Container>
          {/* media recommendation */}
        </Box>
      </>
    ) : null
  );
};

export default MediaWatching;