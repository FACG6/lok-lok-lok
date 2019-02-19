const fetch = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.status);
    xhr.open("GET", url);
    xhr.send();
  });
};
