import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DeleteOutline } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase'; // Adjust the path to your Firebase config

const EditFormModal = ({ open, onClose, formData, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (formData) {
      setTitle(formData.title || '');
      setDescription(formData.description || '');
      setQuestions(formData.questions || []);
    }
  }, [formData]);

  const handleSave = async () => {
    const updatedQuestions = questions.map((question) => ({
      commentsChecked: question.commentsChecked ?? false,
      imageChecked: question.imageChecked ?? false,
      questionNumber: question.questionNumber ?? 0,
      value: question.value ?? '',
      yesNoChecked: question.yesNoChecked ?? false,
    }));

    try {
      await updateDoc(doc(db, 'Audit', formData.id), {
        title,
        description,
        questions: updatedQuestions,
      });
      onSave({ ...formData, title, description, questions: updatedQuestions });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const addQuestion = async () => {
    const newQuestion = {
      commentsChecked: false,
      imageChecked: false,
      questionNumber: questions.length + 1,
      value: '',
      yesNoChecked: false,
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    
    // Add new question to Firestore
    try {
      await updateDoc(doc(db, 'Audit', formData.id), {
        questions: updatedQuestions,
      });
    } catch (error) {
      console.error('Error adding question: ', error);
    }
  };

  const deleteQuestion = async (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);

    // Delete question from Firestore
    try {
      await updateDoc(doc(db, 'Audit', formData.id), {
        questions: updatedQuestions,
      });
    } catch (error) {
      console.error('Error deleting question: ', error);
    }
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
          <Box key={index} display="flex" flexDirection="column" mb={2}>
            <TextField
              fullWidth
              label={`Question ${index + 1}`}
              value={question.value}
              onChange={(e) => handleQuestionChange(index, 'value', e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={question.commentsChecked ?? false}
                  onChange={(e) => handleQuestionChange(index, 'commentsChecked', e.target.checked)}
                />
              }
              label="Comments"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={question.imageChecked ?? false}
                  onChange={(e) => handleQuestionChange(index, 'imageChecked', e.target.checked)}
                />
              }
              label="Image"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={question.yesNoChecked ?? false}
                  onChange={(e) => handleQuestionChange(index, 'yesNoChecked', e.target.checked)}
                />
              }
              label="Yes/No"
            />
            <IconButton onClick={() => deleteQuestion(index)} aria-label="Delete question">
              <DeleteOutline />
            </IconButton>
          </Box>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        commentsChecked: PropTypes.bool,
        imageChecked: PropTypes.bool,
        questionNumber: PropTypes.number,
        value: PropTypes.string,
        yesNoChecked: PropTypes.bool,
      })
    ),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditFormModal;
