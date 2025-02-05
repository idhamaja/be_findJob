const Bookmark = require("../models/BookmarkModel");

module.exports = {
  createBookmark: async (req, res) => {
    const newBook = new Bookmark(req.body);

    try {
      await newBook.save();
      res.status(201).json("Bookmarks Successfully Created BOSS!!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      await Bookmark.findOneAndDelete(req.params.userId);
      res.status(200).json("Bookmark Successfully Deleted BOSS!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getBookmarks: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: req.params.userId });
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
