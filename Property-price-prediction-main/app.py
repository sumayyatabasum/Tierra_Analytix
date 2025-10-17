import json
from flask import Flask, render_template, request, jsonify
from main import predict_price
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ---------------- FRONTEND HTML (Bolt) ---------------- #
@app.route('/', methods=['GET'])
def form():
    with open('static/columns.json') as json_file:
        data = json.load(json_file)
        locations = data['locations']
    return render_template('app.html', predicted_price='', locations=locations)


# ---------------- API ROUTES FOR REACT ---------------- #
@app.route('/api/locations', methods=['GET'])
def get_locations():
    with open('static/columns.json') as json_file:
        data = json.load(json_file)
    return jsonify(data['locations'])

@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json()
    location = data['location']
    square_feet = float(data['squareFeet'])
    bedrooms = float(data['bedrooms'])
    bathrooms = float(data['bathrooms'])

    price = predict_price(location, square_feet, bathrooms, bedrooms)
    return jsonify({'predicted_price': round(price, 2)})


if __name__ == "__main__":
    app.run(debug=True)
