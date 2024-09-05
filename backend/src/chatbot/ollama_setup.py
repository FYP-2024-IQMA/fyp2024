from dotenv import load_dotenv
import os
import subprocess

from pathlib import Path
from huggingface_hub import hf_hub_download

load_dotenv()

def find_gguf_file(search_path='.'):
    """
    Find the .gguf file in the specified path.

    Params:
    :search_path (str): path to search for the gguf file

    Returns:
    :gguf_path (str): path to the gguf file
    """
    gguf_files = list(Path(search_path).rglob('*.gguf'))
    return gguf_files[0] if gguf_files else None

def download_gguf(repo_id, filename, output_dir):
    """
    Download the .gguf file from the Hugging Face Hub.

    Params:
    :repo_id (str): Hugging Face Hub repository ID
    :filename (str): name of the file to download
    :output_dir (str): directory to save the file
    """
    hf_read_token = os.getenv("HUGGINGFACE_READ")
    try:
        file_path = hf_hub_download(
            repo_id=repo_id,
            filename=filename,
            token=hf_read_token,
            local_dir=output_dir
        )
        print(f"Downloaded the .gguf file to: {file_path}")
    except Exception as e:
        print(f"Error downloading the file: {e}")

def create_model():
    """
    Create ollama model file from .gguf file.
    """
    try:
        result = subprocess.run(['ollama', 'create', 'test_model', '-f', 'Modelfile'])
        print(result)
    except subprocess.CalledProcessError as e:
        print(f"Error creating the model: {e}")

if __name__ == "__main__":
    # repo_id = "kbang2021/unsloth-Meta-Llama-3.1-8B-Instruct-bnb-4bit"
    repo_id = "kbang2021/unsloth-Meta-Llama-3.1-8B-Instruct-bnb-4bit"
    filename = "unsloth.Q4_K_M.gguf"
    gguf_path = find_gguf_file()
    
    # Ensure the local directory exists
    # Path(modelfile_path).mkdir(parents=True, exist_ok=True)

    # if .gguf doesn't exist, download it from the Hugging Face Hub
    if gguf_path:
        print(f"Found the .gguf file at: {gguf_path}")
        os.chdir("../models")
    else:
        os.chdir("../models")
        download_gguf(repo_id, filename, '.')
    
    create_model()
            