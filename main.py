from flask import Flask, request, render_template, redirect
import os
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculator')
def calculator():
    return render_template('AverageMaximator.html', data={})



@app.route('/save', methods=['POST'])
def create_link():
    # get the json sended
    data = request.get_json()

    # create an unique id
    id = 0
    os.listdir('data/')
    while f'{id}.json' in os.listdir('data/'):
        id += 1

    with open(f'data/{id}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=3)
    
    return redirect("/calculator/" + str(id))


@app.route('/calculator/<id>')
def calculator_id(id):
    with open(f'data/{id}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    return render_template('AverageMaximator.html', data=data)



if __name__ == '__main__':
    app.run(debug=True)
