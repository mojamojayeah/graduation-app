# graduation-app

#### 英作文学習ツール
api側は`flask`
front側は`react`を使用している。

#### 内容
英作文のテーマとそれに合致した作文を記入すると、英作文の修正及びそのテーマに近い単語を提案してくれるアプリ


#### 始め方
- api (パッケージに関係でpipのバージョンは`pip==20.1.1 `)
```python
cd ycu-api
pip install -r requirements.txt
python -m spacy download en
python app.py
```
- front
```ts
cd ycu-app
yarn
yarn start
```


#### 例
https://user-images.githubusercontent.com/78922446/146545772-e3cae965-9f8b-424b-afd4-d32da60884b5.mov

