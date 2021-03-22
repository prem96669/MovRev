from flask import Flask, jsonify, request, json
from flask_cors import CORS
import requests
import json
import pymongo
from flask_mail import Mail, Message
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token


app = Flask(__name__)

client = pymongo.MongoClient(
    "mongodb+srv://group27:AWD-Group27@advancedwebservice.i3vir.mongodb.net/awdproject?retryWrites=true&w=majority")
db = client.awdproject

app.config['JWT_SECRET_KEY'] = 'secret'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'movrev.help@gmail.com',
    "MAIL_PASSWORD": 'MovRev@2020'
}

app.config.update(mail_settings)
mail = Mail(app)

CORS(app)


################################ Watchlist (Not working) ################################

@app.route('/loadWatchlist/<userid>', methods=['GET'])
def loadWatchlist(userid):
    watchlist = db.userwatchlist.find({'userid': userid}, {'_id': 0})
    if watchlist is None:
        return json.dumps("No movies in watchlist")
    else:
        watchList = list(watchlist)
        return json.dumps(watchList)


@app.route('/deleteMoview/<moviewname>/<userid>', methods=['DELETE'])
def deleteMoviewFromWatchlist(moviewname, userid):
    db.userwatchlist.remove({'moviewname': moviewname, 'userid': userid})
    return json.dumps("Moview removed from watchlist")


################################ Support (Working)################################

@app.route('/submitEnquiry', methods=['POST'])
def submitEnquiry():
    data = request.json
    email = data['email']
    message = data['message']
    db.enquiry.insert_one({'email': email, 'message': message})
    msg = Message(subject="Enquiry", sender=app.config.get("MAIL_USERNAME"),
                  recipients=[app.config.get("MAIL_USERNAME")],
                  body="Enquiry email : " + email + "   Message : " + message)
    mail.send(msg)
    return json.dumps("Enquiry Submitted Successfully")


################################ Reviews (Not working)################################

@app.route('/loadReviews/<userid>', methods=['GET'])
def loadAllReviews(userid):
    reviews = db.userreviews.find({'userid': userid}, {'_id': 0})
    if reviews is None:
        return json.dumps("No reviews found")
    else:
        reviewList = list(reviews)
        return json.dumps(reviewList)


@app.route('/postReview', methods=['POST'])
def postReview():
    data = request.json
    userid = data['userid']
    movieid = data['movieid']
    title = data['title']
    rating = data['rating']
    description = data['description']
    db.Users.insert_one(
        {'userid': userid, 'movieid': movieid, 'title': title, 'rating': rating, 'description': description})
    return json.dumps("review Submitted")


################################ Top Rated Movies (Working)################################

@app.route('/getTopRatedMovies', methods=['GET'])
def getTopRatedMovies():
    movielist = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'The Godfather: Part II', 'Hamilton',
                 'The Lord of the Rings: The Return of the King', 'Pulp Fiction', 'Schindler\'s List', '12 Angry Men',
                 'Inception',
                 'Fight Club', 'The Lord of the Rings: The Fellowship of the Ring', 'Forrest Gump',
                 'The Good, the Bad and the Ugly', 'The Lord of the Rings: The Two Towers',
                 'The Matrix', 'Goodfellas', 'Star Wars: Episode V - The Empire Strikes Back',
                 'One Flew Over the Cuckoo\'s Nest', 'Harakiri']
    apiKey = 'eb6b77a0'
    data_URL = 'http://www.omdbapi.com/?apikey=' + apiKey
    moviedetailslist = []

    for movie in movielist:
        params = {'t': movie, 'plot': 'full', 'r': 'json'}
        response = requests.get(data_URL, params=params).json()
        moviedetailslist.append(response)
    return json.dumps(moviedetailslist)


