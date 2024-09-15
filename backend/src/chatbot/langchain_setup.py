# script for creating chains

from dotenv import load_dotenv
from functools import partial
from langchain.schema.runnable import RunnableBranch, RunnablePassthrough
from langchain.schema.runnable.passthrough import RunnableAssign
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda
import os

from chroma_setup import agent_executor

# function for seeing runnables
def RPrint(preface="State: "):
    def print_and_return(x, preface=""):
        print(f"{preface}{x}")
        return x
    return RunnableLambda(partial(print_and_return, preface=preface))

def PPrint(preface="State: "):
    def print_and_return(x, preface=""):
        print(f"{preface}{x}")
        return x
    return RunnableLambda(partial(print_and_return, preface=preface))

# Create chatbot chain for replying user
answer_prompt = """<system_prompt>
YOU ARE AN AWARD-WINNING CAREER COACH AND LEADERSHIP TRAINER, RECOGNIZED BY THE GLOBAL LEADERSHIP ASSOCIATION (2023) AS THE "TOP LEADERSHIP MENTOR OF THE YEAR." YOUR PRIMARY GOAL IS TO HELP USERS DEVELOP AND REFINE LEADERSHIP SKILLS IN THE WORKPLACE, GUIDING THEM THROUGH TRAINING, PRACTICAL EXERCISES, AND REAL-WORLD IMPLEMENTATION OF LEADERSHIP PRINCIPLES.

###INSTRUCTIONS###

- **SUMMARIZE AND ORGANIZE:** AFTER EVERY USER RESPONSE, YOU MUST CONCISELY SUMMARIZE KEY POINTS AND ORGANIZE THEM INTO CLEAN, ACTIONABLE NOTES THAT CAN HELP USERS REVISE THEIR LEADERSHIP TRAINING MATERIAL EFFECTIVELY. THIS IS A TOP PRIORITY. IF THE USER DID NOT PROVIDE MUCH, BUILD OFF WHAT THEY MENTIONED AND SHARE LEADERSHIP SKILL DEVELOPMENT COACHING ADVICE BASED ON THEIR PREVIOUS INPUT.
  
- **MENTORING AND GUIDANCE:** PROVIDE MENTORING AND GUIDANCE TO USERS, HELPING THEM IDENTIFY AREAS FOR LEADERSHIP DEVELOPMENT, WHETHER IT BE IN DECISION-MAKING, COMMUNICATION, TEAM MANAGEMENT, OR CONFLICT RESOLUTION.

- **REAL-LIFE APPLICATION:** WHEN USERS ASK QUESTIONS OR SHARE THEIR EXPERIENCES, ENGAGE IN A CONVERSATIONAL MANNER. GUIDE THEM TO APPLY LEADERSHIP PRINCIPLES TO REAL-WORLD SCENARIOS BASED ON THEIR RESPONSES, ENSURING THAT THEY CAN REMEMBER AND IMPLEMENT THE KNOWLEDGE EFFECTIVELY.

- **CHAIN OF THOUGHTS:**
  1. **LISTEN AND UNDERSTAND:** Carefully analyze the user’s input to understand their current challenge, question, or reflection.
  2. **SUMMARIZE KEY LEARNINGS:** Summarize the user’s response by highlighting critical points, and organize these into concise notes.
  3. **PROVIDE ACTIONABLE FEEDBACK:** Offer specific, actionable advice on how to address the challenge or question, connecting it to fundamental leadership principles.
  4. **REAL-WORLD IMPLEMENTATION:** Encourage users to practice or apply their learning in their current work environment, providing examples and scenarios that align with their input.
  5. **FOLLOW-UP:** Suggest reflective questions or follow-up tasks to reinforce continuous leadership development and improvement.

###FEW-SHOT EXAMPLES###

**User Input Example 1:**  
*"I'm struggling with delegating tasks to my team because I worry they won't do it as well as I would."*

**Chatbot Response:**  
1. **Summarized Key Points:**  
   - Struggling with delegation due to concerns about task quality.
   - Prefers to do tasks themselves to maintain high standards.
   
2. **Actionable Feedback:**  
   - Recognize that effective delegation is key to leadership. Focus on training your team members to meet the standards you expect, and set clear guidelines.  
   - Start by delegating smaller tasks and provide constructive feedback—this will help you build trust in their abilities over time.
   
3. **Real-Life Application:**  
   - Try delegating one small task this week. Provide your team member with clear instructions and expectations, then review the results together. Offer feedback to help them improve.

4. **Follow-Up:**  
   - How did the delegation process go? What challenges did you face, and what improvements can be made next time?

User input:
{input}
"""

answer_prompt_template = ChatPromptTemplate.from_template(answer_prompt)
answer_llm = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.environ.get("OPENAI_API_KEY"),
            temperature=1,
        )
answer_chain = answer_prompt_template | answer_llm | StrOutputParser()

# create chain for deciding which chain to use
branch_prompt = """
You job is to determine if the user is asking a question or looking for a summary. Choose the most likely topic based on the user input. Only one word is needed for the choice, no explanation is needed.\n[Options: question, summary]
"""
branch_prompt_template = ChatPromptTemplate.from_template(branch_prompt)
branch_llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.environ.get("OPENAI_API_KEY"),
    temperature=0.2,
)
branch_chain = branch_prompt_template | branch_llm | StrOutputParser()

# create chain for consolidating chain outputs and replying user
reply_prompt = """
Your job is to consolidate the outputs from the previous chains and reply to the user. If the choice is "question", compile a response using the input and the final answer from the agent. If the choice is "summary", compile a response using the input and the final answer from the answer chain.

Input:
{input}

Choice:
{choice}

Final Answer:
{final_answer}
"""

reply_prompt_template = ChatPromptTemplate.from_template(reply_prompt)
reply_llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.environ.get("OPENAI_API_KEY"),
    temperature=1,
)
reply_chain = reply_prompt_template | reply_llm | StrOutputParser()

# Chain logic
# branch_chain decides which chain to use
# if user ask question, use agent to get a final answer
# if user input, use chat_chain
full_chain = (
    PPrint()
    | RunnableAssign({'choice': branch_chain})
    | PPrint()
    | RunnableBranch(
        (lambda x: "question" in x["choice"].lower(), RunnableAssign({'final_answer': agent_executor})),
        # (lambda x: "summary" in x["choice"].lower(), RunnableAssign({'final_answer': answer_chain})),
        RunnableAssign({'final_answer': answer_chain})
    )
    | reply_chain
    | PPrint()
    | StrOutputParser()
)

input = "Why does a leader need to be adaptable?"
output = full_chain.invoke({"input": input})