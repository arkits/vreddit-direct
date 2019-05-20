#!/usr/bin/env python
# -*- coding: utf-8 -*-

###################################################################
#                       vreddit-direct                            #
#                        Archit Khode                             #
###################################################################

# TODO:
# Move the checking to a different function?

from flask import Flask, jsonify, make_response, request
import json
import util
import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# GET / or /status
@app.route('/')
@app.route('/status')
def index():
    payload = {
        "service_name" : "vreddit_direct",
        "status" : "OK",
        "version" : "v1"
    }
    return jsonify(payload)

# GET /direct
@app.route('/direct')
def direct():

    # Check if there is a link in request body
    if not request.json or not "link" in request.json:
        payload = {
            "status" : "BAD",
            "message" : "NO_LINK_PROVIDED"
        }
        return make_response(jsonify(payload), 400)

    link = request.json["link"]

    # Check if link is HTTPS
    if link[4] != "s":
        logger.info("Link isn't HTTPS. Making it one...")
        link = "https" + link[4:]
        logger.info("New Link is: " + link)

    # Remove the last "/"
    if link[-1] == "/":
        logger.info("Link ends with a /. Removing it...")
        link = link[0:-1]
        logger.info("New Link is: " + link)

    # Check if link is vreddit link
    if str(link[0:18]) == "https://v.redd.it/":
        logger.info("IS_VREDDIT_LINK")
        payload = util.director(link)
        payload["status"] = "OK"
        return make_response(jsonify(payload), 200)
    else:
        logger.info("NOT_VREDDIT_LINK")
        payload = {
            "status" : "BAD",
            "message" : "NOT_VREDDIT_LINK"
        }
        return make_response(jsonify(payload), 400)


@app.errorhandler(404)
def not_found(error):
    payload = {
        "error" : "NOT_FOUND",
    }
    return make_response(jsonify(payload), 404)

@app.errorhandler(400)
def bad_request(error):
    payload = {
        "status" : "BAD",
    }
    return make_response(jsonify(payload), 400)

if __name__ == '__main__':
    app.run()