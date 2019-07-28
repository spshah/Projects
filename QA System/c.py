#!/usr/bin/env python

#The language code must be a BCP-47 identifier.
#lang='bn-IN'
#lang='en-IN'
lang='hi-IN'


import io
import random
import string
import warnings
import numpy as np
import  nltk
from functions import *
from nltk.stem import WordNetLemmatizer
warnings.filterwarnings("ignore")
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
warnings.filterwarnings("ignore")
#nltk.download('popular',quiet=True)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/Shashi/Desktop/chatbot/vchat/authkey.json"


print("import complete")





        
with open('text1.txt','r',encoding='utf8',errors='ignore')as f:
   raw=f.read().lower()

#f =f.read().replace('"', '')
word_tokens=nltk.word_tokenize(raw)
sent_tokens=nltk.sent_tokenize(raw)
#word_tokens=[word.lower() for word in word_tokens if #word.isalnum()]
#print(word_tokens)
#stop_words=set(stopwords.words('english'))
#words=[w for w in word_tokens if not w in stop_words]
#print(sent_tokens)
#print(words)
porter=PorterStemmer()
stemmed_tokens=[porter.stem(word) for word in sent_tokens]
#print(stemmed_tokens)
sent_tokens[:5]


lemmer=WordNetLemmatizer()
def LemTokens(stemmed_tokens):
  return[lemmer.lemmatize(token) for token in stemmed_tokens]
remove_punct_dict=dict((ord(punct),None) for punct in string.punctuation)
print("Punc: ",string.punctuation)
def LemNormalize(stemmed_tokens):
    return LemTokens(nltk.word_tokenize(stemmed_tokens.lower().translate(remove_punct_dict)))


GREETING_INPUTS=("hello","hi","greetings","sup?","what's up","hey",)
GREETING_RESPONSE=["hi","hey","*nods*","hi there","hello","Thanks for talking to me"]

def greeting(sentence):
 for word in sentence.split():
   if word.lower() in GREETING_INPUTS:
      return random.choice(GREETING_RESPONSE)

def response(user_response):
    bot_response=''
    stemmed_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize,stop_words='english')
    tfidf=TfidfVec.fit_transform(stemmed_tokens)
    vals=cosine_similarity(tfidf[-1],tfidf)
    idx=vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf==0):
        bot_response=bot_response+"Sorry:(I am incompetent to give your answer"
        return bot_response
    else:
        bot_response = bot_response+stemmed_tokens[idx]
        return bot_response

