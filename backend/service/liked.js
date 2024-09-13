const db = require('../db/models');
const Liked = db.Liked;

// Create Liked Entry
async function addLikedSong( songId) {
  try {
    const liked = await Liked.create(songId);
    return liked;
  } catch (error) {
    throw error;
  }
}

// Get All Liked Entries for a User
async function getLikedSongsByUser() {
  try {
    const likedSongs = await Liked.findAll({
      include: [
        {
          model: db.Song,
        },
        {
          model: db.User,
        }
      ],
    });
    return likedSongs;
  } catch (error) {
    throw error;
  }
}

// Delete Liked Entry
async function removeLiked(songId) {
  try {
    const likedEntry = await Liked.findOne({ where: { songId } });
    if (!likedEntry) {
      throw new Error('Liked entry not found');
    }
    await likedEntry.destroy();
    return { message: 'Liked entry deleted successfully' };
  } catch (error) {
    throw error;
  }
}


// Check If Song is Liked by User
async function isSongLikedByUser(userId, songId) {
  try {
    const likedEntry = await Liked.findOne({ where: { userId, songId } });
    return likedEntry !== null;
  } catch (error) {
    throw error;
  }
}

// Update Liked Entry (Optional)
async function updateLiked(userId, songId, updatedFields) {
  try {
    const likedEntry = await Liked.findOne({ where: { userId, songId } });
    if (!likedEntry) {
      throw new Error('Liked entry not found');
    }
    await likedEntry.update(updatedFields);
    return likedEntry;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    addLikedSong,
  getLikedSongsByUser,
  removeLiked,
  isSongLikedByUser,
  updateLiked, // Optional
};
