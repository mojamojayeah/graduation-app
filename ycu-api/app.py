import os
import pickle as pkl
from difflib import SequenceMatcher

import gensim
import nltk
import pandas as pd
import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from gramformer import Gramformer

en_word_list = pd.read_csv('./DataSet/english_words_list.csv',usecols=['Lemma\n（見出し語）','Rank\n(順位)','Frequency\n(頻度)','Commentary\n(解説)']).sort_values('Frequency\n(頻度)',ascending=False)
nltk.download('punkt')

# suggesion_theme
def get_synonyms_w2v(text,model):
    results = []
    for word, sim in model.most_similar(text, topn=20):
        results.append({'term': word, 'similarity': sim})
    return results

def get_theme_w2v(text,model):
    results = []
    return_list = []
    theme_len = len(text)

    for word, sim in model.most_similar(text, topn=100):        
        word_len = len(word)
        if theme_len > word_len:
            r = max([SequenceMatcher(None, word, text[i:i+word_len]).ratio() for i in range(theme_len-word_len+1)])
            if r >0.8:
                pass
            else:
                results.append({'term': word, 'similarity': sim,'r':r})
                return_list.append(word)
        elif theme_len > word_len:
            r = max([SequenceMatcher(None, text, word[i:i+theme_len]).ratio() for i in range(word_len-theme_len+1)])
            if r >0.8:
                pass
            else:
                results.append({'term': word, 'similarity': sim,'r':r})
                return_list.append(word)
        else:
            pass
    return return_list


def calc_similarity_w2v(text1, text2,model):
    sim = model.wv.similarity(text1, text2)
    return sim

def suggestion_theme(sentence_list,theme_list):
    suggestion_theme_list = list(set(theme_list) - set(sentence_list))
    print(len(suggestion_theme_list))
    return en_word_list[en_word_list['Lemma\n（見出し語）'].isin(suggestion_theme_list)].drop('Rank\n(順位)', axis=1)

def sentence_to_word(text):
    word_list = []
    tmp_lst = text.replace('?','').replace('!','').replace('.','').split()
    for word in tmp_lst:
        word_list.append(word)
    return word_list

# gramformer

def set_seed(seed):
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)

def gram_former(text):
    gf = Gramformer(models = 1, use_gpu=False) 
    influent_sentences = nltk.sent_tokenize(text)
    return_sentences=[]
    for influent_sentence in influent_sentences:
        corrected_sentences = gf.correct(influent_sentence, max_candidates=1)
        for corrected_sentence in corrected_sentences:
            return_sentences.append(corrected_sentence[0])
    return (return_sentences)


app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    return "text parser:)"

@app.route("/post/gram", methods=["GET", "POST"])
def create_task():
    final_text = request.get_json("text")['text']
    set_seed(1212)
    gramaformer_sentences = gram_former(final_text)
    return jsonify({'gramaformersentences':gramaformer_sentences}), 201

@app.route("/post/theme", methods=["GET", "POST"])
def create_theme():
    final_text = request.get_json("text")['text']
    final_theme = request.get_json("theme")['theme']
    data_path='wiki-news-300d-1M.vec'
    out_dir = "./DataSet"
    in_path=os.path.join(out_dir,data_path+'.pkl')
    with open(in_path,'rb') as fr:
        model0=pkl.load(fr)
    theme_list = get_theme_w2v(final_theme,model0)
    sentence_list = sentence_to_word(final_text)
    theme = suggestion_theme(sentence_list,theme_list)
    return jsonify({'theme':theme.values.tolist(),'word':theme_list}), 201

if __name__=='__main__':
    app.debug = True
    app.run(host='127.0.0.1', port=5000)
