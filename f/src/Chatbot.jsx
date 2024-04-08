import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const MyForm = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/generate_text/', {
        params: {
          text: inputText,
          num_return_sequences: 1,
          max_new_tokens: 50,
        },
      });

      const newMessage = {
        type: 'user',
        text: inputText,
      };

      const botMessage = {
        type: 'bot',
        text: response.data.generated_text[0],
      };

      setMessages([...messages, newMessage, botMessage]);
      setInputText('');
    } catch (error) {
      console.error('Error fetching generated text:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chatbot
      </Typography>
      <Grid container spacing={2}>
        {messages.map((message, index) => (
          <Grid key={index} item xs={12}>
            <Box
              sx={{
                padding: 1,
                borderRadius: 8,
                backgroundColor: message.type === 'user' ? '#e0f7fa' : '#f0f0f0',
                alignSelf: message.type === 'user' ? 'flex-start' : 'flex-end',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter text"
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Generate Text
        </Button>
      </form>
    </Box>
  );
};

export default MyForm;
