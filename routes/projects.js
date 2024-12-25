const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const db = require('../config/database');

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateToken, (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  
  db.run(
    'INSERT INTO projects (title, description, start_date, end_date) VALUES (?, ?, ?, ?)',
    [title, description, start_date, end_date],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticateToken, (req, res) => {
  const { start_date, end_date } = req.query;
  let query = 'SELECT * FROM projects';
  const params = [];

  if (start_date && end_date) {
    query += ' WHERE start_date >= ? AND end_date <= ?';
    params.push(start_date, end_date);
  }

  db.all(query, params, (err, projects) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(projects);
  });
});

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, project) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  });
});

module.exports = router;