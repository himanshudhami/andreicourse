import express from 'express';

export class BaseRoutes {
  repository

  constructor() {
    this.router = express.Router();
  }

  /**
   * Call this in subclasses ctors
   */
  configRoutes = (routeSegment, modelFactory) => {
    
    /**
     * Get all or list
     * use optional skip and take parameters for pagination
     * ordering is by creation date desc by default
     * 
     * GET method
     */
    this.router.get(routeSegment + ':skip?/:take?', (req, resp, next) => {
      return this.repository.list(req.params.skip, req.params.take, (responseData) => { 
        return this.sendResponse(resp, responseData);
      })
    })

    /**
     * Get one by id
     * GET method
     */
    this.router.get(routeSegment + ':id', (req, resp, next) => {
      return this.repository.getOneById(req.params.id, (responseData) => { 
        return this.sendResponse(resp, responseData);
      })
    })

    /**
     * Create one
     * POST method
     */
    this.router.post(routeSegment, (req, resp, next) => {
      if (!req.body || !req.body.text) return resp.sendStatus(400);

      let model = modelFactory.createFromRequest(req);
      return this.repository.create(model, (responseData) => {
        return this.sendResponse(resp, responseData);
      })
    })

    /**
     * Update one whole
     * PUT method
     */
    this.router.put(routeSegment, (req, resp, next) => {
      resp.send('PUT route OK');
    })

    /**
     * Update one parts
     * PATCH method
     */
    this.router.patch(routeSegment, (req, resp, next) => {
      resp.send('PATCH route OK');
    })

    /**
     * Delete one
     * DELETE method
     */
    this.router.delete(routeSegment + ':id', (req, resp, next) => {
      if (!req.params ||!req.params.id) return resp.sendStatus(400);
    
      return this.repository.delete(req.params.id, (responseData) => {
        return this.sendResponse(resp, responseData);
      })
    })
  }

  sendResponse = (response, responseData, okCode, errCode) => {
    okCode = okCode || 200;
    errCode = errCode || 500;
    if (responseData.hasError) {
      responseData.code = errCode;
    } else { 
      responseData.code = okCode;
    }
    return response.status(responseData.code).send(responseData);
  }
}