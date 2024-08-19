# Description: This file contains the ChatGPT class which is used to interact with the OpenAI GPT-3.5 API.

import openai
import os

from dotenv import load_dotenv
from time import sleep

load_dotenv()

class ChatGPT(object):
    """
    Main class to interact with OpenAI. Will require API key in the environment.
    """
    def __init__(self, num_tries=1, model="gpt-3.5-turbo", max_tokens=150, temperature=1.0):
        """
        Initialize the ChatGPT class.

        Params:
        :num_tries (int): number of times to try to reconnect to the API in case of network error.
        :model (str): model to use for the LLM
        :max_tokens (int): maximum number of tokens to generate
        :temperature (float): temperature for variance in reply (0 = consistent, 1 = random)
        """
        self.key = os.getenv("OPENAI_KEY")
        self.client = openai.OpenAI(api_key=self.key)
        self.num_tries = num_tries
        self.model = model
        self.max_tokens = max_tokens
        self.temperature = temperature

    def update_property(self, property_name, new_value):
        """
        Update specific properties of the class.

        Params:
        :property_name (str): name of the property to update
        :new_value (any): new value for the property
        """
        if hasattr(self, property_name):
            setattr(self, property_name, new_value)
        else:
            raise AttributeError(f"Property '{property_name}' does not exist.")
        
    def generate(self, role, prompt, history=None):
        """
        Generate a response from the LLM based on role and prompt.

        history = [
            {"role": "user",
            "content": "What is the meaning of life?"},
            {"role": "assistant",
            "content": "The meaning of life is 42."}
            ]

        Params:
        :role (str): role of the speaker (user or assistant)
        :prompt (str): user input
        :history (list): chat history if applicable

        Returns:
        :response_str (str): response from the LLM
        """
        is_done = False
        num_tries = self.num_tries
        response_str = "Error"
        # try to establish connection in case of server error
        while not is_done and num_tries > 0:
            try:
                if history:
                    updated_history = history + [{"role": role, "content": prompt}]
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=updated_history if history else [{"role": role, "content": prompt}],
                    max_tokens=self.max_tokens,
                    temperature=self.temperature,
                )
                response_str = response.choices[0].message.content
                is_done = True
            except Exception as err:
                # retry in 5 seconds in case of network error
                print(f"Error: {err}")
                num_tries -= 1
                print("Retrying in 5 seconds...")
                sleep(5)
                pass
        return response_str
    
if __name__ == "__main__":
    chat = ChatGPT()
    print(chat.generate("user", "What is the meaning of life?"))