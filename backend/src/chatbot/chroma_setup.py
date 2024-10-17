# This script is for parsing documents in the doc folder.

import chromadb
from dotenv import load_dotenv
from langchain import hub
from langchain.agents import create_react_agent, AgentExecutor
from langchain_community.tools import TavilySearchResults
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from llama_index.core import SimpleDirectoryReader, StorageContext, VectorStoreIndex
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_parse import LlamaParse
import nest_asyncio
import os
import time
from uuid import uuid4

# connect to environment variables
load_dotenv()
nest_asyncio.apply()

persist_dir = "./chroma_langchain_db"

# attempt to load documents from persistent storage
try:
    print(f"Attempting to load documents from persistent storage")
    model_name = "distilbert/distilbert-base-multilingual-cased"
    embeddings = HuggingFaceEmbeddings(model_name=model_name)
    print(f"Completed setting up embeddings")

    vectorstore = ChromaVectorStore.from_params(
        collection_name="iqma_collection",
        embedding_function=embeddings,
        persist_dir=persist_dir,
    )
    print(f"Completed setting up vector store")

    index = VectorStoreIndex.from_vector_store(
        vectorstore,
        embed_model=embeddings,
    )
    print(f"Completed setting up index")
    index_loaded = True
except:
    index_loaded = False
    print(f"Failed to load documents from persistent storage")

# load, process and store documents in persistent storage if not existent
if not index_loaded:
    print(f"Loading documents from docs folder")
    # set up parser
    parser = LlamaParse(
        result_type="text",
        api_key=os.environ.get("LLAMA_CLOUD_API_KEY")
    )

    # set up directory reader
    file_extractor = {".docx": parser}
    document_reader = SimpleDirectoryReader(input_dir="./docs", file_extractor=file_extractor)
    documents = document_reader.load_data()

    # set up chromadb
    db = chromadb.PersistentClient(path=persist_dir)
    chroma_collection = db.get_or_create_collection("iqma_collection")

    # create vector store
    vectorstore = ChromaVectorStore(
        collection=chroma_collection,
    )
    storage_context = StorageContext(
        vectorstore=vectorstore,
        document_reader=document_reader,
    )
    index = VectorStoreIndex.from_documents(
        documents, 
        storage_context=storage_context, 
        embed_model=embeddings
    )

# create query engine
query_engine = index.as_query_engine()

# create langchain tool
query_engine_tool = QueryEngineTool(
    query_engine=query_engine,
    metadata=ToolMetadata(
        name="iqma course content query engine",
        description=(
            "Provides a tool to search for course content in the IQMA documents. Always use this tools first to search for documents before using the search tool."
        ),
    ),
)

for i in range(2):
    try:
        time.sleep(5)
        query_engine_tool = query_engine_tool.as_langchain_tool()
        print(f"Successfully created langchain tool")
    except:
        print(f"Failed to create langchain tool")
        pass

# create internet search tool
search_tool = TavilySearchResults(
    max_results=3,
    include_answer=True,
    include_raw_content=True
)
search_tool.description += "Only use this tool after the IQMA tool has been used to search for documents"

# create langchain agent
llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.environ.get("OPENAI_KEY"),
    temperature=1,
)
prompt = hub.pull("hwchase17/react", api_key=os.environ.get("LANGCHAIN_API_KEY"))
system_prompt = """
Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer

Thought: you should always think about what to do

Action: the action to take, should be one of [{tool_names}]

Action Input: the input to the action. If you are using the same tool because the response is not waht yo uneed, think about how you can rephrase the input and make sure it is different from the previous input.

Observation: the result of the action

... (this Thought/Action/Action Input/Observation can repeat N times)

Thought: I now know the final answer

Final Answer: the final answer to the original input question

Begin!

Question: {input}

Thought:{agent_scratchpad}
"""
prompt.template = system_prompt

# initiate prompt
langchain_tools = [query_engine_tool, search_tool]
agent = create_react_agent(llm, langchain_tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=langchain_tools,
    verbose=True,
    handle_parsing_errors=True
)

#######################################################

# # set up parser
# print(f"Setting up parser")
# parser = LlamaParse(
#     result_type="text"
# )

# # set up embeddings to convert text to vectors
# print(f"Setting up embeddings")
# model_name = "distilbert/distilbert-base-cased"
# embeddings = HuggingFaceEmbeddings(model_name=model_name)

# # set up chromadb to store vectors
# # vector_store = Chroma(
# #     collection_name="iqma_collection",
# #     embedding_function=embeddings,
# #     persist_directory="./chroma_langchain_db"
# # )

# # use SimpleDirectoryReader to parse our files
# print(f"Reading files")
# file_extractor = {".docx": parser}
# reader = SimpleDirectoryReader(input_dir="./docs", file_extractor=file_extractor)
# documents = reader.load_data() # parsed files

# # Convert from llamaparse to langchain Doc objects
# print(f"Converting to langchain Doc objects")
# new_docs = []
# for doc in documents:
#     new_doc = Document(
#         page_content=doc.text,
#         id=doc.id_,
#         metadata =doc.metadata
#     )
#     new_docs.append(new_doc)

# # initiate chromadb client & create vector store
# print(f"Creating vector store")
# persistent_client = chromadb.PersistentClient(path="./chroma_langchain_db")
# collection = persistent_client.get_or_create_collection("iqma_collection")
# vector_store_from_client = Chroma(
#     client=persistent_client,
#     collection_name="iqma_collection",
#     embedding_function=embeddings,
# )

# # adding documents to chroma
# print(f"Adding documents to chroma")
# uuids = [str(uuid4()) for _ in range(len(new_docs))]
# vector_store_from_client.add_documents(documents=new_docs, ids=uuids)

# close chromadb client
# print(f"Closing client")