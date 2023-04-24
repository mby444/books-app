export const timedFetch = (url, options, timeout = 10000) => {
  const promise1 = fetch(url, options);
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("RequestTimeoutError"));
    }, timeout);
  });
  return Promise.race([promise1, promise2]);
};

export default {
  timedFetch,
};
