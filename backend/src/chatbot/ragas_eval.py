# This script is for evaluating the RAG model.
from datasets import Dataset
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import pandas as pd
from ragas import evaluate
from ragas.metrics import (
    answer_relevancy,
    faithfulness,
    context_recall,
    context_precision,
)

from chroma_setup import agent_executor

# generate model response
csv_set = pd.read_csv("ragas_testset.csv")
results, contexts = [], []
for idx in range(len(csv_set)):
    prompt = csv_set.iloc[idx, :]["question"]
    response = agent_executor.invoke({
        "input":prompt
    })
    tries = 0
    while not response["intermediate_steps"][-1][1] and tries < 5:
        response = agent_executor.invoke({
            "input":prompt
        })
        tries += 1
    print(f"Prompt: {prompt}")
    print(f"Response: {response['output']}")
    print(f"Context: {response['intermediate_steps']}")
    results.append(response['output'])
    if not response["intermediate_steps"][-1][1]:
        contexts.append(["Not available"])
    else:
        contexts.append(response["intermediate_steps"][-1][1])

# evaluate model response
critic_llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
d = {
    "question": csv_set["question"].to_list(),
    "response": results,
    "context": contexts,
    "answer": csv_set["ground_truth"].to_list()
}
dataset = Dataset.from_dict(d)
result = evaluate(
    dataset=dataset,
    metrics=[
        answer_relevancy, 
        faithfulness, 
        context_recall, 
        context_precision],
    llm=critic_llm,
)

result = result.to_pandas()
print(f"Results: {result[["faithfulness", "answer_relevancy", "context_recall", "context_precision"]].mean(axis=0)}")

# save results
results.to_csv("ragas_results.csv", index=False)
print("Results saved to ragas_results.csv")