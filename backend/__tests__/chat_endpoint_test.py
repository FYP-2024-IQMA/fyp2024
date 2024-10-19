# This test script is specifically for testing the Chat api endpoints.
# Make sure you run this file from the backend directory i.e.python -m pytest -s ./__tests__/chat_endpoint_test.py --log-cli-level=INFO

import logging
import os
import sys
from fastapi.testclient import TestClient

from src.chatbot.app import app

# setting directory as backend/src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../src")))

# setting up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.warning("Logging is active.")
client = TestClient(app)

#######################################################
# OPENAI API TESTS
#######################################################

def test_generate_text_no_history():
    # Test without history
    response = client.post("/generate", json={"role": "user", 
                                              "content": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                              })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200, "Generate endpoint is faulty."
    assert "42" in response.json()["content"], "ChatGPT is not generating the correct response."

def test_generate_text_with_history():
    # Test with history
    response = client.post("/generate", json={"role": "assistant", 
                                              "content": "Hello, how can I help you today?", 
                                              "history": [{
                                                  "role": "user", 
                                                  "content": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                                  }]
                                            })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200, "Generate endpoint is faulty."
    assert "42" in response.json()["content"], "ChatGPT is not generating the correct response."

def test_generate_text_invalid_role():
    # Test with missing role
    response = client.post("/generate", json={"prompt": "Hello, how can I help you today?"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422

def test_generate_text_invalid_prompt():
    # Test with missing prompt
    response = client.post("/generate", json={"role": "user"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422

#######################################################
# LANGCHAIN TESTS
#######################################################

def test_langchain_endpoint():
    # Test langchain endpoint
    response = client.post("/langchain", json={"role": "user", 
                                              "content": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                              })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200, "Langchain endpoint is faulty."
    assert "42" in response.json()["content"]["final_answer"]["output"], "Langchain is not generating the correct response."

def test_langchain_endpoint_with_history():
    # Test with history
    response = client.post("/langchain", json={"role": "assistant", 
                                              "content": "Hello, how can I help you today?", 
                                              "history": [{
                                                  "role": "user", 
                                                  "content": "Reply with '42'. Do not add any other text. Stop generating after you have replied with '42'."
                                                  }]
                                            })
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200, "Langchain endpoint is faulty."
    assert "42" in response.json()["content"]["final_answer"]["output"], "Langchain is not generating the correct response."

def test_langchain_endpoint_invalid_role():
    # Test with missing role
    response = client.post("/langchain", json={"prompt": "Hello, how can I help you today?"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422

def test_langchain_endpoint_invalid_prompt():
    # Test with missing prompt
    response = client.post("/langchain", json={"role": "user"})
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 422