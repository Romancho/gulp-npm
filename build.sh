#!/bin/bash

composer install && cd assets/src && npm i && gulp deploy
