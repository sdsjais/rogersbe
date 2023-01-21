import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from datetime import datetime

def text_from_website(URL):
    r = requests.get(URL)
    soup = BeautifulSoup(r.content, 'lxml')
    #print(URL)
    df = pd.DataFrame(columns=['Page', 'Text'])
    for paragraph in soup.find_all('p'):
        #print(paragraph.string)
        text = str(paragraph.text)
        text = ' '.join(text.split())
        if len(text.split()) < 20:
            continue
        row = {'Page': str(URL[25:]), 'Text' : str(text)}
        row = pd.Series(row)
        df = pd.concat([df, pd.DataFrame([row], columns=row.index)], ignore_index=True)
    return df

def get_urls_of_xml(xml_url):
    r = requests.get(xml_url)
    xml = r.text
    soup = BeautifulSoup(xml)

    links_arr = []
    for link in soup.findAll('loc'):
        linkstr = link.getText('', True)
        links_arr.append(linkstr)

    return links_arr

# links_data_arr = get_urls_of_xml("https://www.axisbank.com/sitemap-english.xml")

# data = pd.DataFrame()
# for row in links_data_arr:
#     data = pd.concat([data, text_from_website(row)], ignore_index=True)

# data.to_csv('allaxisbankwebsitedata.csv')

# data = pd.read_csv('Desktop/allaxisbankwebsitedata.csv')
data_ = pd.read_pickle('new_.csv')

from tenacity import (
    retry,
    stop_after_attempt,
    wait_random_exponential,
)  # for exponential backoff
import openai
from openai.embeddings_utils import get_embedding

# imports
# import time
import openai


# @retry(wait=wait_random_exponential(min=50, max=70), stop=stop_after_attempt(1))
# def completion_with_backoff():
#     data_['ada_embedding'] = data_.Text.apply(lambda x: get_embedding(x, engine='text-embedding-ada-002'))

# completion_with_backoff()
# data_.to_pickle('Desktop/sample_embedded.csv')

# data_ = pd.read_pickle('Desktop/sample_embedded.csv')
# print(data_.columns)

from openai.embeddings_utils import get_embedding, cosine_similarity
# search through the text for a specific question

def vector_similarity(x: list[float], y: list[float]) -> float:
    return np.dot(np.array(x), np.array(y))

def search_reviews(df, question, n=3, pprint=True):
    embedding = get_embedding(
        question,
        engine="text-embedding-ada-002"
    )
    
    df["similarities"] = df.ada_embedding.apply(lambda x: vector_similarity(x, embedding))
    res = (
        df.sort_values("similarities", ascending=False)
        .head(n)
    )
    return res

def construct_prompt(question: str, context: str) -> str:
    header = """Answer the question using the provided context, and if the answer is not contained within the text below, say "Sorry, I cannot answer"\n\nContext:\n"""
    return header + "".join(context) + "\n\n Q: " + question + "\n A:"

def answer_question(question: str):  
    context = ""
    res = search_reviews(data_, question, n=3)
    for text in res['Text']:
        context = ' '.join([context, text])
    # print(context)
    response = openai.Completion.create(
        prompt=question + "only in context of axis bank, and if it is not related to axis bank then return '.'",
        model="text-davinci-003",
        temperature=0,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        # max_tokens=cnt
    )
    gpt_answer = response["choices"][0]["text"].lstrip()
    context = ' '.join([context, gpt_answer])
    print("this context", context)
    prompt = construct_prompt(question, context)
    ans = openai.Completion.create(
        prompt=prompt,
        temperature=0,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        model="text-davinci-003"
    )["choices"][0]["text"].strip(" \n")
    return ans
def predict(inputs):
    op = answer_question(inputs)
    print(op)
    return op