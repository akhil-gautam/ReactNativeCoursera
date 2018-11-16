import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/basUrl';
import { comments } from './comments';

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
        .then(response => {
          if (response.ok){
            return response;
          }
          else{
            let error = new Error('Error' + response.status + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          var error = new Error(error.message);
          throw error;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (err) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: err
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchComments = () => (dispatch) => {

  dispatch(dishesLoading());
  
  return fetch(baseUrl + 'dishes')
        .then(response => {
          if (response.ok){
            return response;
          }
          else{
            let error = new Error('Error' + response.status + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          var error = new Error(error.message);
          throw error;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (err) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: err
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchPromos = () => (dispatch) => {

  dispatch(promosLoading());
  
  return fetch(baseUrl + 'promotions')
        .then(response => {
          if (response.ok){
            return response;
          }
          else{
            let error = new Error('Error' + response.status + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          var error = new Error(error.message);
          throw error;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (err) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: err
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promos
});

export const fetchLeaders = () => (dispatch) => {

  dispatch(leadersLoading());
  
  return fetch(baseUrl + 'leaders')
        .then(response => {
          if (response.ok){
            return response;
          }
          else{
            let error = new Error('Error' + response.status + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          var error = new Error(error.message);
          throw error;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (err) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: err
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
