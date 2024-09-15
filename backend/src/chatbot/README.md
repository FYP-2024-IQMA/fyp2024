## This folder houses all the code for running the chatbot.

# Here are a list of what it contains:
- app.py : main script for running the FastAPI server to host the endpoints for the mobile app
- setup files:
    - chroma_setup.py : for loading the vector DB and initializing the agent
    - ollama_setup.py : for setting up the llama 3.1 8B model
    - langchain_setup.py : for loading the agent-integrated chain
- llamap_notebook.ipynb : demo notebook for working with LlamaIdex & ChromaDB
- streamlit_testpy : Streamlit demo