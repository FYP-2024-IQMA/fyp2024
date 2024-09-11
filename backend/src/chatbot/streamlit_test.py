from fastapi import FastAPI
from langchain_community.callbacks.streamlit import StreamlitCallbackHandler
import streamlit as st

from chroma_setup import agent_executor

app = FastAPI()

st.title("Langchain Chatbot Demo")

# init chat history
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# display chat history on app rerun
for message in st.session_state.chat_history:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# get user input
if prompt := st.chat_input("What would you like to do today?"):
    # display user input
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # store user input
    st.session_state.chat_history.append({
        "role": "user", 
        "content": prompt
    })

    # get agent response
    with st.chat_message("assistant"):
        # chat function
        st_callback = StreamlitCallbackHandler(st.container())
        response = agent_executor.invoke({
            "input": prompt}, 
            {"callback": [st_callback]}
        )
        st.markdown(response["output"])

        # store agent response
        st.session_state.chat_history.append({
            "role": "assistant",
            "content": response
        })