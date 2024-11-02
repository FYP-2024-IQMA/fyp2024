# This script is for generating the test set.

from dotenv import load_dotenv
from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import nest_asyncio
import os
import pandas as pd
import pickle
from ragas.testset import TestsetGenerator


load_dotenv()
nest_asyncio.apply()

# model_name = "distilbert/distilbert-base-multilingual-cased"
# embeddings = HuggingFaceEmbeddings(model_name=model_name)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=os.environ.get("OPENAI_API_KEY"))

# LOAD documents
document_path = "./docs"
parser = LlamaParse(result_type="text", api_key=os.getenv("LLAMA_CLOUD_API_KEY"))
file_extractor = {".docx": parser}
document_reader = SimpleDirectoryReader(input_dir=document_path, file_extractor=file_extractor)
documents = document_reader.load_data()
print(f"Loaded {len(documents)} documents")

# Clean documents
documentList = []
for doc in documents:
    cleaned_text = str(doc.text).replace("\n", " ").replace("\\n", " ").replace("\t", " ").replace("\\t", " ")
    formatted_text = " ".join(part for part in cleaned_text.split(" ") if part != "")
    doc.metadata["filename"] = doc.metadata["file_name"]
    new_doc = Document(
        page_content=formatted_text,
        id=doc.id_,
        metadata=doc.metadata,
    )
    documentList.append(new_doc)
print(f"Cleaned {len(documentList)} documents")

# Save documents
with open("documents.pkl", "wb") as f:
    pickle.dump(documentList, f)

# with open("documents.pkl", "rb") as f:
#     documentList = pickle.load(f)
# load openai chat and embedding
# openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# def get_embedding(text, model="text-embedding-3-small"):
#    text = text.replace("\n", " ")
#    return openai_client.embeddings.create(input = [text], model=model).data[0].embedding

generator_llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=os.getenv("OPENAI_API_KEY"))

generator = TestsetGenerator.from_langchain( 
    llm=generator_llm, 
    embedding_model=embeddings
)

testset = generator.generate_with_langchain_docs(
    documentList,
    testset_size=10,
)
print("Testset of length", len(testset), "generated")

csv_set = testset.to_pandas()
csv_set.to_csv("ragas_testset.csv", index_label=False)
print("Testset generated and saved to testset.csv")