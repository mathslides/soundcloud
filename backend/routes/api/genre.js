const express = require('express');
const { createGenre,
    getGenres,
    deleteGenre,
    updateGenre, } = require('../../service/genre');
const router = express.Router();

// Create a new genre
router.post('/create-genre', async (req, res) => {
    const { genre } = req.body;
    try {
        const newGenre = await createGenre({ genre });
        return res.json(newGenre);
    } catch (error) {
        console.error('Error creating genre:', error.message);
        res.status(500).json({ error: 'Failed to create genre' });
    }
});

// Get all genres
router.get('/getAllGenres', async (req, res) => {
    try {
        console.log("in the backrnd api--------");

        const genres = await getGenres();
        console.log("genres--------", genres);
        return res.json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
});

// Update a genre by ID
router.put('/update-genre/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const updatedGenre = await updateGenre(parseInt(id), updatedFields);
        return res.json(updatedGenre);
    } catch (error) {
        console.error(`Error updating genre with ID ${id}:`, error.message);
        res.status(500).json({ error: `Failed to update genre with ID ${id}` });
    }
});

// Delete a genre by ID
router.delete('/delete-genre/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteGenre(parseInt(id));
        return res.json({ message: `Genre with ID ${id} deleted successfully` });
    } catch (error) {
        console.error(`Error deleting genre with ID ${id}:`, error.message);
        res.status(500).json({ error: `Failed to delete genre with ID ${id}` });
    }
});

module.exports = router;
