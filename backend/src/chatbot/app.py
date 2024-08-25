from fastapi import FastAPI, HTTPException
import logging
from pydantic import BaseModel, Field
from pydantic.dataclasses import dataclass
from typing import List, Optional

from src.chatbot.chatgpt import ChatGPT

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
chatgpt = ChatGPT()

@dataclass(frozen=True)
class Prompt:
    role: str
    content: str
    history: Optional[List] = None

@app.get("/")
async def root():
    """
    Root endpoint for the FastAPI application.
    """
    return {
        "role": "assistant",
        "content": "Welcome to the ChatGPT API!"
    }

@app.post("/generate")
async def generate_text(prompt: Prompt):
    """
    Generate a response from the ChatGPT object based on the role and prompt.
    """
    logger.info("Endpoint '/generate' has been called with prompt: %s", prompt)
    try:
        response = chatgpt.generate(prompt.role, prompt.content, prompt.history)
        return {
            "role": "assistant",
            "content": response,
            }
    except Exception as e:
        logger.error("Error in '/generate' endpoint: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    
