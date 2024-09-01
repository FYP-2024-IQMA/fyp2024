# This script is for parsing documents in the doc folder.

import chromadb
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from llama_index.core import SimpleDirectoryReader
from llama_parse import LlamaParse
import nest_asyncio
from uuid import uuid4

load_dotenv()
nest_asyncio.apply()

# set up parser
print(f"Setting up parser")
parser = LlamaParse(
    result_type="text"
)

# set up embeddings to convert text to vectors
print(f"Setting up embeddings")
model_name = "distilbert/distilbert-base-cased"
embeddings = HuggingFaceEmbeddings(model_name=model_name)

# set up chromadb to store vectors
# vector_store = Chroma(
#     collection_name="iqma_collection",
#     embedding_function=embeddings,
#     persist_directory="./chroma_langchain_db"
# )

# use SimpleDirectoryReader to parse our files
print(f"Reading files")
file_extractor = {".docx": parser}
reader = SimpleDirectoryReader(input_dir="./docs", file_extractor=file_extractor)
documents = reader.load_data() # parsed files

# Convert from llamaparse to langchain Doc objects
print(f"Converting to langchain Doc objects")
new_docs = []
for doc in documents:
    new_doc = Document(
        page_content=doc.text,
        id=doc.id_,
        metadata =doc.metadata
    )
    new_docs.append(new_doc)

# initiate chromadb client & create vector store
print(f"Creating vector store")
persistent_client = chromadb.PersistentClient(path="./chroma_langchain_db")
collection = persistent_client.get_or_create_collection("iqma_collection")
vector_store_from_client = Chroma(
    client=persistent_client,
    collection_name="iqma_collection",
    embedding_function=embeddings,
)

# adding documents to chroma
print(f"Adding documents to chroma")
uuids = [str(uuid4()) for _ in range(len(new_docs))]
vector_store_from_client.add_documents(documents=new_docs, ids=uuids)

# close chromadb client
print(f"Closing client")