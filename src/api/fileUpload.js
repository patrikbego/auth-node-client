export default function uploadFile(file) {
  // fetch("http://localhost:8080/sys/upload/webp", {
  fetch('http://localhost:8081/sys/upload', {
    method: 'POST',
    // headers: {
    //   "Content-Type": "multipart/form-data;"
    // },
    body: file, // This is your file object
  }).then(
    (response) => response.json(), // if the response is a JSON object
  ).then(
    (success) => console.log(success), // Handle the success response object
  ).catch(
    (error) => console.log(error), // Handle the error response object
  );
}
