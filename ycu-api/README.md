# ycu-api

#### pipのversionに注意
```python
pip==20.1.1 
```

#### パッケージのinstall
```python
pip install -r requirements.txt
python -m spacy download en
```
#### severの立ち上げ
```python
python app.py
```

#### 内容
今回は二つの関数がある
一つ目は英作文の文法内容を修正するもの
もう一つはテーマに沿った新たな英単語を提案するもの

- 文法修正
今回はPrithivirajDamodaranさんが公開している[Gramformer](https://github.com/PrithivirajDamodaran/Gramformer)を使用
している。細かな使い方についてはurlにジャンプして確認してください。
フロント側で記入された英作文をlist化し一文ずつGramformerを回しています。

- themeの提案
こちらでは単語分散表現を使用し、テーマに近い単語を見つけ、その中で英作文に含まれていないものをユーザーに提案しています。
その際にその単語が使われる頻度の順でソートしています。
使用しているデータは、以下のものになっています。
単語分散表現に用いているデータはかなり大きいので事前にpickle でダンプしておくことをお勧めします。
  - [頻度でのソート用](https://www.jamsystem.com/ancdic/index.html)
  - [単語分散表現用](https://fasttext.cc/docs/en/english-vectors.html).  


