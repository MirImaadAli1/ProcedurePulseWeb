import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box
} from '@mui/material';
import PropTypes from 'prop-types';

const EditFormModal = ({ open, onClose, formData, onSave }) => {
  const [title, setTitle] = useState(formData.title);
  const [description, setDescription] = useState(formData.description);
  const [questions, setQuestions] = useState(formData.questions || []);

  const handleSave = () => {
    onSave({ ...formData, title, description, questions });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Form</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        {questions.map((question, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Question ${index + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            margin="normal"
          />
        ))}
        <Box mt={2}>
          <Button onClick={addQuestion} variant="outlined">
            Add Question
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
      })
    ),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditFormModal;