@app.route('/getHomeMovies', methods=['GET'])
def getHomeMovies():
    movielist = ['The Old Guard', 'Greyhound', 'Palm Springs', 'Hamilton', '365 Days',
                 'Eurovision Song Contest: The Story of Fire Saga', 'Relic', 'Knives Out', 'The F**k-It List',
                 'Desperados',
                 'Jerry Maguire', 'The Gentlemen', 'Love', 'Once Upon a Time... in Hollywood', 'Twins',
                 'Fatal Affair', 'Archive', 'Doctor Sleep', 'Parasite', 'Joker']
    apiKey = 'eb6b77a0'
    data_URL = 'http://www.omdbapi.com/?apikey=' + apiKey
    # params = {'t': 'Once Upon a Time... in Hollywood', 'plot': 'full', 'r': 'json'}
    # response = requests.get(data_URL, params=params).json()
    # return response
    moviedetailslist = []

    for movie in movielist:
        params = {'t': movie, 'plot': 'full', 'r': 'json'}
        response = requests.get(data_URL, params=params).json()
        moviedetailslist.append(response)
    return json.dumps(moviedetailslist)


################################ Subscription (working) ################################

@app.route('/subscribe', methods=['POST'])
def subscribe_user():
    topRatedMovies = "https://awd-backend.herokuapp.com/getTopRatedMovies"
    useremail = request.get_json()['useremail']
    collection = db.subscribedusers
    useremail = request.get_json()['useremail']
    movies = requests.get(topRatedMovies)
    toprated_movies = movies.json()
    msg = Message('Hello', sender='movrev.help@gmail.com', recipients=[useremail])
    fullstring = ""
    total = ""
    htmlmsg = ""
    for value in toprated_movies:
        fullstring = htmlmsg + "<h5> Movie title </h5><h3>" + str(value["Title"]) + "</h3> <br> <img src='" + str(
            value["Poster"]) + "'/><br> <h5> Rating: </h5> <h1>" + str(value["Metascore"]) + "</h1>"
        total = total + fullstring
    msg.html = "<body> <p>Thank you for your subscription to MovRev and plese find the top rated movies below for the week</p>" + total + "</body>";
    mail.send(msg)
    userSubscriptionEmail = {"useremail": useremail}
    collection.insert_one(userSubscriptionEmail)
    return "Sent"


################################ Blogging and Network ################################

# yet to implement
@app.route('/getnetwork', methods=['POST'])
def get_network():
    collection = db.usernetwork
    user_id = request.form['userid']
    user = collection.find_one({'userid': user_id})
    del user['_id']
    return json.dumps(user)


@app.route('/saveblog', methods=['POST'])
def save_blog():
    collection = db.userblogs
    user_id = request.form['userid']
    blog_title = request.form['blog_title']
    blog_subtitle = request.form['blog_subtitle']
    blog_content = request.form['blog_content']
    try:
        collection.insert_one({
            'userid': user_id,
            'title': blog_title,
            'subtitle': blog_subtitle,
            'content': blog_content,
        })
        return json.dumps({'status': True})
    except:
        return json.dumps({'status': False})


@app.route('/getuserblogs', methods=['POST'])
def get_user_blogs():
    collection = db.userblogs
    user_id = request.form['userid']
    blogs = collection.find({'userid': user_id})
    retrieved_blogs = []
    for blog in blogs:
        del blog['_id']
        del blog['userid']
        retrieved_blogs.append(blog)
    return json.dumps(retrieved_blogs)


@app.route('/deleteblog', methods=['POST'])
def delete_blog():
    collection = db.userblogs
    user_id = request.form['userid']
    title = request.form['blog_title']
    subtitle = request.form['blog_subtitle']
    try:
        collection.remove({'userid': user_id, 'title': title, 'subtitle': subtitle})
        return json.dumps({'status': True})
    except:
        return json.dumps({'status': False})


@app.route('/getalluserblogs', methods=['POST'])
def get_all_user_blogs():
    collection = db.userblogs
    blogs = collection.find({})
    retrieved_blogs = []
    for blog in blogs:
        del blog['_id']
        retrieved_blogs.append(blog)
    return json.dumps(retrieved_blogs)


################################ Login and Registration ################################

@app.route('/users/register', methods=["POST"])
def register():
    users = db.userinfo
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = users.insert({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'created': created
    })

    new_user = users.find_one({'_id': user_id})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result': result})


@app.route('/users/login', methods=['POST'])
def login():
    users = db.userinfo
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity={
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({'token': access_token})
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No results found"})
    return result


@app.route('/users', methods=['GET'])
def users():
    users = db.userinfo
    user = users.find_one()
    print(user)

    if user:
        result = jsonify({
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'email': user['email']
        })
    else:
        result = jsonify({"users": "No results found"})
    return result