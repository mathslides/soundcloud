import { Tab, Tabs } from "react-bootstrap";
import UploadForm from "./UploadForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingSongs } from "../../store/songs";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

function UploadGeneric() {
  const [activeTab, setActiveTab] = useState(0);
  const [songs, setSongs] = useState([]);
  const [editSongId, setEditSongId] = useState(null);
  const loggedInUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      fetchUserSongs();
    }
  }, [loggedInUser]);

  const fetchUserSongs = async () => {
    try {
      const response = await dispatch(getTrendingSongs());
      setSongs(response.trendSongs);
    } catch (error) {
      console.error("Error fetching user songs:", error);
    }
  };

  const filteredSongs = songs.filter(
    (song) => song.artist === loggedInUser.username
  );

  const handleEditSong = (id) => {
    setEditSongId(id);
    setActiveTab(0); // Assuming 0 is the index for UploadForm tab
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      style: {
        color: "white",
      },
    },
    {
      Header: "Artist",
      accessor: "artist",
      style: {
        color: "white",
      },
    },
    {
      Header: "Genre",
      accessor: "genre",
      style: {
        color: "white",
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <button
          className="text-white py-1 px-5 border border-transparent rounded-lg shadow-md font-medium text-lg bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => handleEditSong(row._original.id)}
        >
          Edit
        </button>
      ),
      style: {
        color: "white",
      },
    },
  ];

  const tabs = [
    {
      id: 0,
      label: "UploadForm",
      content: (
        <div>
          <UploadForm editSongId={editSongId} />
        </div>
      ),
    },
    {
      id: 1,
      label: "Songs",
      content: (
        <div>
          <div className="w-full">
            <ReactTable
              data={filteredSongs}
              columns={columns}
              defaultPageSize={10}
              showPageSizeOptions={true}
              minRows={0}
              getTheadThProps={() => {
                return {
                  style: {
                    backgroundColor: "#333",
                    color: "white",
                    padding: "10px",
                    textAlign: "left",
                  },
                };
              }}
              getTheadTrProps={() => {
                return {
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                };
              }}
              getTrProps={(state, rowInfo, column) => {
                return {
                  style: {
                    backgroundColor:
                      rowInfo && rowInfo.row && rowInfo.row.index % 2 === 0
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: "white",
                    padding: "10px",
                  },
                };
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex gap-20 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2  font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-green-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 mb-12">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default UploadGeneric;
