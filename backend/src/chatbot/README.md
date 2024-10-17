## This folder houses all the code for running the chatbot.

# Here are a list of what it contains:
- app.py : main script for running the FastAPI server to host the endpoints for the mobile app
- llamap_notebook.ipynb : demo notebook for working with LlamaIdex & ChromaDB
- streamlit_test.py : Streamlit demo

- setup files:
    - chatgpt.py : script for interfacing OpenAI API
    - chroma_setup.py : for loading the vector DB and initializing the agent
    - Dockerfile : script for starting FastAPI server
    - langchain_setup.py : script for setting up Agent RAG with branching
    - ollama_setup.py : for setting up the llama 3.1 8B model
    - langchain_setup.py : for loading the agent-integrated chain

