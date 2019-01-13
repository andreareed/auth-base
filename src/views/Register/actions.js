export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = values => {
  return dispatch => {
    dispatch({ type: DELETE_ACTIVITY });
    return axios
      .delete(`/api/jobs/${jobId}/activity/${id}`)
      .then(
        () => dispatch({ type: DELETE_ACTIVITY_SUCCESS, id }),
        err => dispatch({ type: DELETE_ACTIVITY_FAILURE, err })
      );
  };
};
