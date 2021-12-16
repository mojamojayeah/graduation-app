import nltk
import torch
from gramformer import Gramformer

nltk.download('punkt')


def set_seed(seed):
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)

set_seed(1212)

def gram_former(text):
    gf = Gramformer(models = 1, use_gpu=False) # 1=corrector, 2=detector
    influent_sentences = nltk.sent_tokenize(text)
    missCount = 0
    return_sentences=[]
    for influent_sentence in influent_sentences:
        corrected_sentences = gf.correct(influent_sentence, max_candidates=1)
        print("[Input] ", influent_sentence)
        for corrected_sentence in corrected_sentences:
            print("[Correction] ",corrected_sentence)
            missCount = missCount+gf.highlight(influent_sentence, corrected_sentence[0]).count('</')
            return_sentences.append(corrected_sentence[0])
    print('miss',missCount,'allWords',len(text.split()),)
    print("-" *100)
    
gram_former("He are moving here. I am doing fine. How is you? How is they? Matt like fish. the collection of letters was original used by the ancient Romans. We enjoys horror movies. Anna and Mike is going skiing. I walk to the store and I bought milk. We all eat the fish and then made dessert. I will eat fish for dinner and drink milk. what be the reason for everyone leave the company")

# gf = Gramformer(models = 1, use_gpu=False) # 1=corrector, 2=detector

# influent_sentences = [
#     "He are moving here.",
#     "I am doing fine. How is you?",
#     "How is they?",
#     "Matt like fish",
#     "the collection of letters was original used by the ancient Romans",
#     "We enjoys horror movies",
#     "Anna and Mike is going skiing",
#     "I walk to the store and I bought milk",
#     " We all eat the fish and then made dessert",
#     "I will eat fish for dinner and drink milk",
#     "what be the reason for everyone leave the company",
# ] 

# testSentence = "He are moving here. I am doing fine. How is you? How is they? Matt like fish. the collection of letters was original used by the ancient Romans. We enjoys horror movies. Anna and Mike is going skiing. I walk to the store and I bought milk. We all eat the fish and then made dessert. I will eat fish for dinner and drink milk. what be the reason for everyone leave the company"

# gramSentences = nltk.sent_tokenize(testSentence)




# for influent_sentence in gramSentences:
#     corrected_sentences = gf.correct(influent_sentence, max_candidates=1)
#     print("[Input] ", influent_sentence)
#     for corrected_sentence in corrected_sentences:
#         print("[Correction] ",gf.highlight(influent_sentence, corrected_sentence[0]))
#         missCount = missCount+gf.highlight(influent_sentence, corrected_sentence[0]).count('</')
#         return_sentences.append(corrected_sentence[0])
#     print("-" *100)

# print(len(testSentence.split()),missCount,return_sentences)
