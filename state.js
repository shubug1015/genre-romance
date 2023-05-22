export const handleRedirect = (
  state,
  match_cancel,
  movie_cancel,
  payment_cancel
) => {
  if (state === 'standby') {
    return '/profile';
  } else if (state === 'wait_proposal_m') {
    if (match_cancel === 'true' || movie_cancel === 'true') {
      return '/sorry_match';
    } else if (payment_cancel === 'true') {
      return '/sorry_payment';
    } else {
      return '/wait_romance';
    }
  } else if (state === 'wait_proposal_f') {
    if (match_cancel === 'true' || movie_cancel === 'true') {
      return '/sorry_match';
    } else if (payment_cancel === 'true') {
      return '/sorry_payment';
    } else {
      return '/wait_romance';
    }
  } else if (state === 'arrive_proposal_m' || state === 'arrive_proposal_f') {
    return '/arrive_proposal';
  } else if (state === 'arrive_proposal_f_tmp') {
    return '/wait_romance';
  } else if (state === 'wait_answer_m') {
    return '/wait_for_her';
  } else if (state === 'wait_answer_f') {
    return '/wait_for_him';
  } else if (state === 'arrive_movie_m') {
    return '/arrive_movie_m';
  } else if (state === 'arrive_movie_f') {
    return '/arrive_movie_f';
  } else if (state === 'wait_movie_m') {
    return '/wait_for_her';
  } else if (state === 'matched') {
    return '/matched';
  } else if (state === 'watching') {
    return '/ticket';
  } else if (state === 'proof_shot') {
    return '/photo';
  } else if (state === 'refund') {
    return '/wait_refund';
  } else {
    return '/';
  }
};
