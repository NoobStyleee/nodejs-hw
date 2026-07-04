import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

// Застосовуємо authenticate до кожного маршруту нотаток
router.get('/notes', authenticate, celebrate(getAllNotesSchema), getAllNotes);
router.get(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById,
);
router.post('/notes', authenticate, celebrate(createNoteSchema), createNote);
router.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);
router.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);

export default router;
