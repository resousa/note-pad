'use strict';

const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json');

module.exports = app => {
  app.get('/api/notes', (req, res) => res.json(notesData));

  app.post('/api/notes', (req, res) => {
    let note = req.body;
    let id = notesData.length;
    note.id = id;
    notesData.push(note);

    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(notesData),
      err => {
        if (err) throw err;
      }
    );
    res.json(notesData);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < notesData.length; ++i) {
      if (id === notesData[i].id) {
        notesData.splice(i, 1);
        return;
      }

      fs.writeFile(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesData),
        err => {
          if (err) throw err;
        }
      );
    }
    res.json(notesData);
  });
};