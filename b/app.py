from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
from transformers import pipeline, set_seed

app = Flask(__name__)
CORS(app)  # Add CORS support to your Flask app

generator = pipeline('text-generation', model='openai-gpt')
set_seed(42)

@app.route('/generate_text/', methods=['GET'])
def generate_text():
    text = request.args.get('text')
    num_return_sequences = int(request.args.get('num_return_sequences'))
    max_new_tokens = int(request.args.get('max_new_tokens'))

    output = generator(text, max_new_tokens=max_new_tokens, num_return_sequences=num_return_sequences)

    generated_texts = [sequence['generated_text'][len(text):] for sequence in output]
    return jsonify({'generated_text': generated_texts})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
