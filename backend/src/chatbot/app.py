from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from langchain_openai import ChatOpenAI
from langchain_community.adapters.openai import convert_openai_messages
import logging
import os
from pydantic.dataclasses import dataclass
from typing import List, Optional


# dealing with relative / absolute imports
if __package__ is None or __package__ == '' or __name__ == '__main__':
    from chatgpt import ChatGPT
    # from chroma_setup import agent_executor
else:
    from src.chatbot.chatgpt import ChatGPT
    # from src.chatbot.chroma_setup import agent_executor

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()
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
    
@app.post("/langchain")
async def langchain_text(prompt: Prompt):
    """
    Generate a response from the ChatGPT object based on the role and prompt.
    """
    logger.info("Endpoint '/langchain' has been called with prompt: %s", prompt)
    try:
        llm = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
        if prompt.history:
            langchain_format = convert_openai_messages(prompt.history)
            response = llm.invoke(langchain_format)
        else:
            # langchain_format = convert_openai_messages([{"role": prompt.role, "content": prompt.content}])
            response = llm.invoke([{"role": prompt.role, "content": prompt.content}])

        return {
            "role": "assistant",
            "content": response.content,
            }
    except Exception as e:
        logger.error("Error in '/langchain' endpoint: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))