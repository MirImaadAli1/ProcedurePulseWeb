import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { DeleteOutline } from '@mui/icons-material';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase'; // Adjust the path to your Firebase config

const EditFormModal = ({ open, onClose, formData, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (formData) {
      setTitle(formData.title || '');
      setDescription(formData.description || '');
      const initializedQuestions = (formData.questions || []).map((question) => ({
        ...question,
        // Remove checkbox-related initialization
        // commentsChecked: question.commentsChecked ?? false,
        // imageChecked: question.imageChecked ?? false,
        // yesNoChecked: question.yesNoChecked ?? false,
      }));
      setQuestions(initializedQuestions);
    }
  }, [formData]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'Audit', formData.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        const updatedQuestions = questions.map((question, index) => ({
          ...existingData.questions[index],
          ...question,
        }));

        await updateDoc(docRef, {
          title,
          description,
          questions: updatedQuestions,
        });

        onSave({ ...formData, title, description, questions: updatedQuestions });
      }
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
      // Remove checkbox-related properties
      // commentsChecked: true,
      // imageChecked: true,
      // questionNumber: questions.length + 1,
      value: '',
      // yesNoChecked: true,
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

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
            {/* Remove checkbox-related UI elements */}
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={question.commentsChecked}
                  onChange={(e) => handleQuestionChange(index, 'commentsChecked', e.target.checked)}
                />
              }
              label="Comments"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={question.imageChecked}
                  onChange={(e) => handleQuestionChange(index, 'imageChecked', e.target.checked)}
                />
              }
              label="Image"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={question.yesNoChecked}
                  onChange={(e) => handleQuestionChange(index, 'yesNoChecked', e.target.checked)}
                />
              }
              label="Yes/No"
            /> */}
            <IconButton onClick={() => deleteQuestion(index)} aria-label="Delete question">
              <DeleteOutline />
            </IconButton>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            onClick={addQuestion}
            variant="contained"
            sx={{
              backgroundColor: '0da2ff ', // Blue background
              color: 'lightgray', // Light gray text color
              '&:hover': {
                backgroundColor: 'darkblue', // Darker blue on hover
              }
            }}
          >
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
        // Remove checkbox-related properties
        // commentsChecked: PropTypes.bool,
        // imageChecked: PropTypes.bool,
        // questionNumber: PropTypes.number,
        value: PropTypes.string,
        // yesNoChecked: PropTypes.bool,
      })
    ),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditFormModal;
