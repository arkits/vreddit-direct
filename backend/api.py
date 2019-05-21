#!/usr/bin/env python
# -*- coding: utf-8 -*-

###################################################################
#                       vreddit-direct                            #
#                        Archit Khode                             #
###################################################################

# TODO:
# Move the checking to a different function?

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import json
import util
import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# GET / or /status
@app.route('/')
@app.route('/status')
def index():
    payload = {
        "service_name" : "vreddit_direct",
        "status" : "OK",
        "version" : "v1.3"
    }
    return jsonify(payload)

@app.route('/direct/<video_id>')
def direct_with_id(video_id):
    resp = util.director_with_id(video_id)
    return resp

@app.errorhandler(404)
def not_found(error):
    payload = {
        "error" : "NOT_FOUND",
    }
    return make_response(jsonify(payload), 404)

@app.errorhandler(400)
def bad_request(error):
    payload = {
        "status" : "BAD_REQUEST",
    }
    return make_response(jsonify(payload), 400)

if __name__ == '__main__':
    app.run()