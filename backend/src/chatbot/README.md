## This folder houses all the code for running the chatbot.

# Here are a list of what it contains:
- app.py : main script for running the FastAPI server to host the endpoints for the mobile app
- llamap_notebook.ipynb : demo notebook for working with LlamaIdex & ChromaDB
- streamlit_test.py : Streamlit demo

- setup files:
    - chroma_langchain_db : ChromaDB vectore store
    - docs : directory storing all documents for reference
    - evaluation : all RAGAS evaluation related scripts
        - documents.pkl : pickled document files
        - evaluation_notebook.ipynb : notebook as example for working with RAGAS
        - ragas_eval.py : code reference for running ragas evaluation
        - ragas_results_openai.csv : question-answer pair using ChatGPT
        - ragas_results_rag.csv : question-answer pair using RAG
        - ragas_setup.py : code ferene for setting up ragas
        - ragas_testset.csv : test dataset for running RAGAS
    - open-source : all open source code and folders
        - Modelfile : for giving llama instructions on how to build a local model
        - ollama_setup.py : for setting up the llama 3.1 8B model

    - app.py : FastAPI endpoint to call chatbots
    - chatgpt.py : script for interfacing OpenAI API
    - chroma_setup.py : for loading the vector DB and initializing the agent executor
    - Dockerfile : script for starting FastAPI server
    - langchain_setup.py : script for setting up Agent RAG with branching
    - llamap_notebook.ipynb : notebook for working with documents and preparing them for loading into vector storage
    - prompts.py : prompts for chatbots
    - streamlit_test.py : Streamlit Demo for testing chatbot endpoints

