/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/players              ->  index
 * POST    /api/players              ->  create
 * GET     /api/players/:id          ->  show
 * PUT     /api/players/:id          ->  update
 * DELETE  /api/players/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Player from './player.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function findByIDorSlug(idOrSlug) {
  return Player.findById(idOrSlug).exec()
    .then((doc) => {
      if(doc) {
        return Promise.resolve(doc);
      }
      else{
        return getBySlug(idOrSlug);
      }
    })
    .catch(() => {
        return getBySlug(idOrSlug);
    }); 
}

function getBySlug(slug){
  return Player.find({slug: slug}).exec()
    .then((docs) => {
      if(docs.length > 0){
        return Promise.resolve(docs);
      }
      else{
        return Promise.resolve(false); 
      }
    });
}

function indexStream(query){
  return query.stream();
}

// Gets a list of Players
export function index(req, res) {
  let query = Player.find(); 
  let limit = req.query.limit ? Number(req.query.limit) : 10; 

  if(req.query.list) {
    query = query.select('-yearlyStats');
  }

  if(req.query.page){
    let page = Number(req.query.page);
    query.skip(page * limit);
  }

  query.limit(limit);

  return query.exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Player from the DB
export function show(req, res) {
  return findByIDorSlug(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Player in the DB
export function create(req, res) {
  return Player.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Player in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Player.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Player from the DB
export function destroy(req, res) {
  return Player.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
