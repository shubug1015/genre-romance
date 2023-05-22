import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-197630516-1';

const initGA = () => {
  ReactGA.initialize(TRACKING_ID, { debug: false });
};

const logPageView = (path) => {
  ReactGA.set({ path });
  ReactGA.pageview(path);
};

const logEvent = (payload) => {
  ReactGA.event(payload);
};

// const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({ description, fatal });
//   }
// };

export default { initGA, logPageView, logEvent };
