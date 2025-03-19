from flask import Flask, request, render_template, redirect

app = Flask(__name__)

@app.route('/')
def calculator():
    return render_template('calculator.html')

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/create-link', methods=['POST'])
def create_link():
    # get the json sended
    data = request.get_json()
    print(data)
    return redirect("/")



if __name__ == '__main__':
    app.run(debug=True)
