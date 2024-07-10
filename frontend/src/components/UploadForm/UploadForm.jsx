import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOne, postSong } from "../../store/songs";
import { toast, Toaster } from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import defaultAlbum1 from "../../images/album2.jpeg";
import defaultAlbum2 from "../../images/album3.jpeg";
import defaultAlbum3 from "../../images/album4.jpeg";
import Container from "../Container";
import { getAllGenres } from "../../store/genre";
import { FaSpinner } from "react-icons/fa";
import { getAllUsers } from "../../store/user";

function UploadForm({ editSongId }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [songData, setSongData] = useState({});
  const [users, setUsers] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [albumCoverBase64, setAlbumCoverBase64] = useState(null);
  const [songUploaded, setSongUploaded] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [audioFileName, setAudioFileName] = useState("");
  const [genresData, setGenresData] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); // New fetching state

  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.session.user);
  useEffect(() => {
    if (loggedInUser) {
      fetchGenres();
    }
  }, [loggedInUser]);

  useEffect(() => {
    const filteredArtists = users.filter((user) => user.type === "artist");
    setArtists(filteredArtists);
  }, [users]);
  useEffect(() => {
    if (songUploaded) {
      const timeoutId = setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [songUploaded, history]);

  const fetchGenres = async () => {
    try {
      const response = await dispatch(getAllGenres());
      const res = await dispatch(getAllUsers());
      setUsers(res);
      setGenresData(response);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile && !youtubeLink) {
      toast.error(
        "Please upload an audio file or provide a YouTube youtubeLink."
      );
      return;
    }

    if (!imgUrl) {
      toast.error("Please select an album cover image.");
      return;
    }

    setLoading(true);
    const song = {
      title,
      artist,
      genre,
      albumName,
      youtubeLink,
      facebookLink,
      tiktokLink,
      audioFile: audioFile ? audioFile.audioFile : null,
      imgUrl,
      userId: loggedInUser.id,
    };
    try {
      await dispatch(postSong(song));
      toast.success("Song has been uploaded!", {
        duration: 3000,
        position: "top-right",
      });
      setSongUploaded(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error uploading song. Please try again later.");
    }
  };
  useEffect(() => {
    if (editSongId) {
      fetchSongData(editSongId);
    }
  }, [editSongId]);

  // const fetchSongData = async (id) => {
  //   try {
  //     const response = await dispatch(getOne(id));
  //     setSongData(response?.currentSong);
  //   } catch (error) {
  //     console.error("Error fetching song data:", error);
  //   }
  // };

  const fetchSongData = async (id) => {
    setFetching(true); // Start fetching
    try {
      const response = await dispatch(getOne(id));
      setSongData(response?.currentSong);
      setFetching(false); // End fetching
    } catch (error) {
      setFetching(false); // End fetching
      console.error("Error fetching song data:", error);
    }
  };
  useEffect(() => {
    if (songData) {
      setTitle(songData.title || "");
      setGenre(songData.genre || "");
      setArtist(songData.artist || "");
      setAlbumName(songData.album || "");
      setYoutubeLink(songData.youtubeLink || "");
      setFacebookLink(songData.facebookLink || "");
      setTiktokLink(songData.tiktokLink || "");
      setAudioFile(songData.audioFile || null);
      setImgUrl(songData.imgUrl || null);
      setAlbumCoverBase64(songData.imgUrl || null);
    }
  }, [songData]);
  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAudioFile((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
      setAudioFileName(file.name);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };
  const handleAlbumCoverChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataURL = reader.result;
      setImgUrl(dataURL);
      setAlbumCoverBase64(dataURL);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDefaultAlbumCoverClick = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg");
      setImgUrl(dataURL);
      setAlbumCoverBase64(dataURL);
      setIsOpen(false);
    };
  };

  return (
    <Container>
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Upload song
        </h1>
        <p className="text-xl text-center text-white mb-2">
          Add music of your own choice
        </p>

        {fetching ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-white h-10 w-10 mt-12" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-1">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block font-medium text-white mt-2"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                style={{ height: "30px" }}
                value={title}
                disabled={loading}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed opacity-50 " : ""
                }`}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="artist"
                className="block font-medium text-white mt-2"
              >
                Artist
              </label>
              <select
                name="artist"
                id="artist"
                value={artist}
                disabled={loading}
                onChange={(e) => setArtist(e.target.value)}
                className={`h-1/2 mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                required
              >
                <option value="" disabled hidden>
                  Select Artist
                </option>
                {artists && artists?.length > 0 ? (
                  artists?.map((item) => (
                    <option key={item?.id} value={item?.username}>
                      {item?.username}
                    </option>
                  ))
                ) : (
                  <option disabled>No artists available</option>
                )}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="genre"
                className="block font-medium text-white mt-2"
              >
                Genre
              </label>
              <select
                name="genre"
                id="genre"
                value={genre}
                disabled={loading}
                onChange={(e) => setGenre(e.target.value)}
                className={`h-1/2 mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                required
              >
                <option value="" disabled hidden>
                  Select genre
                </option>
                {genresData && genresData?.length > 0 ? (
                  genresData?.map((genreItem) => (
                    <option key={genreItem.id} value={genreItem.genre}>
                      {genreItem.genre}
                    </option>
                  ))
                ) : (
                  <option disabled>No genres available</option>
                )}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="albumName"
                className="block font-medium text-white mt-2"
              >
                Album Name
              </label>
              <input
                type="text"
                name="albumName"
                id="albumName"
                style={{ height: "30px" }}
                value={albumName}
                disabled={loading}
                onChange={(e) => setAlbumName(e.target.value)}
                className={`mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="youtubeLink"
                className="block font-medium text-white mt-2"
              >
                Youtube Link
              </label>
              <input
                type="text"
                name="youtubeLink"
                id="youtubeLink"
                style={{ height: "30px" }}
                value={youtubeLink}
                disabled={loading}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className={`mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="facebookLink"
                className="block font-medium text-white mt-2"
              >
                Facebook Link
              </label>
              <input
                type="text"
                name="facebookLink"
                id="facebookLink"
                style={{ height: "30px" }}
                value={facebookLink}
                disabled={loading}
                onChange={(e) => setFacebookLink(e.target.value)}
                className={`mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="tiktokLink"
                className="block font-medium text-white mt-2"
              >
                Tiktok Link
              </label>
              <input
                type="text"
                name="tiktokLink"
                id="tiktokLink"
                style={{ height: "30px" }}
                value={tiktokLink}
                disabled={loading}
                onChange={(e) => setTiktokLink(e.target.value)}
                className={`mt-0.5 block w-full rounded-md bg-gray-700 text-white border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                // required
              />
            </div>
            <div className="w-full"></div>
            <div className="w-full">
              <label
                htmlFor="imgUrl"
                className="block font-medium text-white mt-2"
              >
                Album Cover Image
              </label>
              <div className="flex items-center w-full mt-2">
                <label
                  htmlFor="imgUrlInput"
                  className={`flex flex-col items-center justify-center w-2/5 h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 text-white ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                >
                  <PlusCircleIcon className="w-12 h-12 mb-3" />
                  <span className="font-semibold">Upload Album Cover</span>
                  <input
                    type="file"
                    name="imgUrl"
                    id="imgUrlInput"
                    style={{ height: "30px" }}
                    onChange={handleAlbumCoverChange}
                    accept="image/*"
                    className="hidden"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="mt-4 text-gray-500 text-sm"
                    onClick={handleOpenModal}
                    disabled={loading}
                  >
                    Choose default image
                  </button>
                </label>
                {albumCoverBase64 && (
                  <img
                    src={albumCoverBase64}
                    alt="Album Cover Preview"
                    className="w-32 h-32 rounded-lg border border-gray-500 ml-4"
                  />
                )}
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="audioFile"
                className="block font-medium text-white mt-2"
              >
                Audio File
              </label>
              <div className="flex items-center justify-center w-full mt-2">
                <label
                  htmlFor="audioFileInput"
                  className="flex items-center justify-center w-full h-36 bg-gray-700 rounded-lg cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.5 14h-.75l-1.75-1.75c-.28-.28-.75-.28-1.06 0l-2.5 2.5c-.28.28-.28.75 0 1.06l2.5 2.5c.28.28.75.28 1.06 0l1.75-1.75 1.75 1.75c.5.5.5 1.25 0 1.75l-2.25 2.25c-.28.28-.75.28-1.06 0l-2.5-2.5c-.28-.28-.28-.75 0-1.06l2.5-2.5c.28-.28.28-.75 0-1.06l-2.5-2.5c-.5-.5-.28-1.25 0-1.75l2.25-2.25c.28-.28.28-.75 0-1.06l-2.5-2.5c-.28-.28-.75-.28-1.06 0l-2.25 2.25c-.28.28-.75.28-1.06 0l1.75 1.75c.28.28.28.75 0 1.06l-2.5 2.5c-.28.28-.75.28-1.06 0l-2.25 2.25c-.28-.28-.28-.75 0-1.06l2.5-2.5c-.28-.8.75 0 1.06l-2.5 2.5c-.28.28-.75.28-1.06 0l-2.25 2.25c-.28.28-.75.28-1.06 0l1.75 1.75c.28.28.28.75 0 1.06l-2.5 2.5c-.5.5.28.75 0 1.75l2.25 2.25c.28.28.28.75 0 1.06l-2.5 2.5c-.28.28-.75.28-1.06 0l-2.25 2.25c-.28-.28-.28-.75 0-1.06l2.5-2.5c-.28-.28-.75-.28-1.06 0l-1.75 1.75c-.28.28-.75.28-1.06 0l1.75 1.75c.28.28.28.75 0 1.06l-2.5 2.5c-.28.28-.75.28-1.06 0l-2.25-2.25c-.28-.28-.28-.75 0-1.06l2.5-2.5c-.28-.28-.75-.28-1.06 0l.17-.23-.17-.23v-8h16v12Zm0-18.5lX12.7 12.7l-12.7 12.7-X22.33 22.33-X22.33-22.33-.33v15.02l-X3 3X12.7.94lX4.28-4.28V25l-6.94-6.92Zg5.22-.59L15 17.66 3.44 7.57L2 9 v15l4.99 6.38h13.15l3.73-3.77Z
                  "
                    />
                  </svg>
                  <p className="ml-4 font-semibold text-white text-lg">
                    {audioFileName || "Upload Audio"}
                  </p>
                </label>
                <input
                  type="file"
                  name="audioFile"
                  id="audioFileInput"
                  style={{ height: "1px" }}
                  onChange={handleAudioFileChange}
                  accept=".mp3"
                  className="hidden"
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-end items-end pb-24">
              {loading ? (
                <div className="flex items-center justify-end">
                  <FaSpinner className="animate-spin text-white h-6 w-6" />
                  <span className="ml-2 text-white">Uploading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white py-1 px-3 border border-transparent rounded-md shadow-sm font-medium bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={loading}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        )}

        <Toaster />
      </div>

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        classNames={{
          modal: "absolute right-0 top-0 w-1/3  border-l border-gray-300",
          overlay: "bg-black bg-opacity-50",
        }}
      >
        <div className="p-4 text-center bg-gray-800 text-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Default Cover Images</h2>
          <div className="grid grid-cols-3 gap-4">
            <img
              src={defaultAlbum1}
              alt="Default Cover 1"
              className="w-32 h-32 rounded-lg object-cover cursor-pointer"
              onClick={() => handleDefaultAlbumCoverClick(defaultAlbum1)}
            />
            <img
              src={defaultAlbum2}
              alt="Default Cover 2"
              className="w-32 h-32 rounded-lg object-cover cursor-pointer"
              onClick={() => handleDefaultAlbumCoverClick(defaultAlbum2)}
            />
          </div>
          <button
            type="button"
            className="mt-4 text-blue-500"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </Container>
  );
}
export default UploadForm;
